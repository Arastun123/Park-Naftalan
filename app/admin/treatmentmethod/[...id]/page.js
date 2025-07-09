"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { createData, getDataById, updateData } from "@/lib/handleApiActions";

export default function createTreatmentMethod() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const isEdit = !!id && id !== "create";
  const [values, setValues] = useState({
    treatmentMethodTranslationDtos: {
      0: { name: "", description: "" },
      1: { name: "", description: "" },
      2: { name: "", description: "" },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      treatmentMethodTranslationDtos: Object.entries(
        values.treatmentMethodTranslationDtos
      ).map(([language, { name, description }]) => ({
        language: Number(language),
        name,
        description,
      })),
    };

    const res =
      isEdit === "create"
        ? await updateData("treatmentMethod", id, payload)
        : await createData("treatmentMethod", payload);

    if (isEdit === "create") {
      if (res.status === 200) {
        alert("Proses uğurla başa çatdı");
        router.back();
      } else {
        alert(res.statusText);
      }
    } else {
      if (res.status === 200) {
        router.back();
        alert("Proses uğurla başa çatdı");
      } else {
        alert("Xeta bas verdi");
      }
    }
  };

  const fetchDatas = async () => {
    if (isEdit !== "create") {
      const data = await getDataById("treatmentMethod", id);
      if (data) {
        setValues((prev) => ({
          ...prev,
          treatmentMethodTranslationDtos: {
            ...prev.treatmentMethodTranslationDtos,
            [data.language]: {
              name: data.name,
              description: data.description,
            },
          },
        }));
      }
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 0 },
              { lang: "az", code: 1 },
              { lang: "ru", code: 2 },
            ].map(({ lang, code }) => (
              <div key={code}>
                <label>
                  Name ({lang.toUpperCase()}):
                  <input
                    type="text"
                    value={
                      values.treatmentMethodTranslationDtos[code]?.name || ""
                    }
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        treatmentMethodTranslationDtos: {
                          ...prev.treatmentMethodTranslationDtos,
                          [code]: {
                            ...prev.treatmentMethodTranslationDtos[code],
                            name: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>

                <label>
                  Description ({lang.toUpperCase()}):
                  <textarea
                    value={
                      values.treatmentMethodTranslationDtos[code]
                        ?.description || ""
                    }
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        treatmentMethodTranslationDtos: {
                          ...prev.treatmentMethodTranslationDtos,
                          [code]: {
                            ...prev.treatmentMethodTranslationDtos[code],
                            description: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          {/* <div className={admin.dFlex}>
            {[
              { lang: "en", code: 0 },
              { lang: "az", code: 1 },
              { lang: "ru", code: 2 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                name: "",
                description: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Description ({lang.toUpperCase()}):
                    <textarea
                      value={translation.description}
                      rows="5"
                      cols="33"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              description: e.target.value,
                            },
                          },
                        }))
                      }
                      required={code === 1}
                    />
                  </label>
                </div>
              );
            })}
          </div> */}
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
