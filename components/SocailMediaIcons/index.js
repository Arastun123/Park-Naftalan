"use client";
import { useEffect, useState } from "react";
import { Facebook, Tiktok, Youtube, Instagram } from "@/components/Svg/index";
import LinkItem from "../Header/LinkItem/LinkItem";
import { getDatas } from "@/lib/handleApiActions";
import { usePathname } from "next/navigation";

import styles from "@/styles/global.module.scss";
export default function SocialMediaIcon() {
    const pathname = usePathname();
    let isBooking = ["/en/booking", "/ru/booking", "/az/booking"].includes(pathname);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getDatas("Contact");
      if (datas) setData(datas);
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.drawerIcons} ${isBooking ? "hidden" : ""}`}>
      <LinkItem slug={`${data?.instagramLink}`}>
        <Instagram />
      </LinkItem>
      <LinkItem slug={`${data?.facebookLink}`}>
        <Facebook />
      </LinkItem>
      <LinkItem
        slug={`${data?.youtubeLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Youtube />
      </LinkItem>
      <LinkItem slug={`${data?.tiktokLink}`}>
        <Tiktok />
      </LinkItem>
    </div>
  );
}
