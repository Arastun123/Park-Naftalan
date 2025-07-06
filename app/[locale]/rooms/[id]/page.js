import RoomSection from "@/components/Home/RoomSection";
import RoomDetail from "@/components/RoomDetail";
import Section from "@/components/Section/Section";

import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";


export default async function Detail({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <RoomDetail t={t} locale={locale} />
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
