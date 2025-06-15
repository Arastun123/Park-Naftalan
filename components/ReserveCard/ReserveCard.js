"use client";
import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { ArrowDown } from "../Svg";
import Button from "../Button/Button";

import styles from "./styel.module.scss";
import RoomSelector from "../RoomSelector/RoomSelector";

export default function ReserveCard() {
  const [openType, setOpenType] = useState(null);

  return (
    <div className={styles.reserveCard}>
      <div className={styles.inputBox}>
        <div className={styles.maniBox}>
          <h4 className={styles.boxTitle}>Giriş/Çıxış tarixləri</h4>
          <Button
            onClick={() =>
              setOpenType(openType === "calendar" ? null : "calendar")
            }
            className={styles.trigger}
          >
            Tarix seç{" "}
            <span>
              <ArrowDown />
            </span>
          </Button>
        </div>
        {openType === "calendar" && (
          <div className={styles.dropdownCard}>
            <Calendar />
          </div>
        )}
      </div>

      <div className={styles.inputBox}>
        <div className={styles.maniBox}>
          <h4 className={styles.boxTitle}>Otaq sayı</h4>
          <Button
            onClick={() => setOpenType(openType === "room" ? null : "room")}
            className={styles.trigger}
          >
            Otaq seç{" "}
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
        <Button className={styles.reserveBtn}>Rezervasiya et</Button>
      </div>
    </div>
  );
}
