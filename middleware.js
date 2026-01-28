import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["az", "en", "ru"];
const defaultLocale = "az";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://fonts.googleapis.com;
    
    
    img-src 'self' data: blob: https://parknaftalan.az https://parknaftalan.az/api https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://www.google.com https://www.google-analytics.com;
    
    connect-src 'self' https://parknaftalan.az https://parknaftalan.az/api https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://api.exchangerate.host https://v6.exchangerate-api.com https://api.exchangerate-api.com https://www.google-analytics.com https://stats.g.doubleclick.net;
    
    font-src 'self' data: https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://fonts.gstatic.com;
    frame-src 'self' https://az-ibe.hopenapi.com https://ibe.hopenapi.com https://ibe.behopenapi.com https://www.google.com;
    upgrade-insecure-requests;
`
    .replace(/\s{2,}/g, " ")
    .trim();
  response.headers.set("Content-Security-Policy", cspHeader);
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
