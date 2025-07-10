"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { createData, getDataById, updateData } from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function CreateTreatmentCategory() {
  const params = useParams();
  const router = useRouter();
  const id = params.id?.[0]; 
  const isEdit = id !== "create";

  const [values, setValues] = useState({
    translations: {
      1: { name: "" }, 
      2: { name: "" }, 
      3: { name: "" }, 
    },
  });

  useEffect(() => {
    if (isEdit) fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDataById("TreatmentCategory", id);
    if (data?.translations) {
      const formattedTranslations = {};
      data.translations.forEach((t) => {
        formattedTranslations[t.language] = {
          name: t.name || "",
        };
      });
      setValues({ translations: formattedTranslations });
    }
  };

  const handleSubmit = async () => {
    const payload = {
      translations: Object.entries(values.translations).map(
        ([language, { name }]) => ({
          language: Number(language),
          name,
        })
      ),
    };

    const res = isEdit
      ? await updateData("TreatmentCategory", id, payload)
      : await createData("TreatmentCategory", payload);

    if (res.status === 200 || res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error(res.statusText || "Xəta baş verdi");
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <div className={admin.dFlex}>
          {[{ lang: "en", code: 1 }, { lang: "az", code: 2 }, { lang: "ru", code: 3 }].map(
            ({ lang, code }) => (
              <div key={code}>
                <label>
                  Müalicə növünün adı  ({lang.toUpperCase()}):
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
              </div>
            )
          )}
        </div>
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
