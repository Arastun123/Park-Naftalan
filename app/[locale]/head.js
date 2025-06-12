export default function Head({ params }) {
  return (
    <>
      <html lang={params.locale} />
      <meta httpEquiv="Content-Language" content={params.locale} />
    </>
  );
}
