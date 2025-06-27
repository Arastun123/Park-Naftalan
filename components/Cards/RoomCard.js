"use client";

import { useEffect, useMemo, useState } from "react";
import { getDatas } from "@/lib/handleApiActions";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

export default function RoomCard({ t, locale }) {
  const lanCode = useMemo(() => {
    if (locale === "en") return 0;
    if (locale === "az") return 1;
    return 2;
  }, [locale]);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const data = await getDatas("Room");
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRooms([]);
      }
    };

    fetchDatas();
  }, [locale]);
  console.log(rooms);

  return (
    <div className={styles.roomGrid}>
      {rooms.map((item) => {
        const currentTranslation = item.translations.find(
          (t) => t.language === lanCode
        )
        return (
          <div key={`${item?.id}-${locale}`} className={styles.roomCard}>
            <div className={styles.image}>
              <img
                src={item?.picture || "/parkSuite.png"}
                alt={item?.category || "Room image"}
              />
            </div>
            <div className={styles.desc}>
              <h2>{item.category}</h2>
              <p>
                {t?.Area}: {item?.area} m² | {t?.Price}: {item?.price}₼ |{" "}
                {t?.Guest}: {item?.member}
              </p>
              <p>{currentTranslation?.description}</p>
              <Button slug="rooms" className={styles.reserveBtn}>
                {t?.SeeMore}
              </Button>
              <div className={styles.images}>
                {[1, 2, 3].map((_, idx) => (
                  <img
                    key={idx}
                    src={item?.picture || "/parkSuite.png"}
                    alt={item?.category || "Room image"}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
