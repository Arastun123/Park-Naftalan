"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";

export default function ImageSlider({ images }) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      spaceBetween={10}
      slidesPerView={1}
      style={{ width: "100%", height: "auto" }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Park Naftalan Sanatoriyası ${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
