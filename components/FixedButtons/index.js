import Link from "next/link";
import { Phone, Reservation } from "../Svg";
import styles from "@/styles/global.module.scss";
export default function FixedButtons({locale}) {
  return (
    <div className={styles.fixedBtns}>
      <Link href="tel:+994502342458" className={styles.fixedBtn}>
        <Phone />
      </Link>
      <Link href={`/${locale}/reservations`} className={styles.fixedBtn}>
        <Reservation />
      </Link>
    </div>
  );
}
