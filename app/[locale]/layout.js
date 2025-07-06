import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import "@/styles/reset.css";
import "@/styles/global.module.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body>
        <Header params={params} />
        <main style={{ position: "relative", zIndex: 0 }}>{children}</main>
        <Footer params={params} />
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
