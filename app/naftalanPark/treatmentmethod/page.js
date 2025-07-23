"use client";
import { useEffect, useState } from "react";

import { getDatas, deleteData } from "@/lib/handleApiActions";
import Table from "@/components/Admin/Table/Table";

import global from "@/styles/global.module.scss";
import "@/styles/reset.css";
import { toast } from "react-toastify";

export default function TreatmentMethod() {
  const [data, setData] = useState([]);
  const model = "treatmentMethod";

  const th = ["name", "description"];

  useEffect(() => {
    fetchDatas();
  }, [data]);

  const fetchDatas = async () => {
    let data = await getDatas(model);
    data = data.find((item) => item.translations);
    if (data) setData(data);
  };

  const handleDelete = async (id) => {
    const res = await deleteData(model, id);
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
        createSlug={model.toLocaleLowerCase()}
      />
    </div>
  );
}
