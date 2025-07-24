"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";

import {
  updateDataWithImage,
  createDataWithImage,
  getDataById,
} from "@/lib/handleApiActions";

import { toast } from "react-toastify";

export default function createTreatmentMethod() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];
  const isEdit = id === "create" ? "create" : "edit";

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [values, setValues] = useState({
    translations: {
      1: { name: "", description: "", id: null },
      2: { name: "", description: "", id: null },
      3: { name: "", description: "", id: null },
    },
  });

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    if (isEdit === "edit") {
      const data = await getDataById("treatmentMethod", id);
      if (data?.translations?.length > 0) {
        const formatted = data.translations.reduce((acc, item) => {
          acc[item.language] = {
            id: item.id, // <-- BURADA ID DAXİL EDİLİR
            name: item.name,
            description: item.description,
          };
          return acc;
        }, {});
        if (data.imageUrl) {
          setImage(data.imageUrl);
        }
        setValues({ translations: formatted });
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (isEdit === "edit") {
      formData.append("Id", id);
    }

    if (newImage) {
      formData.append("ImageFile", newImage);
    }

    Object.entries(values.translations).forEach(
      ([lang, { id, name, description }], index) => {
        if (isEdit === "edit" && id) {
          formData.append(`Translations[${index}].Id`, id); // <-- ID ƏLAVƏ OLUNUR
        }
        formData.append(`Translations[${index}].Language`, lang);
        formData.append(`Translations[${index}].Name`, name);
        formData.append(`Translations[${index}].Description`, description);
      }
    );

    const res =
      isEdit === "edit"
        ? await updateDataWithImage("TreatmentMethod", id, formData)
        : await createDataWithImage("TreatmentMethod", formData);

    if (res?.status === 200 || res?.status === 201 || res?.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res?.statusText || "Xəta baş verdi");
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
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
            src={`https://parknaftalan.az/${image}`}
            alt="Old"
          />
        )}

        <p>Yeni yüklənən şəkil (preview)</p>
        {newImage && (
          <img
            className={admin.img}
            src={URL.createObjectURL(newImage)}
            alt="New Preview"
          />
        )}

        <div className={admin.dFlex}>
          {[{ lang: "en", code: 1 }, { lang: "az", code: 2 }, { lang: "ru", code: 3 }].map(
            ({ lang, code }) => (
              <div key={code}>
                <label>
                  Müalicə metodunun adı ({lang.toUpperCase()}):
                  <input
                    type="text"
                    value={values.translations[code]?.name || ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          [code]: {
                            ...prev.translations[code],
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
                    value={values.translations[code]?.description || ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          [code]: {
                            ...prev.translations[code],
                            description: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </label>
              </div>
            )
          )}
        </div>

        <p>
          Əlavə məlumat hazırda görünmür, gələcəkdə lazım olarsa ayrıca səhifə
          halında göstərmək üçün nəzərdə tutulub.
        </p>
      </form>

      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={handleSubmit}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
