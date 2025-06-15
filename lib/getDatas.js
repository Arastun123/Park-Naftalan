export async function getDatas(topic, locale = "az") {
  const langMap = {
    az: "az",
    en: "en",
    ru: "ru",
  };
  const lang = langMap[locale] || "az";

  try {
    const res = await fetch(
      `http://localhost:7152/api/Products/1?lang=${lang}`,
      {
        headers: {
          accept: "*/*",
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      throw new Error(`Failed to fetch data`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getDatas:", error);
    return null;
  }
}
