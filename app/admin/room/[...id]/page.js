"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import {
  createData,
  createDataWithImage,
  getDataById,
  getDatas,
  updateData,
  updateDataWithImage,
} from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function createRoom() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];

  const isEdit = id === "create" ? "create" : "edit";
  const [equipment, setEquipment] = useState([]);
  const [values, setValues] = useState({
    category: "",
    area: "",
    price: "",
    member: "",
    picture: "",
    youtubeVideoLink: "https://gemini.google.com/app/a0f1069ff4bdc9c7",
    equipmentIds: [],
    imageUrls: [],
    translations: {
      1: {
        service: "",
        description: "",
        miniDescription: "",
        title: "",
        miniTitle: "",
      },
      2: {
        service: "",
        description: "",
        miniDescription: "",
        title: "",
        miniTitle: "",
      },
      3: {
        service: "",
        description: "",
        miniDescription: "",
        title: "",
        miniTitle: "",
      },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("Category", values.category);
    formData.append("Area", values.area);
    formData.append("Price", values.price);
    formData.append("Member", values.member);
    formData.append("YoutubeVideoLink", values.youtubeVideoLink || "");

    if (values.pictures && values.pictures.length > 0) {
      values.pictures.forEach((file) => {
        formData.append("ImageFiles", file);
      });
    }

    values.equipmentIds.forEach((id) => {
      formData.append("EquipmentIds", id);
    });

    const translationsArray = Object.entries(values.translations).map(
      ([language, item]) => ({
        language: Number(language),
        service: item.service,
        description: item.description,
        miniDescription: item.miniDescription,
        title: item.title,
        miniTitle: item.miniTitle,
      })
    );
    formData.append("Translations", JSON.stringify(translationsArray));

    // 🔥 BURADA id əlavə edilir (yalnız update zamanı)
    if (isEdit !== "create") {
      formData.append("Id", id); // C#-da property böyük hərflədirsə, "Id" yaz
    }

    const res =
      isEdit === "create"
        ? await createDataWithImage("Room", formData)
        : await updateDataWithImage("Room", id, formData);

    if (
      res &&
      (res.status === 200 || res.status === 204 || res.status === 201)
    ) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error("Xəta baş verdi: " + res?.status);
    }
  };

  const fetchDatas = async () => {
    if (isEdit === "edit") {
      const data = await getDataById("Room", id);
      if (data) {
        const newTranslations = { ...values.translations };
        data.translations.forEach((t) => {
          newTranslations[t.language] = {
            service: t.service || "",
            description: t.description || "",
            miniDescription: t.miniDescription || "",
            title: t.title || "",
            miniTitle: t.miniTitle || "",
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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxFiles = 4;

    if (selectedFiles.length > maxFiles) {
      alert(
        `Xahiş olunur ən çox ${maxFiles} şəkil seçin. Yalnız ilk ${maxFiles} şəkil yüklənəcək.`
      );
      setValues((prev) => ({
        ...prev,
        pictures: selectedFiles.slice(0, maxFiles),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        pictures: selectedFiles,
      }));
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>Şəkil</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <label>Otaqın adı</label>
          <input
            type="text"
            value={values.category}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, category: e.target.value }))
            }
          />

          <label>Otaqın ərazisi</label>
          <input
            type="text"
            value={values.area}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, area: e.target.value }))
            }
          />

          <label>Qiymət</label>
          <input
            type="number"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <label>Qonaq sayı</label>
          <input
            type="3"
            value={values.member}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, member: e.target.value }))
            }
          />
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                service: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Xidmətlər ({lang.toUpperCase()}):
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
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                description: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Otaq haqqında məlumat ({lang.toUpperCase()}):
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
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                miniDescription: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Kiçik məlumat ({lang.toUpperCase()}):
                    <textarea
                      value={translation.miniDescription}
                      rows="5"
                      cols="33"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              miniDescription: e.target.value,
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
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                title: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Otaqın sloganı ({lang.toUpperCase()}):
                    <textarea
                      value={translation.title}
                      rows="5"
                      cols="33"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              title: e.target.value,
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
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                miniTitle: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    MiniTitle ({lang.toUpperCase()}):
                    <textarea
                      value={translation.miniTitle}
                      rows="5"
                      cols="33"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              miniTitle: e.target.value,
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
