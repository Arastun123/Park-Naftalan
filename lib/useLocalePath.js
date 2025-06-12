"use client";
import { usePathname } from "next/navigation";

export function useLocalePath(locale) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1];

  return (path) => {
    if (path.startsWith(`/${currentLocale}`)) return path;
    return `/${locale}${path}`;
  };
}
