import { getTranslations } from "@/lib/getTranslations";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div>
      <h1>{t.Home}</h1>
    </div>
  );
}
