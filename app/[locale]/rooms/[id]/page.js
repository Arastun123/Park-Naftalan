import RoomSection from "@/components/Home/RoomSection";
import RoomDetail from "@/components/RoomDetail";
import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss";
export default async function Detail({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <RoomDetail t={t} locale={locale} />
      <RoomSection name={t?.Rooms} oneLine={true} t={t} locale={locale} showBtn={false} />
    </div>
  );
}
