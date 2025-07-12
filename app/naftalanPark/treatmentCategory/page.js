"use client";
import { useEffect, useState } from "react";

import { getDatas, deleteData } from "@/lib/handleApiActions";
import Table from "@/components/Admin/Table/Table";

import global from "@/styles/global.module.scss";
import "@/styles/reset.css";
import { toast } from "react-toastify";

export default function TreatmentCategory() {
  const [data, setData] = useState([]);

  const th = ["name"];

  useEffect(() => {
    fetchDatas();
  }, [data]);

  const fetchDatas = async () => {
    let data = await getDatas("TreatmentCategory");
    if (data) {
      data = data.map((item) => {
        const translation = item.translations?.[1] || {};
        return {
          ...item,
          name: translation.name || "-",
          language: translation.language || "-",
        };
      });

      setData(data);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteData("TreatmentCategory", id);
    res.status === 200
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
        createSlug="treatmentCategory"
      />
    </div>
  );
}
