import styles from "./styles.module.scss";
import Button from "../Button/Button";
import Link from "next/link";

export default function Section({
  children,
  className,
  name,
  oneLine,
  t,
  locale,
  slug,
}) {
  const title = (
    <div className={styles.sectionTitle}>
      <p>{name}</p>
    </div>
  );

  return (
    <section className={`${styles.section} ${className}`}>
      {oneLine && title}
      <div>
        {!oneLine && title}

        {children}
      </div>
      <div className={styles.btnContainer}>
        <Link className={styles.btn} href={`/${locale}/${slug}`}>
          {t?.SeeMore}
        </Link>
      </div>
    </section>
  );
}
