"use client";
import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import { ArrowDown } from "../Svg";
import Button from "../Button/Button";

import styles from "./styel.module.scss";
import RoomSelector from "../RoomSelector/RoomSelector";
import { useRouter } from "next/navigation";
import { getDatas } from "@/lib/handleApiActions";
import SelectBox from "../SelecBox";

export default function ReserveCard({ locale, t }) {
  const [openType, setOpenType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [date, setDate] = useState("");
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      let data = await getDatas("Room");
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomSelect = (e) => {
    const newRoom = e.target.value;
    if (newRoom === selectedRoom) return;

    setSelectedRoom(newRoom);
 
    setOpenType(null); 
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
    setDate(`${formattedStartDate} - ${formattedEndDate}`);
  };

  const handleReserve = () => {
    router.push(`/${locale}/reservations/${selectedRoom}`);
  };

  const optionalRoom = rooms.map((item) => item.category);
  return (
    <div className={styles.reserveCard}>
      <div className={styles.inputBox}>
        <div className={styles.maniBox}>
          <h4 className={styles.boxTitle}>{t?.Check}</h4>
          <Button
            onClick={() =>
              setOpenType(openType === "calendar" ? null : "calendar")
            }
            className={styles.trigger}
          >
            <span>{date ? date : t?.ChooseDate}</span>
            <span>
              <ArrowDown />
            </span>
          </Button>
        </div>
        {openType === "calendar" && (
          <div className={styles.dropdownCard}>
            <Calendar
              locale={locale}
              t={t}
              handleDateChange={handleDateChange}
            />
          </div>
        )}
      </div>

      <div className={styles.inputBox}>
        <div className={styles.maniBox}>
          <h4 className={styles.boxTitle}>{t?.ChooseRoom}</h4>
          <Button
            onClick={() => setOpenType(openType === "room" ? null : "room")}
            className={styles.trigger}
          >
            <span>{selectedRoom ? selectedRoom : t?.ChooseRoom}</span>
            <span>
              <ArrowDown />
            </span>
          </Button>
        </div>
        {openType === "room" && (
          <div className={styles.dropdownCard}>
            <SelectBox
              optionData={optionalRoom}
              name={t?.ChooseRoom}
              value={selectedRoom}
              onChange={handleRoomSelect}
            />
          </div>
        )}
      </div>
      <div>
        <Button className={styles.reserveBtn} onClick={handleReserve}>
          {t?.Reserv}
        </Button>
      </div>
    </div>
  );
}
