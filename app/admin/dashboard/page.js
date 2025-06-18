import { getTranslations } from "@/lib/getTranslations";
import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import styles from "@/styles/index.module.scss";
import Section from "@/components/Section/Section";
import Card from "@/components/Cards/Card";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return <div className={global.container}>Admin</div>;
}
