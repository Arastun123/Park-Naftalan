"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { createData, getDataByid, updateData } from "@/lib/handleApiActions";
import { Router } from "next/router";

export default function createEquipment() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];
  const language = params.id[1];
  const isEdit = !!id && id !== "create";
  const [values, setValues] = useState({
    0: "",
    1: "",
    2: "",
  });

  useEffect(() => {
    fetchDatas();
  }, [isEdit]);

  const handleSubmit = async () => {
    const payload = {
      translations: Object.entries(values).map(([language, name]) => ({
        language: Number(language),
        name,
      })),
    };
    const res = isEdit
      ? await updateData("Equipment", id, payload)
      : await createData("Equipment", payload);

    console.log(res);
    if (!isEdit) {
      if (res.statusText === "OK") {
        alert("Proses uğurla başa çatdı");
        router.back();
      } else {
        alert(res.statusText);
      }
    } else {
      res.status === 204
        ? alert("Proses uğurla başa çatdı")
        : alert("Xeta bas verdi");
    }
  };

  const fetchDatas = async () => {
    if (isEdit) {
      const data = await getDataByid("Equipment", id, language);
      if (data)
        setValues((prev) => ({
          ...prev,
          [data.language]: data.name,
        }));
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        {!isEdit ? (
          <>
            {[
              { lang: "en", code: 0 },
              { lang: "az", code: 1 },
              { lang: "ru", code: 2 },
            ].map(({ lang, code }) => (
              <label key={lang}>
                Name ({lang.toUpperCase()}):
                <input
                  type="text"
                  value={values[code]}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [code]: e.target.value }))
                  }
                  required={code === 1}
                />
              </label>
            ))}
          </>
        ) : (
          <>
            <label>
              Name ({["EN", "AZ", "RU"][language]}):
              <input
                type="text"
                value={values[language]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [language]: e.target.value }))
                }
                required
              />
            </label>
          </>
        )}
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
