"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  getDataById,
  getDatas,
  updateData,
} from "@/lib/handleApiActions";

export default function createPackage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const isEdit = id === "create";
  const [room, setRoom] = useState([]);
  const [values, setValues] = useState({
    name: "",
    durationDay: "",
    price: "",
    roomType: "",
    image: "",
    packageTranslations: {
      1: { description: "" },
      2: { description: "" },
      3: { description: "" },
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
        description: item.description,
      })),
    };

    const res = !isEdit
      ? await updateData("Package", id, payload)
      : await createData("Package", payload);

    if (isEdit) {
      if (res.statusText === "OK") {
        alert("Proses uğurla başa çatdı");
        router.back();
      } else {
        alert(res.status);
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
    if (!isEdit) {
      const data = await getDataById("Package", id);
      if (data) {
        const newTranslations = { ...values.translations };
        data.translations.forEach((t) => {
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
          image: data.image,
          packageTranslations: newTranslations,
        }));
      }
    }
    const room = await getDatas("Room");
    setRoom(room);
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>Name</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label>Price</label>
          <input
            type="nunmber"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <label>DurationDay</label>
          <input
            type="number"
            value={values.durationDay}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, durationDay: e.target.value }))
            }
          />

          <label>RoomType</label>
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
                    Service ({lang.toUpperCase()}):
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
