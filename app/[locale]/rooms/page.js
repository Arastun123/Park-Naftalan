import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss";
import RoomCard from "@/components/Cards/RoomCard";

export default async function Rooms({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <RoomCard t={t} locale={locale} />
    </div>
  );
}
