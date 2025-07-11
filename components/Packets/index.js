"use client";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Logo from "../Header/Logo";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";

export default function Packets({ t, locale }) {
  const router = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.item}>
        <div className={styles.left}>
          <p className={styles.offer}>5+1</p>
          <p className={styles.text}>Kampaniyası</p>
        </div>

        <div className={styles.mainContentArea}>
          <div className={styles.center}>
            <h2>Yay ayına özəl</h2>
            <p className={styles.highlight}>
              <strong>
                5 günlük otaq rezerv edənə <br /> 1 gün hədiyyə
              </strong>
            </p>
          </div>
          <div className={styles.rightDiagonal}>
            <Button
              onClick={() => router.push(`/${locale}/reservations`)}
              className={global.reserveBtn}
            >
              {t?.Reservation}
            </Button>{" "}
            <div className={styles.logoPlaceholder}>
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
