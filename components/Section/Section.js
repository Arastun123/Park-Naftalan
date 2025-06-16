import styles from "./styles.module.scss";
import Button from "../Button/Button";

export default function Section({ children, className }) {
  return (
    <section className={`${styles.section} ${className}`}>
      <div>
        <div className={styles.sectionTitle}>
          <p>Haqqımızda</p>
        </div>
        {children}
      </div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn}>Ətraflı bax</Button>
      </div>
    </section>
  );
}
