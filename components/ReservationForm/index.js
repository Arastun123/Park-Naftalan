"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getDatas, sendMail } from "@/lib/handleApiActions";
import Input from "../Input";
import SelectBox from "../SelecBox";
import Calendar from "../Calendar/Calendar";

import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.scss";

export default function ReservationForm({ t, locale, currentRoom }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    dayCount: 1,
    roomCount: 1,
  });
  const [selectedRoom, setSelectedRoom] = useState(currentRoom || "Deluxe");
  const [guest, setGuest] = useState(1);
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getDatas("Room");
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (rooms.length > 0 && selectedRoom) {
      const selected = rooms.find((item) => item.category === selectedRoom);
      if (selected?.price) {
        setPrice(
          Number(selected.price) *
            Number(formData.dayCount || 1) *
            Number(formData.roomCount || 1)
        );
      } else {
        setPrice(0);
      }
    } else {
      setPrice(0);
    }
  }, [rooms, selectedRoom, formData.dayCount, formData.roomCount]);

  const roomOptions = rooms.map((item) => item.category);

  const handleRoomSelect = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.surname.trim()) newErrors.surname = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.date.trim()) newErrors.date = true;
    if (formData.dayCount < 1) newErrors.dayCount = true;
    if (formData.roomCount < 1) newErrors.roomCount = true;
    if (!selectedRoom.trim()) newErrors.selectedRoom = true;
    if (guest < 1) newErrors.guest = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...formData,
        selectedRoom,
        guest,
      };

      const emailBody = `
        Yeni rezervasiya:
        - Ad: ${finalData.name}
        - Soyad: ${finalData.surname}
        - Email: ${finalData.email}
        - Əlaqə nömrəsi: ${finalData.phone}
        - Seçilmiş otaq: ${finalData.selectedRoom}
        - Gün sayı: ${finalData.dayCount}
        - Tarix: ${finalData.date || "Seçilməyib"}
        - Otaq sayı: ${finalData.roomCount || 1}
        - Əlavə qeyd: ${finalData.message || 1}
        - Ümumi Qiymət: ${price} ₼
      `;

      try {
        const res = await sendMail(
          "ekbr03@gmail.com",
          "Reservation",
          emailBody
        );
        if (res.status === 200) {
          toast.success(t?.Success);
          setFormData({
            name: "",
            surname: "",
            email: "",
            phone: "",
            date: "",
            message: "",
            dayCount: 1,
            roomCount: 1,
          });
          setSelectedRoom(currentRoom || "Deluxe");
          setGuest(1);
          setErrors({});
          setPrice(0);
        } else {
          toast.error(t?.Error);
        }
      } catch (error) {
        console.error("Mail göndərmə xətası:", error);
        toast.error(t?.BackError);
      }
    } else {
      toast.error(t?.FillInput);
    }
  };

  const handleDateChange = ({ startDate, endDate }) => {
    const formattedStartDate =
      startDate instanceof Date && !isNaN(startDate)
        ? startDate.toLocaleDateString("az-AZ")
        : "";
    const formattedEndDate =
      endDate instanceof Date && !isNaN(endDate)
        ? endDate.toLocaleDateString("az-AZ")
        : "";

    setFormData((prev) => ({
      ...prev,
      date: `${formattedStartDate} - ${formattedEndDate}`,
    }));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formSection}>
        <Calendar t={t} locale={locale} handleDateChange={handleDateChange} />
        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          <div className={styles.formGroup}>
            <SelectBox
              optionData={roomOptions}
              name={t?.ChooseRoom}
              value={selectedRoom}
              onChange={handleRoomSelect}
              hasError={errors.selectedRoom}
              label={t?.ChooseRoom}
            />
            <Input
              type="number"
              name="roomCount"
              label={t?.RoomCount}
              value={formData.roomCount}
              onChange={handleChange}
              hasError={errors.roomCount}
              min="1"
            />
            <SelectBox
              optionData={[1, 2, 3, 4, 5, 6]}
              name={t?.Guest}
              value={guest}
              onChange={(e) => setGuest(Number(e.target.value))}
              hasError={errors.guest}
              label={t?.Guest}
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              type="number"
              name="dayCount"
              label={t?.DayCount}
              value={formData.dayCount}
              onChange={handleChange}
              hasError={errors.dayCount}
              min="1"
            />
            <Input
              type="text"
              name="name"
              label={t?.Name}
              value={formData.name}
              onChange={handleChange}
              hasError={errors.name}
              placeholder={t?.Name}
            />
            <Input
              type="text"
              name="surname"
              label={t?.Surname}
              value={formData.surname}
              onChange={handleChange}
              hasError={errors.surname}
              placeholder={t?.Surname}
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              type="email"
              name="email"
              label={t?.Email}
              value={formData.email}
              onChange={handleChange}
              hasError={errors.email}
              placeholder={t?.Email}
            />
            <Input
              type="tel"
              name="phone"
              label={t?.Phone}
              value={formData.phone}
              onChange={handleChange}
              hasError={errors.phone}
              placeholder={t?.Phone}
            />
            <div
              className={`${styles.textareaWrapper} ${
                errors.message ? styles.error : ""
              }`}
            >
              <label htmlFor="message">{t?.Message}</label>
              <textarea
                id="message"
                name="əlavə qeyd"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={t?.MessagePlaceholder}
              />
            </div>

            <div className={styles.priceSubmitWrapper}>
              <p className={styles.priceInfo}>
                {formData.roomCount} {selectedRoom} {t?.RoomFor}{" "}
                {formData.dayCount} {t?.DayFor}
                {t?.PriceIs} {t?.PriceEnd}
                <span className={styles.totalPrice}> {price} ₼</span>
              </p>
              <Input
                type="submit"
                value={t?.Reserv}
                className={styles.submitBtn}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
