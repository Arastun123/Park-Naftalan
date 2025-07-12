"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getAznToUsdRate, getDatas } from "@/lib/handleApiActions";

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
  const [currency, setCurrency] = useState(0.5877);

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
      {[...rooms].reverse().map((item) => {
        const currentTranslation = item.translations.find(
          (t) => t.language === lanCode
        );

        const updatedImageUrls = item.imageUrls?.map((url) =>
          url.replace("uploads/", "uploads/images/")
        );

        return (
          <div className={styles.roomCard} key={`${item?.id}-${locale}`}>
            <div className={styles.image}>
              <img
                src={
                  updatedImageUrls?.[0]
                    ? `https://parknaftalan.az/api/${updatedImageUrls[0]}`
                    : "/parkSuite.png"
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

              {updatedImageUrls?.length > 1 && (
                <div className={styles.images}>
                  {updatedImageUrls.slice(1).map((url, idx) => (
                    <img
                      key={idx}
                      src={`https://parknaftalan.az/api/${url}`}
                      alt={`Park Naftalan - ${item.category} - ${idx + 2}. şəkil`}
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
