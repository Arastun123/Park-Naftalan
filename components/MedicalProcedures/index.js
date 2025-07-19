"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { getDatas } from "@/lib/handleApiActions";

import styles from "@/styles/naftalan.module.scss";
import Button from "@/components/Button/Button";
import { ArrowLeft, ArrowRight } from "@/components/Svg";

import Loading from "@/components/Loading";
import useScrollCarousel from "@/helper/corusel";

function Card({ src, name, stil }) {
  return (
    <div className={stil}>
      <img
        src={src}
        alt={`Park Naftalan Sanatoriyası - ${name}`}
      />
      <p>{name}</p>
    </div>
  );
}
export default function MedicalProcedures({ t, locale }) {
  const carouselRef = useRef(null);
  const [data, setData] = useState([]);

  const lanCode = useMemo(() => {
    if (locale === "en") return 1;
    if (locale === "az") return 2;
    return 3;
  }, [locale]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const result = await getDatas("treatmentMethod");
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to fetch treatment methods:", error);
        setData([]);
      }
    };

    fetchDatas();
  }, []);

  const filteredData = useMemo(
    () => data.filter((item) => item.language === lanCode),
    [data, lanCode]
  );

  const {
    canScrollLeft,
    canScrollRight,
    activeIndex,
    scrollCarousel,
    scrollToDot,
  } = useScrollCarousel(carouselRef, data);

  if (!data || data.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.medical}>
      <div className={styles.coruselContainer}>
        <div className={styles.cards} ref={carouselRef}>
          {filteredData.map((item, i) => (
            <Card
              src={item?.name}
              name={item?.name}
              key={`${item.name}_${i}`}
              isActive={i === activeIndex}
              stil={`${styles.card} ${
                i === activeIndex ? styles.activeCard : ""
              }`}
            />
          ))}
        </div>

        <div className={styles.carouselNavButtons}>
          <Button
            onClick={() => scrollCarousel("left")}
            className={`${styles.carouselNavButton} ${
              !canScrollLeft ? styles.disabled : ""
            }`}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </Button>
          <Button
            onClick={() => scrollCarousel("right")}
            className={`${styles.carouselNavButton} ${
              !canScrollRight ? styles.disabled : ""
            }`}
            aria-label="Scroll right"
            disabled={!canScrollRight}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
