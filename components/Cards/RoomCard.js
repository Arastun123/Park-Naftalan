"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getAznToUsdRate, getDatas } from "@/lib/handleApiActions";

import Button from "../Button/Button";
import Loading from "../Loading";

import styles from "./styles.module.scss";

export default function RoomCard({ t, locale }) {
  const lanCode = useMemo(() => {
    if (locale === "en") return 1;
    if (locale === "az") return 2;
    return 3;
  }, [locale]);

  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [currency, setCurrency] = useState(0.5877);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const data = await getDatas("Room");
        if (Array.isArray(data)) {
          const sortedData = data
            .map((item) => ({
              ...item,
              category: item.category.trim(),
            }))
            .sort((a, b) => a.category.localeCompare(b.category, "az"));

          setRooms(sortedData);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRooms([]);
      }
    };

    const getCurrency = async () => {
      const currency = await getAznToUsdRate();
      if (currency) setCurrency(currency);
    };

    fetchDatas();
    getCurrency();
  }, [locale]);

  if (!rooms || rooms.length === 0) {
    return <Loading />;
  }
  

  return (
    <div className={styles.roomGrid}>
      {[...rooms].map((item) => {
        const currentTranslation = item.translations.find(
          (t) => t.language === lanCode
        );

        return (
          <div className={styles.roomCard} key={`${item?.id}-${locale}`}>
            <div className={styles.image}>
              <img
                src={
                  item.imageUrls[0]
                    ? `https://parknaftalan.az/${item?.imageUrls[0]}`
                    : "/DSC_0610.png"
                }
                alt={`Park Naftalan Sanatoriyası - ${item?.category}`}
              />
            </div>

            <div className={styles.desc}>
              <h2>{item.category}</h2>
              <p>
                {t?.Area}: {item?.area} m² | {t?.Price}: {item?.price}₼ /{" "}
                {(Number(item?.price) * currency).toFixed(0)} $ | {t?.Guest}:{" "}
                {item?.member}
              </p>
              <p>{currentTranslation?.description}</p>

              <Button
                onClick={() => router.push(`rooms/${item.id}`)}
                className={styles.reserveBtn}
              >
                {t?.SeeMore}
              </Button>

              {item?.imageUrls?.length > 1 && (
                <div className={styles.images}>
                  {item?.imageUrls.slice(1).map((url, idx) => (
                    <img
                      key={idx}
                      src={` https://parknaftalan.az/${url}`}
                      alt={`Park Naftalan - ${item.category} - ${
                        idx + 2
                      }. şəkil`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
