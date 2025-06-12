import { getTranslations } from "@/lib/getTranslations";

export default async function Home({ params }) {
  const { locale } = params;
  const t = await getTranslations(locale);

  return (
    <main>
      <h1>{t.Home}</h1>
    </main>
  );
}
