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
  updateDataWithImage,
} from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function createRoom() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];

  const isEdit = id === "create" ? "create" : "edit";
  const [treatmentCategory, setTreatmentCategory] = useState([]);
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [values, setValues] = useState({
    treatmentCategoryId: "",
    translations: {
      1: {
        name: "",
        description: "",
        miniDescription: "",
      },
      2: {
        name: "",
        description: "",
      },
      3: {
        name: "",
        description: "",
      },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();

    if (isEdit === "edit") {
      formData.append("id", id);
    }

    if (newImage) {
      formData.append("ImageFile", newImage);
    }

    if (values.treatmentCategoryId) {
      formData.append("TreatmentCategoryId", values.treatmentCategoryId);
    }

    Object.entries(values.translations).forEach(([lang, item], index) => {
      formData.append(`Translations[${index}].language`, lang);
      formData.append(`Translations[${index}].name`, item.name);
      formData.append(`Translations[${index}].description`, item.description);
    });

    const res =
      isEdit === "edit"
        ? await updateDataWithImage("Illness", id, formData)
        : await createData("Illness", formData);

    if (res.status === 201 || res.status === 200 || res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.status);
    }
  };

  const fetchDatas = async () => {
    if (isEdit === "edit") {
      const data = await getDataById("Illness", id);
      if (data) {
        const newTranslations = { ...values.translations };

        data.translations.forEach((t) => {
          newTranslations[t.language] = {
            name: t.name || "",
            description: t.description || "",
          };
        });

        if (data.imageUrls) {
          setImage(data.imageUrls);
        }

        setValues((prev) => ({
          ...prev,
          treatmentCategoryId: data.treatmentCategoryId,
          translations: newTranslations,
        }));
      }
    }

    let treatmentCategory = await getDatas("TreatmentCategory");
    if (treatmentCategory) {
      treatmentCategory = treatmentCategory.map((item) => {
        const translation = item.translations?.[1] || {};
        return {
          ...item,
          description: translation.description || "-",
          name: translation.name || "-",
          language: translation.language || "-",
        };
      });
      setTreatmentCategory(treatmentCategory);
    }
  };

  const handleTreatmentCategoryId = (e) => {
    setValues((prev) => ({
      ...prev,
      treatmentCategoryId: e.target.value,
    }));
  };

  return (
    <div className={global.container}>
      <br />
      <br />
      <form className={admin.form}>
        <>
          <label>Müalicə növü</label>
          <select
            name="Müalicə növü"
            value={values.treatmentCategoryId}
            onChange={handleTreatmentCategoryId}
          >
            <option value="">Seçin</option>
            {treatmentCategory.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <div>
            <label>Şəkil</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewImage(file);
                }
              }}
            />
          </div>
          <p>Köhnə şəkil (serverdəki)</p>
          {image && (
            <img
              className={admin.img}
              src={`http://localhost:5041/${image}`}
              alt="Old Image"
            />
          )}

          <p>Yeni yüklənən şəkil (preview)</p>
          {newImage && (
            <img
              className={admin.img}
              src={URL.createObjectURL(newImage)}
              alt="New Image Preview"
            />
          )}
          <div className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => {
              const translation = values.translations?.[code] || {
                name: "",
              };

              return (
                <div key={lang} className={admin.dFlex}>
                  <label>
                    Xəstəlik adı ({lang.toUpperCase()}):
                    <input
                      type="text"
                      value={translation.name}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations?.[code],
                              name: e.target.value,
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
                    Xəstəlik haqqında məlumat ({lang.toUpperCase()}):
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

      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={() => handleSubmit()}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
