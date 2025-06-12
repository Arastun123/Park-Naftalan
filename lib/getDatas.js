export async function getDatas(topic, locale = "az") {
  const langMap = {
    az: "az",
    en: "en",
    ru: "ru",
  };
  const lang = langMap[locale] || "az";
  const title = locale === "ru" ? "Нафталан" : "Naftalan";

  const res = await fetch(
    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`
  );
  if (!res.ok) throw new Error("Failed to fetch Wikipedia data");
  return res.json();
}
