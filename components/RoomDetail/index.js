"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getDataByid, getDatas } from "@/lib/handleApiActions";

import ImageSlider from "../ImageSlider";
import style from "./style.module.scss";
import { Person } from "../Svg";
import Video from "../Video/VIdeo";
import Loading from "../Loading";
import { constructFrom } from "date-fns";
// import ReservationForm from "../ReservationForm"; // Əgər varsa əlavə et

export default function RoomDetail({ t, locale }) {
  const [room, setRoom] = useState(null);
  const [equipment, setEquipment] = useState([]);

  const params = useParams();
  const id = params.id;

  const lanCode = useMemo(() => {
    if (locale === "en") return 0;
    if (locale === "az") return 1;
    return 2;
  }, [locale]);
  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const data = await getDataByid("Room", id);
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
  console.log(matchedEquipments);
  // console.log(equipment);
  // console.log(room);

  const selectedTranslation = room.translations?.find(
    (t) => t.language === lanCode
  );

  const images = [
    "/DSC_0610.png",
    "/DSC_0618.png",
    "/DSC_0620.png",
    "/DSC_6927.png",
  ];

  return (
    <div className={style.detail}>
      <h1>{room?.category}</h1>

      <ImageSlider images={images} />
      <div className={style.contentArea}>
        <div>
          <div className={style.info}>
            <div className={style.row}>
              <span> {t?.Area}:</span> <strong>{room?.area} m²</strong>
            </div>
            <div className={style.row}>
              <span> {t?.Price}:</span> <strong>{room?.price} AZN</strong>
            </div>
            <div className={style.row}>
              <span> {t?.Guest}:</span>{" "}
              <strong>
                {Array.from({ length: +room?.member }).map((_, index) => (
                  <span key={index}>
                    <Person color="#000" />
                  </span>
                ))}
              </strong>
            </div>
          </div>

          <div className={style.desc}>
            <p>{selectedTranslation?.description}</p>
            <h2>{t?.Service}</h2>
            <p>{selectedTranslation?.service}</p>
            <ul>
              {matchedEquipments.map((item) => (
                <li key={`${item.id}-${item.language}`}>• {item.name}</li>
              ))}
            </ul>
          </div>

          {room?.youtubeVideoLink && (
            <div className={style.video}>
              <Video
                src={
                  room?.youtubeVideoLink ||
                  "https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1"
                }
              />
            </div>
          )}
        </div>

        <div className={style.form}>
          <h2>Make a Reservation</h2>
          <p>Reservation form here...</p>
        </div>
      </div>
    </div>
  );
}
