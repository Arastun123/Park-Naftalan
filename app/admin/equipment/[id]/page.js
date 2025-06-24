"use client";
import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { createData, updateData } from "@/lib/handleApiActions";

export default function createEquipment() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id && params.id !== "create";
  const [values, setValues] = useState({
    0: "",
    1: "",
    2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      translations: Object.entries(translations).map(([language, name]) => ({
        language: Number(language),
        name,
      })),
    };
    if (isEdit) {
      await updateData("Equipment", id, payload);
    } else {
      await createData("Equipment", payload);
    }
    router.push("/equipment");
  };
  return (
    <div className={global.container}>
      <form className={admin.form}>
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
