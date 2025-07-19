"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataById,
  updateDataNoId,
} from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function createTreatmentMethod() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];

  const isEdit = id === "create" ? "create" : "edit";

  const [values, setValues] = useState({
    treatmentMethodTranslationDtos: {
      1: { name: "", description: "null" },
      2: { name: "", description: "null" },
      3: { name: "", description: "null" },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      id: isEdit === "edit" ? Number(id) : 0,
      treatmentMethodTranslationDtos: Object.entries(
        values.treatmentMethodTranslationDtos
      ).map(([language, { name, description }]) => ({
        language: Number(language),
        name,
        description,
      })),
    };

    const res =
      isEdit === "edit"
        ? await updateDataNoId("TreatmentMethod", payload)
        : await createData("treatmentMethod", payload);

    if (res.status === 200 || res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.statusText);
    }
  };

  const fetchDatas = async () => {
    if (isEdit === "edit") {
      const data = await getDataById("treatmentMethod", id);
      if (data?.translations?.length > 0) {
        const formatted = data.translations.reduce((acc, item) => {
          acc[item.language] = {
            name: item.name,
            description: item.description,
          };
          return acc;
        }, {});

        setValues({
          treatmentMethodTranslationDtos: formatted,
        });
      }
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => (
              <div key={code}>
                <label>
                  Müalicə methodunun adı ({lang.toUpperCase()}):
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
                  Əlavə məlumat ({lang.toUpperCase()}):
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
            <p>
              Əlavə məlumat hazırda görünmür gələcəkdə lazım olarsa ayrıca
              səhifə halında göstərmək üçün nəzərdə tutlub
            </p>
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
