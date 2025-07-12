"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataById,
  updateData,
} from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function createPackage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];

  const isEdit = id === "create" ? "create" : "edit";
  const [values, setValues] = useState({
    name: "",
    durationDay: "",
    price: "",
    roomType: "",
    packageTranslations: {
      1: { description: "" },
      2: { description: "" },
      3: { description: "" },
    },
    treatmentMethodsIds: [],
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      ...values,
      packageTranslations: Object.entries(values.packageTranslations).map(
        ([lang, item]) => ({
          language: Number(lang),
          description: item.description,
        })
      ),
    };


    const res = isEdit === 'edit'
      ? await updateData("Package", id, payload)
      : await createData("Package", payload);

    if (res.status === 200 || res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.status);
    }
  };
 

  const fetchDatas = async () => {
    if (isEdit === "edit") {
      const data = await getDataById("Package", id);
      if (data) {
        const newTranslations = { ...values.packageTranslations };
        data.packageTranslations.forEach((t) => {
          newTranslations[t.language] = {
            description: t.description || "",
          };
        });
        setValues((prev) => ({
          ...prev,
          name: data.name,
          durationDay: data.durationDay,
          price: data.price,
          roomType: data.roomType,
          packageTranslations: newTranslations,
          treatmentMethodsIds: [],
        }));
      }
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>Kompaniya adı</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label>Qiyməti</label>
          <input
            type="nunmber"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <label>Müddəti</label>
          <input
            type="number"
            value={values.durationDay}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, durationDay: e.target.value }))
            }
          />

          <label>Otaq növü</label>
          <input
            type="3"
            value={values.roomType}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, roomType: e.target.value }))
            }
          />
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const packageTranslations = values.packageTranslations?.[
                code
              ] || {
                description: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Ətraflı məlumat ({lang.toUpperCase()}):
                    <input
                      type="text"
                      value={packageTranslations.description}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          packageTranslations: {
                            ...prev.packageTranslations,
                            [code]: {
                              ...prev.packageTranslations?.[code],
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
          </div>
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
