import Header from "@/components/Header";
import "@/styles/reset.css";
import "@/styles/global.module.scss";
import Footer from "@/components/Footer/Footer";

export default async function LocaleLayout({ children, params }) {
  const { local } = await params;
  return (
    <html lang={local}>
      <body>
        <Header params={params} />
        <main style={{ position: 'relative', zIndex: 0 }}>{children}</main>
        <Footer params={params} locale={local} />
      </body>
    </html>
  );
}
