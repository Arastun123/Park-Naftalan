import styles from "./style.module.scss";
export default async function ImageWithText({ t }) {
  return (
    <div className={styles.imageWithText}>
      <img src="/Rectangle 75.png" alt="Park Naftalan Sanatoriyası" />
      <div className={styles.text}>
        <p>{t?.TextForNaftalan}</p>
      </div>
    </div>
  );
}
