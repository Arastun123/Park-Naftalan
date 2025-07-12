"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getDataById, getDatas } from "@/lib/handleApiActions";

import Video from "../Video/VIdeo";
import Loading from "../Loading";

import style from "./style.module.scss";
import Button from "../Button/Button";

export default function RoomDetail({ t, locale }) {
  const [room, setRoom] = useState(null);

  const [equipment, setEquipment] = useState([]);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const lanCode = useMemo(() => {
    if (locale === "en") return 1;
    if (locale === "az") return 2;
    return 3;
  }, [locale]);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const data = await getDataById("Room", id);

    if (data) {
      setRoom(data);
    }

    const equipmentData = await getDatas("Equipment");
    setEquipment(equipmentData);
  };

  if (!room) return <Loading />;

  const matchedEquipments = equipment.filter(
    (item) => room.equipmentIds.includes(item.id) && item.language === lanCode
  );

  const selectedTranslation = room.translations?.find(
    (t) => t.language === lanCode
  );

  // Helper function to build full image URL and replace "uploads/" to "uploads/images/"
  const buildImageUrl = (url) => {
    if (!url) return "/parkSuite.png";
    return `https://parknaftalan.az/${url}`;
  };

  return (
    <div className={style.detail}>
      <div className={style.head}>
        <div className={style.top}>
          <h1>{room?.category}</h1>
          <p>{selectedTranslation?.title}</p>
        </div>
        <div className={style.dFlex}>
          <p>{selectedTranslation?.miniDescription}</p>
          <Button
            onClick={() =>
              router.push(`/${locale}/reservations/${room?.category}`)
            }
            className={style.reserveBtn}
          >
            {t?.Reservation}
          </Button>
        </div>
      </div>

      <img
        src={buildImageUrl(room.imageUrls?.[0])}
        alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
      />

      <p className={style.centerText}>{room?.miniTitle}</p>
      <p>
        {room?.area} m <sup>2</sup>
      </p>

      <div className={style.images}>
        <div className={style.rightSide}>
          <img
            src={buildImageUrl(room.imageUrls?.[1])}
            alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
            title={`Park Naftalan Otağı - ${room?.category}`}
          />
        </div>

        <div className={style.lefttSide}>
          <div className={style.imageWithText}>
            <img
              src={buildImageUrl(room.imageUrls?.[2])}
              alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
              title={`Park Naftalan Otağı - ${room?.category}`}
            />
            <div className={style.text}>
              <p>{selectedTranslation?.description}</p>
            </div>
          </div>
          <div>
            <img
              src={buildImageUrl(room.imageUrls?.[3])}
              alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
              title={`Park Naftalan Otağı - ${room?.category}`}
            />
          </div>
        </div>
      </div>

      <h2>{t?.Equipment}</h2>
      <ul className={style.equipments}>
        {matchedEquipments.map((item) => (
          <li key={`${item.id}-${item.language}`}>• {item?.name}</li>
        ))}
      </ul>

      {/* <div className={style.video}>
        <p>{t?.VideoTitel}</p>
        <Video
          src={
            room.youtubeVideoLink
              ? room.youtubeVideoLink.replace("watch?v=", "embed/")
              : "https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1"
          }
        />
      </div> */}
    </div>
  );
}
