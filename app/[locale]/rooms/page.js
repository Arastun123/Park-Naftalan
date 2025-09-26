import { getTranslations } from "@/lib/getTranslations";
import RoomCard from "@/components/Cards/RoomCard";

import global from "@/styles/global.module.scss";
import Modal from "@/components/Modal/Modal";
export default async function Rooms({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <RoomCard t={t} locale={locale} />
      <Modal locale={locale} t={t} />
    </div>
  );
}
