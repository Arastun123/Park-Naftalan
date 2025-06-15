import { getTranslations } from "@/lib/getTranslations";
import Calendar from "@/components/Calendar/Calendar";
import '@/styles/reset.css';
import '@/styles/global.module.scss';

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div>
      {/* <h1>{t.Home}</h1> */}
      {/* <Calendar locale={locale}/> */}
    </div>
  );
}
