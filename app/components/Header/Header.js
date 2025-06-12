import { getTranslations } from "@/lib/getTranslations";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";

export default async function Header({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <header>
      <LanguageSwitcher />
      <br />
      <Link href={`/${locale}`}>{t.Home}</Link>
      <br />

      <Link href={`/${locale}/about`}>{t.About}</Link>
      <br />

      <Link href={`/${locale}/contact`}>{t.Contact}</Link>
    </header>
  );
}
