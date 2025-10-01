import ReservationForm from "@/components/ReservationForm";
import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import RoomSection from "@/components/Home/RoomSection";
import Section from "@/components/Section/Section";
import Modal from "@/components/Modal/Modal";

export default async function Reservations({ params, searchParams }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const rooms = [];

  // Get room and date from URL parameters
  const selectedRoom = searchParams?.room || "";
  const selectedDate = searchParams?.date || "";

  return (
    <div className={global.container}>
      <div className={styles.form}>
        <h1>{t?.ReservForm}</h1>
        <ReservationForm
          t={t}
          locale={locale}
          rooms={rooms}
          currentRoom={selectedRoom}
          initialDate={selectedDate}
        />
      </div>

      <Section
        name={t?.Rooms}
        oneLine={true}
        t={t}
        locale={locale}
        slug="rooms"
        showBtn={true}
        className={styles.section}
      >
        <div className={styles.roomSection}>
          <RoomSection
            name={t?.Rooms}
            oneLine={true}
            t={t}
            locale={locale}
            showBtn={true}
          />
        </div>
      </Section>
    </div>
  );
}
