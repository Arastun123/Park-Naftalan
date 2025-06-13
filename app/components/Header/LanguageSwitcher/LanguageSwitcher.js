"use client";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (newLocale) => {
    const segments = pathname.split("/");

    if (!segments[1]) {
      router.push(`/${newLocale}`);
      return;
    }

    if (["az", "en", "ru"].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => changeLocale("az")}>AZ</button>
      <button onClick={() => changeLocale("en")}>EN</button>
      <button onClick={() => changeLocale("ru")}>RU</button>
    </div>
  );
}
