"use client";
import { useEffect, useState } from "react";

import { getDatas, deleteData } from "@/lib/handleApiActions";
import Table from "@/components/Admin/Table/Table";

import global from "@/styles/global.module.scss";
import "@/styles/reset.css";
import { toast } from "react-toastify";

export default function Children() {
  const [data, setData] = useState([]);

  const th = ["ageRange", "price"];

  useEffect(() => {
    fetchDatas();
  }, [data]);

  const fetchDatas = async () => {
    const data = await getDatas("Children");
    if (data) setData(data);
  };

  const handleDelete = async (id) => {
    const res = await deleteData("Children", id);
    res.status === 204
      ? toast.success("Proses uğurla başa çatdı")
      : toast.error("Xəta baş verdi");
    if (res) {
      fetchDatas();
    }
  };

  return (
    <div className={global.container}>
      <Table
        data={data}
        th={th}
        handleDelete={handleDelete}
        createSlug="children"
      />
    </div>
  );
}
