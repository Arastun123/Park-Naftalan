import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import "@/styles/reset.css";
import "@/styles/global.module.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FixedButtons from "@/components/FixedButtons";
import Script from "next/script";

const keywordsAZ = [
  "Naftalan",
  "sanatoriya",
  "Park Naftalan",
  "müalicə",
  "rezervasiya",
  "spa",
  "Azərbaycan",
  "naphthalene therapy",
  "Naftalan yağı",
  "Naftalan müalicəsi",
  "Naftalan sanatoriyası",
  "sanatoriya müalicəsi",
  "istirahət mərkəzi",
  "spa müalicə",
  "Park Naftalan hotel",
  "Naftalan hotel",
  "müalicəvi turizm",
  "sağlamlıq turizmi",
  "fizioterapiya",
  "Naftalan şəhəri",
  "sağlamlıq və istirahət",
  "termal müalicə",
  "balneoloji kurort",
  "otel rezervasiyası",
];

const keywordsEN = [
  "Naftalan",
  "sanatorium",
  "Park Naftalan",
  "treatment",
  "reservation",
  "spa",
  "Azerbaijan",
  "naphthalene therapy",
  "Naftalan oil",
  "Naftalan treatment",
  "Naftalan sanatorium",
  "sanatorium treatment",
  "health resort",
  "spa therapy",
  "Park Naftalan hotel",
  "Naftalan hotel",
  "medical tourism",
  "health tourism",
  "physiotherapy",
  "Naftalan city",
  "health and wellness",
  "thermal treatment",
  "balneotherapy",
  "hotel booking",
];

const keywordsRU = [
  "Нафталан",
  "санаторий",
  "Парк Нафталан",
  "лечение",
  "бронирование",
  "спа",
  "Азербайджан",
  "нафталанотерапия",
  "нафталановое масло",
  "лечение в Нафталане",
  "санаторное лечение",
  "оздоровительный курорт",
  "спа терапия",
  "отель Парк Нафталан",
  "отель Нафталан",
  "медицинский туризм",
  "оздоровительный туризм",
  "физиотерапия",
  "город Нафталан",
  "здоровье и отдых",
  "термальное лечение",
  "бальнеотерапия",
  "бронирование отеля",
];

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title =
    locale === "az"
      ? "Park Naftalan Sanatoriyası"
      : locale === "ru"
      ? "Санаторий Парк Нафталан"
      : "Park Naftalan Sanatorium";

  const description =
    "Park Naftalan Sanatoriyası - sağlamlıq və rahatlıq üçün mükəmməl seçim. Qəbullar, müalicə paketləri və rezervasiyalar üçün rəsmi sayt.";

  const url = "https://parknaftalan.az";

  const keywords =
    locale === "az" ? keywordsAZ : locale === "ru" ? keywordsRU : keywordsEN;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${url}/${locale}`,
      languages: {
        az: `${url}/az`,
        en: `${url}/en`,
        ru: `${url}/ru`,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url: `${url}/${locale}`,
      type: "website",
      images: [`${url}/og-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${url}/twitter-image.jpg`],
    },
    metadataBase: new URL(url),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="Fxh4HtHbG5cSlVYo84ioYdkcW7m0oPRlPIka4hd5kAk"
        />

        <Script
          id="exely-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(e,n){
                  var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
                  if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
                  !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
                  a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
                  ["az-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
              }(window, [
                      ["setContext", "BE-INT-parknaftalan-az_2025-09-08", ${locale}],
                      ["embed", "booking-form", { container: "be-booking-form" }],
                      ["embed", "search-form", { container: "be-search-form" }]
              ]);
            `,
          }}
        />
      </head>
      <body>
        <Header params={params} />
        <main style={{ position: "relative", zIndex: 0 }}>{children}</main>
        <Footer params={params} />
        <FixedButtons locale={locale} />
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
