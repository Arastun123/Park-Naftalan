"use client";
import { useEffect, useState } from "react";

import { getDatas, deleteData } from "@/lib/handleApiActions";
import Table from "@/components/Admin/Table/Table";

import global from "@/styles/global.module.scss";
import "@/styles/reset.css";

export default function treatmentMethod() {
  const [data, setData] = useState([]);
  const model = "Package";

  const th = ["name", "duration", "price", "roomType"];

  useEffect(() => {
    fetchDatas();
  }, [data]);

  const fetchDatas = async () => {
    const data = await getDatas(model);
    if (data) setData(data);
  };

  const handleDelete = async (id) => {
    const res = await deleteData(model, id);
    console.log(typeof res.status);
    res.status === 204
      ? alert("Proses uğurla başa çatdı")
      : alert("Xəta baş verdi");
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
