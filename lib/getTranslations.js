import fs from "fs";
import path from "path";

export async function getTranslations(locale = "en") {
  const filePath = path.resolve(process.cwd(), "locales", `${locale}.json`);
  const data = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
