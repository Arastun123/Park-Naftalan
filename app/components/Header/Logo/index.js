import Image from "next/image";

export default async function Logo({ params }) {
  return <img src="/logo.png" alt="Logo" width={150} height={50} />;
}
