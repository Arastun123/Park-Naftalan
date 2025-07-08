import Link from "next/link";

import Map from "../Map";
import ContactForm from "../ContactForm";
import SocialMediaIcon from "../SocailMediaIcons";

import styles from "./styles.module.scss";

export default async function Contact({ locale, t }) {
  return (
    <>
      <div className={styles.contact}>
        <div className={styles.left}>
          <div className={styles.linksWrapper}>
            <h2>{t?.ContactUs}</h2>
            <div className={styles.linkGroup}>
              <p>{t?.Phone}</p>
              <Link href="tel:+994502342458">050-234-24-58</Link>
              <Link href="tel:+994223522212">022-352-22-12</Link>
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Email}</p>
              <Link href="mailto:parknaftalan@gmail.com">
                parknaftalan@gmail.com
              </Link>
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Address}</p>
              <Link href="#">Park Naftalan, Naftalan, Azerbaijan 4600</Link>
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
