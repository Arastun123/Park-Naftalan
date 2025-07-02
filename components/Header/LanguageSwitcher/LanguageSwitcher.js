"use client";
import { usePathname, useRouter } from "next/navigation";
import style from "./styles.module.scss";
import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "@/components/Svg";
import Button from "@/components/Button/Button";
import useClickOutSide from "@/lib/useClickOutSide";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState("AZ");
  const containerRef = useRef(null);

  useClickOutSide(containerRef, () => setOpen(false));

  useEffect(() => {
    const segments = pathname.split("/");
    const currentLocale = segments[1] || "az";
    setLocale(currentLocale.toUpperCase());
  }, [pathname]);

  const changeLocale = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath, {
      shallow: true,
    });
    setOpen(false);
  };

  return (
    <div className={style.languageDropdown} ref={containerRef}>
      <Button className={style.toggleButton} onClick={() => setOpen(!open)}>
        {locale}
        <span className={open ? style.reverse : ""}>
          <ArrowDown />
        </span>
      </Button>
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
