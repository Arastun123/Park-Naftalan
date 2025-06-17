"use client";
import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { ArrowDown } from "../Svg";
import Button from "../Button/Button";

import styles from "./styel.module.scss";
import RoomSelector from "../RoomSelector/RoomSelector";

export default function ReserveCard({ locale, t }) {
  const [openType, setOpenType] = useState(null);

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
            {t?.ChooseDate}
            <span>
              <ArrowDown />
            </span>
          </Button>
        </div>
        {openType === "calendar" && (
          <div className={styles.dropdownCard}>
            <Calendar locale={locale} t={t} />
          </div>
        )}
      </div>

      <div className={styles.inputBox}>
        <div className={styles.maniBox}>
          <h4 className={styles.boxTitle}>{t?.RoomCount}</h4>
          <Button
            onClick={() => setOpenType(openType === "room" ? null : "room")}
            className={styles.trigger}
          >
            {t?.ChooseRoom}
            <span>
              <ArrowDown />
            </span>
          </Button>
        </div>
        {openType === "room" && (
          <div className={styles.dropdownCard}>
            <RoomSelector />
          </div>
        )}
      </div>
      <div>
        <Button className={styles.reserveBtn}>{t?.Reserv}</Button>
      </div>
    </div>
  );
}
