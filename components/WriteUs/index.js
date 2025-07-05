"use client";
import "react-toastify/dist/ReactToastify.css";

import Section from "../Section/Section";
import styles from "./styles.module.scss";
import ContactForm from "../ContactForm";
import Map from "../Map";

export default function WriteUs({ t, locale }) {
  return (
    <Section
      name={t?.WriteUs}
      oneLine={false}
      t={t}
      locale={locale}
      className={styles.writeUs}
    >
      <div className={styles.writeUsContainer}>
        <div className={styles.formColumn}>
          <ContactForm t={t} locale={locale}/>
        </div>
        <div className={styles.mapColumn}>
          <Map />
        </div>
      </div>
    </Section>
  );
}
