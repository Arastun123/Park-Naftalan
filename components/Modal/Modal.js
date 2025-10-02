"use client";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { CarBlack } from "../Svg";
import Perecetage from "../Svg/Percentage";
import styles from "./styles.module.scss";

export default function Modal({ locale, t }) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("5-percent");

  useEffect(() => {
    try {
      const shown = sessionStorage.getItem("roomsModalShown");
      if (!shown) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleCancel = () => {
    try {
      sessionStorage.setItem("roomsModalShown", "1");
    } catch {}
    setVisible(false);
  };

  const handleSelect = () => {
    try {
      sessionStorage.setItem("campaign", selected);
      sessionStorage.setItem("roomsModalShown", "1");
    } catch {}
    if (locale) {
      window.location.href = `/${locale}/booking`;
    } else {
      window.location.href = "/booking";
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>{t?.SelectCampaign}</p>
      <div className={styles.sections}>
        <div
          className={styles.section}
          onClick={() => setSelected("5-percent")}
          style={{
            outline: selected === "5-percent" ? "2px solid #2f3c4b" : "none",
          }}
        >
          <span className={styles.icon}>
            <Perecetage />
          </span>
          <div>
            <p>{t?.FivePercent}</p>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
          </div>
        </div>
        <div
          className={styles.section}
          onClick={() => setSelected("free-transfer")}
          style={{
            outline:
              selected === "free-transfer" ? "2px solid #2f3c4b" : "none",
          }}
        >
          <span className={styles.icon}>
            <CarBlack />
          </span>
          <div>
            <p>{t?.FreeTransfer}</p>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn} onClick={handleSelect}>
          {t?.SelectCampaign}
        </Button>
        <Button className={styles.btn} onClick={handleCancel}>
          {t?.Cancel}
        </Button>
      </div>
    </div>
  );
}
