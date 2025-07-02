import Header from "@/components/Header";
import "@/styles/reset.css";
import "@/styles/global.module.scss";
import Footer from "@/components/Footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopReservation from "@/components/TopReservation";

export default async function LocaleLayout({ children, params }) {
  const { local } = await params;
  return (
    <html lang={local}>
      <body>
       
        <Header params={params} />
        <main style={{ position: "relative", zIndex: 0 }}>{children}</main>
        <Footer params={params} locale={local} />
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
