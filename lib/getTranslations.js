import path from "path";
import fs from "fs";

const supportedLocales = ["az", "en", "ru"];

export async function getTranslations(locale = "az") {
  if (!supportedLocales.includes(locale)) {
    locale = "az";
  }

  const filePath = path.resolve(process.cwd(), "locales", `${locale}.json`);
  const data = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
