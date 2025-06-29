import ReservationForm from "@/components/ReservationForm";
import { getTranslations } from "@/lib/getTranslations";

import styles from "@/styles/reservation.module.scss";
import global from "@/styles/global.module.scss";
import RoomSection from "@/components/Home/RoomSection";
export default async function Reservations({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const rooms = [];

  return (
    <div className={global.container}>
      <div className={styles.form}>
        <h1>Reservation Formu</h1>
        <ReservationForm t={t} locale={locale} rooms={rooms} currentRoom="" />
      </div>
      <RoomSection
        name={t?.Rooms}
        oneLine={true}
        t={t}
        locale={locale}
        showBtn={false}
      />
    </div>
  );
}
