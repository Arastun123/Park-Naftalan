"use client";
import { useState } from "react";
import Button from "../Button";
import Calendar from "../Calendar/Calendar";
import { ArrowDown } from "../Svg";

import styles from "./styel.module.scss";
function Dropdown({ name, children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log("clicked");
  };

  return (
    <div>
      <Button onClick={handleOpen} type="button" className={styles.trigger}>
        {name}
        <span>
          <ArrowDown color="#0d2126" />
        </span>
      </Button>
      {open && children}
    </div>
  );
}
export default function ReserveCard() {
  const handleOpen = () => {
    // setOpen((prev) => !prev);
    console.log("clicked");
  };
  return (
    <div className={styles.reserveCard}>
      <div>
        <h4 className={styles.boxTitle}>Giriş/Çıxış tarixləri</h4>
        <Dropdown name="Tarix seç">
          <Calendar />
        </Dropdown>
      </div>
      <div>
        <h4 className={styles.boxTitle}>Otaq sayı</h4>
        <Dropdown name="Otaq seç">
          <Calendar />
        </Dropdown>
      </div>
      <Button> Rezervasiya et</Button>
    </div>
  );
}
