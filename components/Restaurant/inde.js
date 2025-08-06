"use client";
import Button from "@/components/Button/Button";
import { Clock, Download, Phone, Reserve } from "@/components/Svg";

import global from "@/styles/global.module.scss";
import styles from "@/styles/restaurant.module.scss"; 
import LinkItem from "../Header/LinkItem/LinkItem";

export default function Restaurant({ t, locale }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/files/menu${locale}.pdf`;
    link.download = "menu.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.restaurant}>
      <div className={styles.mainImageWrapper}>
        <img
          src="/main.jpg"
          alt="Park Terrace Restaurant"
          className={styles.backgroundImage}
        />
        <div className={styles.mainImage}>
          <h2>{t?.Park}</h2>
          <p>{t?.ResTxt}</p>
          <div className={styles.actions}>
            <LinkItem slug="tel:+994502342459">
              <Reserve /> {t?.Reserv}
            </LinkItem>
            <Button onClick={handleDownload}>
              <Download /> {t?.Menu}
            </Button>
          </div>
        </div>
      </div>
      <div className={global.container}>
        <div className={styles.about}>
          <div className={styles.text}>
            {" "}
            <h3>{t?.Park}</h3>
            <p>{t?.park_text.intro}</p>
            <p>{t?.park_text.choice}</p>
            <p>{t?.park_text.here_you_can}</p>
            <ul>
              <li>{t?.park_text.item_1}</li>
              <li>{t?.park_text.item_2}</li>
              <li>{t?.park_text.item_3}</li>
            </ul>
            <p>{t?.park_text.music}</p>
            <p>{t?.park_text.end}</p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <Clock />
                <p>{t?.open_hours}</p>
                <p>09:00 - 00:00</p>
                <p>{t?.every_day}</p>
              </div>
              <div className={styles.card}>
                <Phone color="#333" width="30" height="30" />
                <p>{t?.Reserv}</p>
                <p>+994502342459</p> 
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <img src="/second.jpg" alt="Park Terrace Restaurant" />
          </div>
        </div>
        <div className={styles.gallery}>
          <h3>{t?.Discover}</h3>

          <div className={styles.grid}>
            {Array.from({ length: 9 }, (_, i) => (
              <img
                key={i}
                src={`/${i + 1}.jpg`}
                alt={`Image ${i + 1}`}
                className={styles.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
