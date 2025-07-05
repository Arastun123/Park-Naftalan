"use client";
import { useState } from "react";
import Input from "../Input";
import Section from "../Section/Section";
import Button from "../Button/Button";
import { sendMail } from "@/lib/handleApiActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ContactForm />
        </div>
        <div className={styles.mapColumn}>
          <Map />
        </div>
      </div>
    </Section>
  );
}
