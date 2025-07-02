import LinkItem from "../Header/LinkItem/LinkItem";
import styles from "./styles.module.scss";
export default function TopReservation({ t, locale }) {
  return (
    <div className={styles.wrapper}>
      <p>64А Р.Зульфикаров, Naftalan 4600</p>
      <LinkItem slug={`/${locale}/reservations`}>{t?.reservation}</LinkItem>
    </div>
  );
}
