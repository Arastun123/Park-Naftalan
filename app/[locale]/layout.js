import Header from "../components/Header/Header";

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
