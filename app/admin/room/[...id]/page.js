"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataByid,
  getDatas,
  updateData,
} from "@/lib/handleApiActions";

export default function createRoom() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const isEdit = !!id && id !== "create";
  const [equipment, setEquipment] = useState([]);
  const [values, setValues] = useState({
    category: "",
    area: "",
    price: "",
    member: "",
    picture: "",
    youtubeVideoLink: "",
    equipmentIds: [],
    translations: {
      0: { service: "", description: "" },
      1: { service: "", description: "" },
      2: { service: "", description: "" },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      ...values,
      translations: Object.entries(values.translations).map(([lang, item]) => ({
        language: Number(lang),
        service: item.service,
        description: item.description,
      })),
    };

    const res = isEdit
      ? await updateData("Room", id, payload)
      : await createData("Room", payload);

    console.log(res);
    if (!isEdit) {
      if (res.statusText === "OK") {
        alert("Proses uğurla başa çatdı");
        router.back();
      } else {
        alert(res.statusText);
      }
    } else {
      if (res.status === 204) {
        router.back();
        alert("Proses uğurla başa çatdı");
      } else {
        alert("Xeta bas verdi");
      }
    }
  };

  const fetchDatas = async () => {
    if (isEdit) {
      const data = await getDataByid("Room", id);
      if (data) {
        const newTranslations = { ...values.translations };
        data.translations.forEach((t) => {
          newTranslations[t.language] = {
            service: t.service || "",
            description: t.description || "",
          };
        });
        setValues((prev) => ({
          ...prev,
          category: data.category,
          area: data.area,
          price: data.price,
          member: data.member,
          picture: data.picture,
          youtubeVideoLink: data.youtubeVideoLink,
          equipmentIds: data.equipmentIds || [],
          translations: newTranslations,
        }));
      }
    }
    const equipment = await getDatas("Equipment");
    setEquipment(equipment);
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>Category</label>
          <input
            type="text"
            value={values.category}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, category: e.target.value }))
            }
          />

          <label>Area</label>
          <input
            type="text"
            value={values.area}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, area: e.target.value }))
            }
          />

          <label>Price</label>
          <input
            type="number"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <label>Member</label>
          <input
            type="3"
            value={values.member}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, member: e.target.value }))
            }
          />
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 0 },
              { lang: "az", code: 1 },
              { lang: "ru", code: 2 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                service: "",
                description: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Service ({lang.toUpperCase()}):
                    <input
                      type="text"
                      value={translation.service}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              service: e.target.value,
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
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 0 },
              { lang: "az", code: 1 },
              { lang: "ru", code: 2 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                service: "",
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
          </div>
        </>
      </form>
      <div className={admin.btns}>
        {equipment.map((item, i) => {
          const isSelected = values.equipmentIds.includes(item.id);

          return (
            <Button
              key={`${i}_${item.name}`}
              className={`${admin.actionBtn} ${
                isSelected ? admin.selected : ""
              }`}
              onClick={() =>
                setValues((prev) => {
                  const alreadySelected = prev.equipmentIds.includes(item.id);
                  return {
                    ...prev,
                    equipmentIds: alreadySelected
                      ? prev.equipmentIds.filter((id) => id !== item.id)
                      : [...prev.equipmentIds, item.id],
                  };
                })
              }
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={() => handleSubmit()}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
