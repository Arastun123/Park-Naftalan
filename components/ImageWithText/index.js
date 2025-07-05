import styles from "./style.module.scss";
export default async function ImageWithText({ t, locale }) {
  return (
    <div className={styles.imageWithText}>
      <img src="/Rectangle 75.png" alt="Park Naftalan" />
      <div className={styles.text}>
        <p>
          Azərbaycanın Naftalan şəhərində çıxarılan və adını da bu şəhərdən alan
          Naftalan nefti, dünyanın unikal tibbi neft növlərindən biridir.
          Tərkibindəki bioloji aktiv maddələr sayəsində bu neft əsrlər boyu
          müalicəvi xüsusiyyətləri ilə tanınmış və bir çox xəstəliklərin təbii
          yolla sağalmasında istifadə edilmişdir{" "}
        </p>
      </div>
    </div>
  );
}
