"use client";
import { usePathname, useRouter } from "next/navigation";
import style from "./styles.module.scss";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState("AZ");

  useEffect(() => {
    const segments = pathname.split("/");
    const currentLocale = segments[1] || "az";
    setLocale(currentLocale.toUpperCase());
  }, [pathname]);

  const changeLocale = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className={style.languageDropdown}>
      <button className={style.toggleButton} onClick={() => setOpen(!open)}>
        {locale}
      </button>
      {open && (
        <ul className={style.dropdownMenu}>
          <li onClick={() => changeLocale("az")}>AZ</li>
          <li onClick={() => changeLocale("en")}>EN</li>
          <li onClick={() => changeLocale("ru")}>RU</li>
        </ul>
      )}
    </div>
  );
}
