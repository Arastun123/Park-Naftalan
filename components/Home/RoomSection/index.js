"use client";
import { useEffect, useState, useRef } from "react";
import { getAznToUsdRate, getDatas } from "@/lib/handleApiActions";

import Section from "@/components/Section/Section";

import "@/styles/reset.css";
import styles from "@/styles/index.module.scss";
import Button from "@/components/Button/Button";
import { ArrowLeft, ArrowRight } from "@/components/Svg";
import Link from "next/link";
import Loading from "@/components/Loading";

function Card({ src, name, slug }) {
  return (
    <Link href={slug} className={styles.card}>
      <img src={src} alt={name} />
      <p>{name}</p>
    </Link>
  );
}

export default function RoomSection({ t, locale, showBtn }) {
  const [rooms, setRooms] = useState([]);
  const [rate, setRate] = useState(1);

  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchRoomsData = async () => {
      const roomsData = await getDatas("Room");
      setRooms(roomsData);
    };
    fetchRoomsData();
  }, []);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    const checkScroll = () => {
      if (carouselElement && rooms.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselElement;

        const firstCard = carouselElement.children[0];
        if (firstCard) {
          const itemWidth = firstCard.offsetWidth + 15;
          const newIndex = Math.round(scrollLeft / itemWidth);
          setActiveIndex(newIndex);
        }

        setCanScrollLeft(true);
        setCanScrollRight(true);
      }
    };

    checkScroll();
    if (carouselElement) {
      carouselElement.addEventListener("scroll", checkScroll);
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkScroll, 150);
      };
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [rooms]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current && rooms.length > 0) {
      const carouselElement = carouselRef.current;
      const firstCard = carouselElement.children[0];

      if (!firstCard) return;

      const itemWidth = firstCard.offsetWidth + 15;

      if (direction === "left") {
        if (carouselElement.scrollLeft === 0) {
          carouselElement.scrollTo({
            left: (rooms.length - 1) * itemWidth,
            behavior: "smooth",
          });
        } else {
          carouselElement.scrollBy({
            left: -itemWidth,
            behavior: "smooth",
          });
        }
      } else {
        const scrollAtEnd =
          carouselElement.scrollLeft + carouselElement.clientWidth >=
          carouselElement.scrollWidth - 5;

        if (scrollAtEnd) {
          carouselElement.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          carouselElement.scrollBy({
            left: itemWidth,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const scrollToDot = (index) => {
    if (carouselRef.current && rooms.length > 0) {
      const firstCard = carouselRef.current.children[0];
      if (firstCard) {
        const itemWidth = firstCard.offsetWidth + 15;
        carouselRef.current.scrollTo({
          left: index * itemWidth,
          behavior: "smooth",
        });
      }
    }
  };

  if (!rooms || rooms.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.roomsContainer}>
        <Button
          onClick={() => scrollCarousel("left")}
          className={styles.carouselNavButton}
          aria-label="Scroll left"
        >
          <ArrowLeft />
        </Button>

        <div className={styles.rooms} ref={carouselRef}>
          {rooms.map((item, i) => (
            <Card
              slug={`/rooms/${item.id}`}
              src={`/${++i}.png`}
              name={item?.category}
              key={`${item?.name}_${i}`}
            />
          ))}
        </div>

        <Button
          onClick={() => scrollCarousel("right")}
          className={styles.carouselNavButton}
          aria-label="Scroll right"
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
