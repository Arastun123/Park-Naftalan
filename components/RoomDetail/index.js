"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getDataByid, getDatas } from "@/lib/handleApiActions";

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

  const selectedTranslation = room.translations?.find(
    (t) => t.language === lanCode
  );

  console.log(matchedEquipments);
  const images = [
    "/DSC_0610.png",
    "/DSC_0618.png",
    "/DSC_0620.png",
    "/DSC_6927.png",
  ];

  return (
    <div className={style.detail}>
      <div className={style.head}>
        <div className={style.top}>
          <h1>{room?.category}</h1>
          <p>Rahatlıq və Sakitliyin Ünvanı</p>
        </div>
        <div className={style.dFlex}>
          <p>
            Hər bir otaq zövqlə dizayn edilmiş və istirahətinizin maksimum
            komfortla təmin olunması üçün bütün zəruri şəraitlə təchiz
            olunmuşdur.
          </p>
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
        src="/park suite 1.png"
        alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
      />
      <p className={style.centerText}>
        Rahat ikinəfərlik və ya tək nəfərlik çarpayı
      </p>
      <p>
        {room?.area} m <sup>2</sup>
      </p>
      <div className={style.images}>
        <div className={style.rightSide}>
          <img
            src="/park suite 1.png"
            alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
            title={`Park Naftalan Otağı - ${room?.category}`}
          />
        </div>
        <div className={style.lefttSide}>
          <div className={style.imageWithText}>
            <img
              src="/park suite 1.png"
              alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
              title={`Park Naftalan Otağı - ${room?.category}`}
            />
            <div className={style.text}>
              <p>
                Bu otaqlar, istər müalicə məqsədli, istərsə də ümumi istirahət
                üçün gələn qonaqlarımızın ehtiyaclarına tam cavab verir. Rahat
                mühit, təmiz hava və sakitlik sizə xoş istirahət və enerji ilə
                dolu bir təcrübə bəxş edəcək. Bu otaqlar, istər müalicə
                məqsədli, istərsə də ümumi istirahət üçün gələn qonaqlarımızın
                ehtiyaclarına tam cavab verir. Rahat mühit, təmiz hava və
                sakitlik sizə xoş istirahət və enerji ilə dolu bir təcrübə bəxş
                edəcək.
              </p>
              <Button
                onClick={() => router.push(`/${locale}/reservations`)}
                className={style.reserveBtn}
              >
                {t?.Reservation}
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/park suite 1.png"
              alt={`Park Naftalan Sanatoriyası - ${room?.category}`}
              title={`Park Naftalan Otağı - ${room?.category}`}
            />
          </div>
        </div>
      </div>
      <h2>Təchizatlar</h2>
      <ul className={style.equipments}>
        {matchedEquipments.map((item) => (
          <li key={`${item.id}-${item.language}`}>• {item?.name}</li>
        ))}
      </ul>
      <div className={style.video}>
        <p>Otağı vizual olaraq kəşf et</p>
        <Video src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1" />
      </div>
    </div>
  );
}
