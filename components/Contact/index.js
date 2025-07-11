"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import Map from "../Map";
import ContactForm from "../ContactForm";
import SocialMediaIcon from "../SocailMediaIcons";

import styles from "./styles.module.scss";
import { getDatas } from "@/lib/handleApiActions";

export default function ContactComponent({ locale, t }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getDatas("Contact");
      if (datas) setData(datas);
    };

    fetchData();
  }, []);

 

  return (
    <>
      <div className={styles.contact}>
        <div className={styles.left}>
          <div className={styles.linksWrapper}>
            <h2>{t?.ContactUs}</h2>
            <div className={styles.linkGroup}>
              <p>{t?.Phone}</p>
              {data.number?.map((n, i) => (
                <Link key={i} href={`tel:${n}`}>
                  {n}
                </Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Email}</p>
              <Link href={`mailto:${data.mail}`}>{data.mail}</Link>
            </div>
            <div className={styles.linkGroup}>
              <p>{t?.Address}</p>
              <Link href="#">{data.adress}</Link>
            </div>
            <div className={`${styles.linkGroup} ${styles.social}`}>
              <p>{t?.SocialMedia}</p>
              <SocialMediaIcon
                insta={data?.instagramLink}
                face={data?.facebookLink}
                tiktok={data?.tiktokLink}
                wp={data?.whatsappNumber}
                you={data?.youtubeLink}
              />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h2>{t?.SubmitanInquiry}</h2>
          <ContactForm
            t={t}
            locale={locale}
             
          />
        </div>
      </div>
      <Map />
    </>
  );
}
