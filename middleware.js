// import { NextResponse } from "next/server";

// const PUBLIC_FILE = /\.(.*)$/;
// const locales = ["az", "en", "ru"];

// export function middleware(request) {
//   const pathname = request.nextUrl.pathname;

//   if (
//     PUBLIC_FILE.test(pathname) ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/admin") ||
//     locales.some((locale) => pathname.startsWith(`/${locale}`))
//   ) {
//     return;
//   }

//   const defaultLocale = "az";
//   return NextResponse.redirect(
//     new URL(`/${defaultLocale}${pathname}`, request.url)
//   );
// }

import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["az", "en", "ru"];
const defaultLocale = "az";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith("/naftalanPark")) {
    const token = request.cookies.get("admin_token")?.value;
    const isLoginPage = pathname === "/naftalanPark";

    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/naftalanPark", request.url));
    }

    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/naftalanPark/dashboard", request.url));
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
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return response;
}
