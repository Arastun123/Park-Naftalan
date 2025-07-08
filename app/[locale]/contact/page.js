import ContactComponent from "@/components/Contact";

import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <ContactComponent t={t} locale={locale} />
    </div>
  );
}
