"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAznToUsdRate, getDatas, sendMail } from "@/lib/handleApiActions";
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
    phoneNumber: "",
    date: "",
    message: "",
    dayCount: "",
    childCount: 0,
    roomCount: 1,
  });

  const [selectedRoom, setSelectedRoom] = useState(currentRoom || "Standart Room");
  const [guest, setGuest] = useState(1);
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(0.5877);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getDatas("Room");
      setRooms(Array.isArray(data) ? data : []);
    };
    fetchRooms();

    const fetchCurrency = async () => {
      const cur = await getAznToUsdRate();
      if (cur) setCurrency(cur);
    };
    fetchCurrency();
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

    if (!formData.name?.trim()) newErrors.name = true;
    if (!formData.surname?.trim()) newErrors.surname = true;
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = true;
    if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = true;
    if (!formData.date?.trim()) newErrors.date = true;
    if (formData.roomCount < 1) newErrors.roomCount = true;
    if (!selectedRoom?.trim()) newErrors.selectedRoom = true;
    if (guest < 1) newErrors.guest = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...formData,
        selectedRoom,
        guest,
        // price,
        language: locale,
      };
      console.log(finalData);

      try {
        const res = await sendMail("send-reservation-confirmation", finalData);

        if (res?.status === 200) {
          toast.success(t?.Success);
          setFormData({
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            date: "",
            message: "",
            dayCount: 1,
            childCount: 0,
            roomCount: 1,
          });
          setSelectedRoom(currentRoom || "Deluxe");
          setGuest(1);
          setErrors({});
          setPrice(0);
        } else {
          toast.error(t?.Error || "Error sending email.");
        }
      } catch (error) {
        console.error("Mail error:", error);
        toast.error(t?.BackError || "Something went wrong.");
      }
    } else {
      toast.error(t?.FillInput || "Please fill all required fields.");
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

    let dayCount = 1;
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 1;
    }

    setFormData((prev) => ({
      ...prev,
      date: `${formattedStartDate} - ${formattedEndDate}`,
      dayCount,
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
              name="childCount"
              label={t?.ChildCount}
              value={formData.childCount}
              onChange={handleChange}
              hasError={errors.childCount}
              min="0"
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
              name="phoneNumber"
              label={t?.Phone}
              value={formData.phoneNumber}
              onChange={handleChange}
              hasError={errors.phoneNumber}
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
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={t?.MessagePlaceholder}
              />
            </div>

            <div className={styles.priceSubmitWrapper}>
              {/* {selectedRoom !== "Standart Room" && (
                <p className={styles.priceInfo}>
                  {formData.roomCount} {selectedRoom} {t?.RoomFor}{" "}
                  {formData.childCount} {t?.DayFor}
                  {t?.PriceIs} {t?.PriceEnd}
                  <span className={styles.totalPrice}>
                    {" "}
                    {price} ₼ / {(Number(price) * currency).toFixed(0)} $
                  </span>
                </p>
              )} */}
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
