"use client";
import { useEffect, useState, useRef } from "react";
import { getDatas } from "@/lib/handleApiActions";

import "@/styles/reset.css";
import styles from "@/styles/index.module.scss";
import Button from "@/components/Button/Button";
import { ArrowLeft, ArrowRight } from "@/components/Svg";
import Link from "next/link";
import Loading from "@/components/Loading";
import useScrollCarousel from "@/helper/corusel";

function Card({ src, name, slug }) {
  return (
    <Link href={slug} className={styles.card}>
      <img src={src} alt={`Park Naftalan Sanatoriyası - ${name}`} />
      <p>{name}</p>
    </Link>
  );
}

export default function RoomSection({ t, locale, showBtn }) {
  const [rooms, setRooms] = useState([]);
  const carouselRef = useRef(null);

  const {
    canScrollLeft,
    canScrollRight,
    activeIndex,
    scrollCarousel,
    scrollToDot,
  } = useScrollCarousel(carouselRef, rooms);

  useEffect(() => {
    const fetchRoomsData = async () => {
      const roomsData = await getDatas("Room");
      setRooms(roomsData);
    };
    fetchRoomsData();
  }, []);

  const buildImageUrl = (url) => {
    if (!url) return "/parkSuite.png"; 
    return `http://localhost:5041/${url}`;
  };

  if (!rooms || rooms.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.roomsContainer}>
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

        <div className={styles.rooms} ref={carouselRef}>
          {rooms.map((item, i) => (
            <Card
              key={`${item?.id}-${i}`}
              slug={`/rooms/${item.id}`}
              src={buildImageUrl(item.imageUrls?.[0])}
              name={item?.category}
            />
          ))}
        </div>

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

      <div className={styles.carouselPagination}>
        {rooms.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === activeIndex ? styles.active : ""
            }`}
            onClick={() => scrollToDot(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </>
  );
}
