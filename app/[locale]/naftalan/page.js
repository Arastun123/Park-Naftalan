import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss"; 

export default async function Naftalan({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={global.container}>
       Naftalan
    </div>
  );
}
