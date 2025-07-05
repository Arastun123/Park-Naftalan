import Link from "next/link";
import ContactForm from "../ContactForm";
import WriteUs from "../WriteUs";
import styles from "./styles.module.scss";
import Map from "../Map";
import SocialMediaIcon from "../SocailMediaIcons";

export default async function Contact({ locale, t }) {
  return (
    <>
      <div className={styles.contact}>
        <div className={styles.left}>
          <div className={styles.linksWrapper}>
            <h2>{t?.ContactUs}</h2>
            <div className={styles.linkGroup}>
              <p>{t?.Phone}</p>
              <Link href="tel:05555555">055-555-55</Link>
              <Link href="tel:05555555">055-555-55</Link>
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Email}</p>
              <Link href="mailto:parknaftalan@gmail.com">
                parknaftalan@gmail.com
              </Link>
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Address}</p>
              <Link href="#">64А Р.Зульфикаров, Naftalan 4600</Link>
            </div>
            <div className={styles.linkGroup + " " + styles.social}>
              <p>{t?.SocialMedia}</p>
              <SocialMediaIcon />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h2>{t?.SubmitanInquiry}</h2>
          <ContactForm t={t} locale={locale} />
        </div>
      </div>
      <Map />
    </>
  );
}
