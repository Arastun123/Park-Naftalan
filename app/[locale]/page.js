import { getTranslations } from "@/lib/getTranslations";
import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import Section from "@/components/Section/Section";

import RoomSection from "@/components/Home/RoomSection";
import { getAznToUsdRate } from "@/lib/handleApiActions";
import WriteUs from "@/components/WriteUs";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <Section
        className={styles.about}
        name={t?.About}
        oneLine={false}
        t={t}
        locale={locale}
      >
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Amet cursus enim sem et proin.
          Justo eget risus sollicitudin mauris nulla sapien diam. Semper in
          facilisis augue diam nibh arcu turpis lacus potenti. Netus sit
          consequat nullam id proin. Est risus lobortis lectus amet mattis odio.
        </p>
      </Section>
      <RoomSection
        name={t?.Rooms}
        oneLine={true}
        t={t}
        locale={locale}
        showBtn={true}
      />
      <WriteUs />
    </div>
  );
}
