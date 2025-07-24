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

  const th = ["id", "name_az", "name_en", "name_ru"];

  const fetchDatas = async () => {
    let rawData = await getDatas(model);
    const normalized = normalizeTreatmentMethods(rawData);
    setData(normalized);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteData(model, id);
    res?.status === 204
      ? toast.success("Proses uğurla başa çatdı")
      : toast.error("Xəta baş verdi");
    if (res?.status === 204) {
      fetchDatas();
    }
  };

  return (
    <div className={global.container}>
      <Table
        data={data}
        th={th}
        handleDelete={handleDelete}
        createSlug={model.toLowerCase()}
      />
    </div>
  );
}

function normalizeTreatmentMethods(data) {
  return (Array.isArray(data) ? data : [data])
    .filter((item) => item.translations)
    .map((item) => {
      const flat = {
        id: item.id,
        imageUrl: item.imageUrl,
      };

      item.translations.forEach((t) => {
        const lang = t.language === 1 ? "en" : t.language === 2 ? "az" : "ru";
        flat[`name_${lang}`] = t.name;
        flat[`description_${lang}`] = t.description;
      });

      return flat;
    });
}
