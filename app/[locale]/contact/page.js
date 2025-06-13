import { getDatas } from "@/lib/getDatas";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const data = await getDatas("Naftalan", locale);

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
