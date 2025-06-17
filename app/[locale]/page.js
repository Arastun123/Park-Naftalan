import { getTranslations } from "@/lib/getTranslations";
import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import Section from "@/components/Section/Section";
import Card from "@/components/Cards/Card";

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
      <Section name={t?.Rooms} oneLine={true} t={t} locale={locale}>
        <div className={styles.rooms}>
          <Card
            src={"./header.png"}
            name={"Family Suite"}
            desc={"Family Suite"}
            t={t}
            locale={locale}
          />
          <Card
            src={"./parkSuite.png"}
            name={"Park Suite"}
            desc={"Park Suite"}
            t={t}
            locale={locale}
          />
          <Card
            src={"./Standart.png"}
            name={"Standart otaq"}
            desc={"Standart otaq"}
            t={t}
            locale={locale}
          />
          <Card
            src={"./Rectangle.png"}
            name={"Family"}
            desc={"Ailəvi Rahatlıq və Geniş Yaşayış Məkanı"}
            t={t}
            locale={locale}
          />
        </div>
      </Section>
    </div>
  );
}
