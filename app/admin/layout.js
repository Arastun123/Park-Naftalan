import { cookies } from "next/headers";
import SideBar from "@/components/Admin/SideBar/SideBar";
import "@/styles/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies(); // await lazım deyil burda!
  const token =  cookieStore.get("admin_token")?.value;

  return (
    <html>
      <body>
        <main style={{ display: "flex" }}>
          {token && <SideBar />}
          <div style={{ flex: 1 }}>{children}</div>
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
        </main>
      </body>
    </html>
  );
}
