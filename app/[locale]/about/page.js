import AboutPageMain from "@/components/AboutPage";
import { getTranslations } from "@/lib/getTranslations";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return <AboutPageMain t={t} locale={locale} />;
}
