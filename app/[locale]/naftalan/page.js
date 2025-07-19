import Illness from "@/components/Illness";
import ImageWithText from "@/components/ImageWithText";
import MedicalProcedures from "@/components/MedicalProcedures";
import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss";

export default async function Naftalan({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
      <ImageWithText t={t}/>
      <MedicalProcedures t={t} locale={locale} />
      <h3 className={global.medical}>{t?.Medical}</h3>
      <Illness t={t} locale={locale}/>
    </div>
  );
}
