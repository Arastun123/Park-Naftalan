import { getTranslations } from "@/lib/getTranslations";
import HeaderClient from "./HeaderClient/Header";
import styles from "./Header.module.scss";
import BeSearchForm from "@/components/BeForms/be-search-form";

export default async function Header({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <header className={styles.header}>
        <HeaderClient locale={locale} t={t} />
      </header>
      <BeSearchForm locale={locale} className={"mt-100"} />
    </>
  );
}
