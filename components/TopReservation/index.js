import LinkItem from "../Header/LinkItem/LinkItem";
import { Phone } from "../Svg";
import styles from "./styles.module.scss";
export default function TopReservation({ t, locale }) {
  return (
    <div className={styles.wrapper}>
      <p>64А Р.Зульфикаров, Naftalan 4600</p>
      <div>
        <LinkItem slug={`/${locale}/reservations`}>{t?.Reservation}</LinkItem>
        <LinkItem slug={`/${locale}/reservations`}>
          <Phone />
        </LinkItem>
      </div>
    </div>
  );
}
