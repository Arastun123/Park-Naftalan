import styles from "./styles.module.scss";
import Button from "../Button/Button";

export default function Section({
  children,
  className,
  name,
  oneLine,
  t,
  locale,
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
        <Button className={styles.btn}>{t?.SeeMore}</Button>
      </div>
    </section>
  );
}
