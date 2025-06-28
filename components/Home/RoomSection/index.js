"use client";
import { useEffect, useState } from "react";
import { getAznToUsdRate, getDatas } from "@/lib/handleApiActions";

import Section from "@/components/Section/Section";
import Card from "@/components/Cards/Card";

import "@/styles/reset.css";
import styles from "@/styles/index.module.scss";
export default function RoomSection({ t, locale, showBtn }) {
  const [rooms, setRooms] = useState([]);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    fetchDatas();
    // loadCurrencyRate();
  }, [rooms]);

  const fetchDatas = async () => {
    const rooms = await getDatas("Room");
    setRooms(rooms);
  };

  // function loadCurrencyRate() {
  //   getAznToUsdRate().then((rate) => {
  //     setRate(rate);
  //   });
  // }
  return (
    <Section
      name={t?.Rooms}
      oneLine={true}
      t={t}
      locale={locale}
      slug="rooms"
      showBtn={showBtn}
    >
      <div className={styles.rooms}>
        {rooms.map((item, i) => (
          <Card
            slug={`/rooms/${item.id}`}
            src={"/DSC_0610.png"}
            name={item?.category}
            t={t}
            locale={locale}
            key={`${item?.name}_${i}`}
            member={item?.member}
            priceAZN={item?.price}
            priceUSD={(item?.price * rate).toFixed(0)}
          />
        ))}
      </div>
    </Section>
  );
}
