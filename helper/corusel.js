import { useEffect, useState, useCallback } from "react";

export default function useScrollCarousel(carouselRef, rooms = []) {
 
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement || rooms.length === 0) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselElement;

    const firstCard = carouselElement.children[0];
    if (firstCard) {
      const itemWidth = firstCard.offsetWidth + 15;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    }

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, [carouselRef, rooms]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement || rooms.length === 0) return;

    checkScroll();

    carouselElement.addEventListener("scroll", checkScroll);
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScroll, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      carouselElement.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [carouselRef, checkScroll, rooms]);

  const scrollCarousel = useCallback(
    (direction) => {
      const carouselElement = carouselRef.current;
      if (!carouselElement || rooms.length === 0) return;

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
    },
    [carouselRef, rooms]
  );

  const scrollToDot = useCallback(
    (index) => {
      const carouselElement = carouselRef.current;
      if (!carouselElement || rooms.length === 0) return;

      const firstCard = carouselElement.children[0];
      if (firstCard) {
        const itemWidth = firstCard.offsetWidth + 15;
        carouselElement.scrollTo({
          left: index * itemWidth,
          behavior: "smooth",
        });
      }
    },
    [carouselRef, rooms]
  );

  return {
    canScrollLeft,
    canScrollRight,
    activeIndex,
    scrollCarousel,
    scrollToDot,
  };
}
