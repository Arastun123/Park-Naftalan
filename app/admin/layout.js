import Header from "@/components/Header";
import "@/styles/reset.css";
import global from "@/styles/global.module.scss";
import { redirect } from "next/navigation";
import SideBar from "@/components/Admin/SideBar/SideBar";
export default async function AdminİNdex({ children }) {
  return (
    <html>
      <body>
        <main className={global.dFlex}>
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
