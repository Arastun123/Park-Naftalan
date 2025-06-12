import { getDatas } from "@/lib/getDatas";
import { getTranslations } from "@/lib/getTranslations";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const data = await getDatas("Naftalan", locale);
  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.extract} </p>
    </main>
  );
}
