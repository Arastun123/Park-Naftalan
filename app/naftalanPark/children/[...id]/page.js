"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataById,
  getDataByIdLang,
  updateData,
} from "@/lib/handleApiActions";

import { toast } from "react-toastify";

export default function createChildren() {
  const params = useParams();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [values, setValues] = useState({
    ageRange: "",
    hasTreatment: false,
    price: "",
  });
  const isEdit = params.id[0] !== "create";

  const id = isEdit ? Number(params.id[0]) : null;

  useEffect(() => {
    fetchDatas();
  }, [isEdit]);

  const handleSubmit = async () => {
    const finalData = {
      ageRange: `${count} uşaq ${values.ageRange} yaş`,
      hasTreatment: values.hasTreatment,
      price: values.price,
    };

    const res = isEdit
      ? await updateData("Children", id, finalData)
      : await createData("Children", finalData);

    if (res.status === 201 || res.status === 200) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.statusText);
    }
  };

  const fetchDatas = async () => {
    if (isEdit) {
      const data = await getDataById("Children", id);

      if (data) {
        setValues(data);
      }
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>
            Uşaq sayı :
            <input
              type="text"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </label>
          <label>
            Yaş aralıqı :
            <input
              type="text"
              value={values.ageRange}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, ageRange: e.target.value }))
              }
            />
          </label>
          <div>
            <label>
              Müalicə olunacaqmı Bəli:
              <input
                type="radio"
                name="hasTreatment"
                value="true"
                checked={values.hasTreatment === true}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, hasTreatment: true }))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Müalicə olunacaqmı Xeyr:
              <input
                type="radio"
                name="hasTreatment"
                value="false"
                checked={values.hasTreatment === false}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, hasTreatment: false }))
                }
              />
            </label>
          </div>
          <label>
            Qiymət:
            <input
              type="number"
              value={values.price}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </label>
        </>
      </form>
      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={() => handleSubmit()}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
