import { getTranslations } from "@/lib/getTranslations";
import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import Section from "@/components/Section/Section";

import RoomSection from "@/components/Home/RoomSection";
import WriteUs from "@/components/WriteUs";
import About from "@/components/About";
import Packets from "@/components/Packets";
import Campaigns from "@/components/Campaigns/Campaign";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <div className={global.container}>
        <Section
          className={styles.about}
          name={t?.About}
          oneLine={true}
          t={t}
          locale={locale}
        >
          <p className={styles.desc}>
            <About locale={locale} />
          </p>
        </Section>

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

        {/* <Packets t={t} locale={locale} /> */}
        <Campaigns t={t} locale={locale} />
        <WriteUs t={t} locale={locale} />
      </div>
    </>
  );
}
