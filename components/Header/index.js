import { getTranslations } from "@/lib/getTranslations";

import HeaderClient from "./HeaderClient/Header";
import styles from "./Header.module.scss";

export default async function Header({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <header
      // style={{
      //   backgroundImage: `url('/headermain.png')`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
      className={styles.header}
    >
      <HeaderClient locale={locale} t={t} />
    </header>
  );
}
