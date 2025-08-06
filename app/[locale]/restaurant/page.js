import Restaurant from "@/components/Restaurant/inde";

import { getTranslations } from "@/lib/getTranslations";

export default async function RestaurantPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return <Restaurant t={t} locale={locale} />;
}
