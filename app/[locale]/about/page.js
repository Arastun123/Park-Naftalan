import { getDatas } from "@/lib/getDatas";
import { getTranslations } from "@/lib/getTranslations";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const data = await getDatas("Naftalan", locale);
  console.log("fsfs", data);
  return (
    <div>
      <h1>sds</h1>
      <p>dsds </p>
    </div>
  );
}
