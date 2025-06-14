import Header from "../components/Header/Header";
import '@/styles/global.module.scss';
import '@/styles/reset.css';
import '@/styles//global.module.scss';

export default async function LocaleLayout({ children, params }) {
  const { local } = await params;
  return (
    <html lang={local}>
      <body>
        <Header params={params} />
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
