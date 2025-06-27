"use client";
import { useEffect, useState } from "react";

import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import Section from "@/components/Section/Section";
import Card from "@/components/Cards/Card";
import { getDatas } from "@/lib/handleApiActions";
export default function RoomSection({ name, oneLine, t, locale }) {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetchDatas();
  }, [rooms]);

  const fetchDatas = async () => {
    const rooms = await getDatas("Room");
    setRooms(rooms);
  };

  return (
    <Section
      name={t?.Rooms}
      oneLine={true}
      t={t}
      locale={locale}
      slug="rooms"
    >
      <div className={styles.rooms}>
        {rooms.map((item, i) => (
          <Card
            src={"./header.png"}
            name={item.category}
            t={t}
            locale={locale}
            key={`${item.name}_${i}`}
          />
        ))}
      </div>
    </Section>
  );
}
