"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getDatas } from "@/lib/handleApiActions";

import Button from "../Button/Button";
import Loading from "../Loading";

import styles from "./styles.module.scss";

export default function RoomCard({ t, locale }) {
  const lanCode = useMemo(() => {
    if (locale === "en") return 0;
    if (locale === "az") return 1;
    return 2;
  }, [locale]);
  const router = useRouter();

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

  if (!rooms || rooms.length === 0) {
    return <Loading />;
  }
  return (
    <div className={styles.roomGrid}>
      <>
        {rooms.map((item) => {
          const currentTranslation = item.translations.find(
            (t) => t.language === lanCode
          );
          return (
            <div key={`${item?.id}-${locale}`} className={styles.roomCard}>
              <div className={styles.image}>
                <img
                  src={item?.picture || "/parkSuite.png"}
                  alt={`Park Naftalan Sanatoriyası - ${item?.category}`}
                />
              </div>
              <div className={styles.desc}>
                <h2>{item.category}</h2>
                <p>
                  {t?.Area}: {item?.area} m² | {t?.Price}: {item?.price}₼ |{" "}
                  {t?.Guest}: {item?.member}
                </p>
                <p>{currentTranslation?.description}</p>
                <Button
                  onClick={() => router.push(`rooms/${item.id}`)}
                  className={styles.reserveBtn}
                >
                  {t?.SeeMore}
                </Button>
                <div className={styles.images}>
                  {[1, 2, 3].map((_, idx) => (
                    <img
                      key={idx}
                      src={item?.picture || "/parkSuite.png"}
                     alt={`Park Naftalan Sanatoriyası - ${item?.category}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}
