import Link from "next/link";
import styles from "./styles.module.scss";
import { Person } from "../Svg";
export default function Card({ src, name, member, priceAZN, priceUSD, slug }) {
  return (
    <Link href={slug} className={styles.card}>
      <img src={src} alt={`Park Naftalan Sanatoriyası-${name}`} />
      <h2>{name}</h2>
      {/* <div className={styles.icon}>
        {Array.from({ length: +member }).map((_, index) => (
          <span key={index}>
            <Person color="#000" />
          </span>
        ))}
      </div> */}
      <p className={styles.price}>
        {priceAZN} ₼ / {priceUSD} $
      </p>
    </Link>
  );
}
