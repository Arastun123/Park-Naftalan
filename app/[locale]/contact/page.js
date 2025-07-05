import Contact from "@/components/Contact";
import { getDatas } from "@/lib/handleApiActions";
import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  // const data = await getDatas("Naftalan", locale);

  return (
    <div className={global.container}>
      <Contact t={t} locale={locale} />
    </div>
  );
}
