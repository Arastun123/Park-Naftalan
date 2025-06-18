import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["az", "en", "ru"];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    locales.some((locale) => pathname.startsWith(`/${locale}`))
  ) {
    return;
  }

  const defaultLocale = "az";
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}
