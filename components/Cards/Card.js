import Link from "next/link";
import styles from "./styles.module.scss";
export default function Card({ src, name, t, locale }) {
  return (
    <Link href="/" className={styles.card}>
      <img src={src} alt={name} />
      <h2>{name}</h2>
      {/* <p>{desc}</p> */}
    </Link>
  );
}
