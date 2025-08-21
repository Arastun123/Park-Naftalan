"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getAznToUsdRate, getDatas, sendMail } from "@/lib/handleApiActions";
import Input from "../Input";
import Calendar from "../Calendar/Calendar";

import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.scss";
import SelectBox from "../SelecBox";
import CustomMultiSelect from "../CustomMultiSelect";

export default function ReservationForm({ t, locale, currentRoom }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    date: "",
    member: 1,
    message: "",
    dayCount: 1,
    childCount: [],
    roomCount: 1,
  });

  const [selectedRoom, setSelectedRoom] = useState(currentRoom || "");
  const [guest, setGuest] = useState(0);
  const [maxGuestCount, setMaxGuestCount] = useState(1);
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
    if (rooms.length > 0 && !selectedRoom) {
      const firstRoom = rooms[0];
      setSelectedRoom(firstRoom.category);
      setFormData((prev) => ({
        ...prev,
        member: firstRoom.member || 1,
      }));
    }
  }, [rooms, selectedRoom]);

  useEffect(() => {
    if (rooms.length > 0 && selectedRoom) {
      const selected = rooms.find((item) => item.category === selectedRoom);

      if (selected?.pricesByOccupancy?.length > 0) {
        const maxOcc = Math.max(
          ...selected.pricesByOccupancy.map((p) => p.occupancy)
        );
        setMaxGuestCount(maxOcc);
      } else {
        setMaxGuestCount(selected?.member || 1);
      }

      // Otaq qiyməti (occupancy varsa onu götürürük, yoxdursa adam sayı * baza qiymət)
      const occupancyPrice = selected?.pricesByOccupancy?.find(
        (p) => p.occupancy === Number(formData.member || 1)
      )?.price;

      let roomBasePrice = 0;
      if (occupancyPrice !== undefined) {
        roomBasePrice = occupancyPrice;
      } else {
        roomBasePrice =
          (Number(selected?.price) || 0) * Number(formData.member || 1);
      }

      // Uşaq qiyməti (gündəlik, seçilən uşaqlar üçün)
      const selectedChildren =
        selected?.children?.filter((child) =>
          formData.childCount.includes(String(child.id))
        ) || [];

      const childPriceTotal = selectedChildren.reduce(
        (acc, child) => acc + Number(child.price || 0),
        0
      );

      // Əlavə guest qiyməti (gündəlik +70)
      const extraGuestPrice = guest ? 70 : 0;

      // Gündəlik ümumi qiymət
      const dailyTotal = roomBasePrice + childPriceTotal + extraGuestPrice;

      // Ümumi qiymət (gün və otaq sayına görə)
      const dayCount = Number(formData.dayCount || 1);
      const roomCount = Number(formData.roomCount || 1);

      const total = dailyTotal * dayCount * roomCount;

      setPrice(total);
    } else {
      setPrice(0);
    }
  }, [
    rooms,
    selectedRoom,
    formData.member,
    formData.dayCount,
    formData.roomCount,
    formData.childCount,
    guest,
  ]);

  const roomOptions = rooms
    .map((item) => ({
      value: item.category,
      label: `${item.category}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "az"));

  const childOptions = useMemo(() => {
    const selected = rooms.find((room) => room.category === selectedRoom);
    if (!selected?.children) return [];

    return selected.children.map((child) => {
      let label = child.ageRange;
      console.log(selected);

      switch (locale) {
        case "en":
          label = label.replace(/uşaq/g, "child").replace(/yaş/g, "years");
          break;
        case "ru":
          label = label.replace(/uşaq/g, "pебенок").replace(/yaş/g, "лет");
          break;
        default:
          break;
      }

      const treatmentText = {
        az: " (Müalicə ilə)",
        en: " (With Treatment)",
        ru: " (С лечением)",
      };

      if (child.hasTreatment) {
        label += treatmentText[locale];
      }

      return {
        value: String(child.id),
        label,
      };
    });
  }, [rooms, selectedRoom, locale]);

  const handleRoomSelect = (e) => {
    setSelectedRoom(e.target.value);
    const selected = rooms.find((room) => room.category === e.target.value);
    setFormData((prev) => ({
      ...prev,
      member: selected?.member || 1,
    }));
    setGuest(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "member") {
      if (value <= maxGuestCount) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    if (member < 1) newErrors.member = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const selectedChildren = childOptions.filter((opt) =>
        formData.childCount.includes(opt.value)
      );
      const selectedChildrenLabels = selectedChildren.map((opt) => opt.label);

      const selectedRoomData = rooms.find((r) => r.category === selectedRoom);
      const totalPeople = Number(+guest + +formData.member || 0);
      const selectedRoomLabel = `${
        selectedRoomData?.category || selectedRoom
      } (${totalPeople} nəfər)`;

      const finalData = {
        ...formData,
        selectedRoom: selectedRoomLabel,
        guest: totalPeople,
        price,
        language: locale,
        dayCount: `${formData.dayCount - 1} ${t?.Night} ${formData.dayCount} ${
          t?.Day
        }`,
        childCount: selectedChildrenLabels.join(", "),
      };

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
            member: 1,
            childCount: [],
            roomCount: 1,
          });
          setSelectedRoom(currentRoom || "");
          setGuest(0);
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
      dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1 || 1;
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
              name="selectedRoom"
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
            <div className={styles.group}>
              <Input
                type="number"
                name="member"
                label={t?.Guest}
                value={formData.member}
                onChange={handleChange}
                hasError={errors.member}
                min="1"
                max={maxGuestCount}
              />
              <label>
                <Input
                  type="checkbox"
                  name="guest"
                  value={guest}
                  checked={guest}
                  onChange={(e) => setGuest(e.target.checked ? 1 : 0)}
                />
                <span>{t?.addGuest}</span>
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <CustomMultiSelect
              label={t?.ChildCount}
              options={childOptions}
              name="childCount"
              selectedValues={formData.childCount}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, childCount: selected }))
              }
              hasError={errors.childCount}
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
              {selectedRoom && (
                <p className={styles.priceInfo}>
                  {formData.roomCount} {selectedRoom} × {formData.member}
                  {guest === 0 ? "" : `+${guest}`} {t?.Guest},{" "}
                  {formData.childCount.length !== 0 &&
                    `${formData.childCount.length} ${t?.Child} ×`}{" "}
                  {formData.dayCount} {t?.Day} — {t?.PriceIs}{" "}
                  <span className={styles.totalPrice}>
                    {price} ₼ / {(Number(price) * currency).toFixed(0)} $
                  </span>
                </p>
              )}
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
