import Header from "@/components/Header";
import "@/styles/reset.css";
import "@/styles/global.module.scss";
import { redirect } from "next/navigation";
export default async function AdminİNdex({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
