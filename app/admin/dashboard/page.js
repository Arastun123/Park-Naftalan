"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { logoutAdmin } from "@/lib/handleApiActions";
import table from "@/styles/table.module.scss";

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin");
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      {/* <Button
        onClick={() => handleLogout()}
        className={`${table.actionBtn} ${table.delete}`}
      >
        Logout
      </Button> */}
    </div>
  );
}
