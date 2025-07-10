"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataByIdLang,
  updateData,
} from "@/lib/handleApiActions";

import { toast } from "react-toastify";

export default function createEquipment() {
  const params = useParams();
  const router = useRouter();

  const isEdit = params.id[0] !== "create";

  const id = isEdit ? Number(params.id[0]) : null;
  const language = Number(params.id[1]);
  const [values, setValues] = useState({
    1: "",
    2: "",
    3: "",
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

    if (res.status === 200 || res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.statusText);
    }
  };

  const fetchDatas = async () => {
    if (isEdit) {
      const data = await getDataByIdLang("Equipment", id);

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
        {/* {isEdit ? (
          
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
        )} */}

        <>
          {[
            { lang: "en", code: 1 },
            { lang: "az", code: 2 },
            { lang: "ru", code: 3 },
          ].map(({ lang, code }) => (
            <label key={lang}>
              Təhcizat ({lang.toUpperCase()}):
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
