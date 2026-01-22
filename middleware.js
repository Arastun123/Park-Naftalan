import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["az", "en", "ru"];
const defaultLocale = "az";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
  );
  if (pathname.startsWith("/naftalanPark")) {
    const token = request.cookies.get("admin_token")?.value;
    const isLoginPage = pathname === "/naftalanPark";

    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/naftalanPark", request.url));
    }

    if (token && isLoginPage) {
      return NextResponse.redirect(
        new URL("/naftalanPark/dashboard", request.url),
      );
    }

    return response;
  }

  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (
    !hasLocale &&
    !PUBLIC_FILE.test(pathname) &&
    !pathname.startsWith("/api")
  ) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  return response;
}
