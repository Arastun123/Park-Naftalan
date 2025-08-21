import Head from "next/head";

export default function Head({ params }) {
  const language = params.locale;
  return (
    <>
      <Head>
        <title>Park Naftalan Sanatoriyası | Rəsmi Vebsayt</title>
        <meta
          name="description"
          content="Park Naftalan Sanatoriyası - sağlamlıq və rahatlıq üçün mükəmməl seçim. Qəbullar, müalicə paketləri və rezervasiyalar üçün rəsmi sayt."
        />
        <meta
          name="keywords"
          content="Naftalan, sanatoriya, Park Naftalan, müalicə, rezervasiya, spa, sanatoriyalar, azərbaycan, naphthalene therapy"
        />
        <meta name="author" content="Park Naftalan" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Park Naftalan Sanatoriyası" />
        <meta
          property="og:description"
          content="Rəsmi Park Naftalan Sanatoriyası vebsaytı. Rezervasiya və müalicə xidmətləri haqqında məlumat."
        />
        <meta
          property="og:image"
          content="https://parknaftalan.az/og-image.jpg"
        />
        <meta property="og:url" content="https://parknaftalan.az" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Park Naftalan Sanatoriyası" />
        <meta
          name="twitter:description"
          content="Naftalan müalicə mərkəzi haqqında ətraflı məlumat."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/twitter-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://parknaftalan.az" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="az" href="https://parknaftalan.az/az" />
        <link rel="alternate" hrefLang="en" href="https://parknaftalan.az/en" />
        <link rel="alternate" hrefLang="ru" href="https://parknaftalan.az/ru" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://parknaftalan.az"
        />
        <title>
          {language === "az"
            ? "Park Naftalan Sanatoriyası"
            : language === "ru"
            ? "Санаторий Парк Нафталан"
            : "Park Naftalan Sanatorium"}
        </title>
      </Head>
      <html lang={language} />
      <meta httpEquiv="Content-Language" content={language} />
    </>
  );
}
