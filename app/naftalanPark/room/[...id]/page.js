"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import {
  createDataWithImage,
  getDataById,
  getDatas,
  updateDataWithImage,
} from "@/lib/handleApiActions";
import { toast } from "react-toastify";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";

export default function CreateRoom() {
  const params = useParams();
  const router = useRouter();
  const id = params.id[0];
  const isCreate = id === "create";

  const [equipment, setEquipment] = useState([]);
  const [child, setChild] = useState([]);

  const [values, setValues] = useState({
    category: "",
    area: "",
    price: "",
    member: "",
    youtubeVideoLink: "https://gemini.google.com/app/a0f1069ff4bdc9c7",
    equipmentIds: [],
    childIds: [],
    pictures: [],
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
    pricesByOccupancy: [{ occupancy: "", price: "" }],
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

    values.equipmentIds.forEach((id) => {
      formData.append("EquipmentIds", id);
    });

    values.childIds.forEach((id) => {
      formData.append("ChildIds", id);
    });

    if (values.pictures.length > 0) {
      values.pictures.forEach((file) => {
        formData.append(isCreate ? "ImageFiles" : "NewImageFiles", file);
      });
    }

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

    const cleanedPrices = values.pricesByOccupancy.map((p) => ({
      occupancy: Number(p.occupancy),
      price: Number(p.price),
    }));

    formData.append("PricesByOccupancy", JSON.stringify(cleanedPrices));

    if (!isCreate) {
      formData.append("Id", id);
    }

    console.log("Sending to backend:", formData);

    const res = isCreate
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
    if (!isCreate) {
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
          youtubeVideoLink: data.youtubeVideoLink,
          equipmentIds: data.equipmentIds || [],
          childIds: data.children?.map((child) => child.id) || [],
          pictures: [],
          imageUrls: data.imageUrls || [],
          translations: newTranslations,
          pricesByOccupancy: data.pricesByOccupancy || [],
        }));
      }
    }

    const equipmentData = await getDatas("Equipment");
    setEquipment(equipmentData);

    const childData = await getDatas("Children");
    setChild(childData);
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

  const handleAddPrice = () => {
    setValues((prev) => ({
      ...prev,
      pricesByOccupancy: [
        ...prev.pricesByOccupancy,
        { occupancy: "", price: "" },
      ],
    }));
  };

  const handleRemovePrice = (index) => {
    setValues((prev) => {
      const newPrices = prev.pricesByOccupancy.filter((_, i) => i !== index);
      return { ...prev, pricesByOccupancy: newPrices };
    });
  };

  const handleChangePrice = (index, field, value) => {
    setValues((prev) => {
      const newPrices = [...prev.pricesByOccupancy];
      newPrices[index][field] = value; // store as string
      return { ...prev, pricesByOccupancy: newPrices };
    });
  };

  return (
    <div className={global.container}>
      <form className={admin.form} onSubmit={(e) => e.preventDefault()}>
        <label>Şəkil</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {values.imageUrls.length > 0 && (
          <div>
            {values.imageUrls.map((url, i) => (
              <img key={i} src={url} alt={`Room image ${i + 1}`} width="100" />
            ))}
          </div>
        )}

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
          type="number"
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
          type="number"
          value={values.member}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, member: e.target.value }))
          }
        />

        <div>
          <label>
            Qonaq sayı və qiymət <span> </span>
            <Button
              className={`${admin.actionBtn} ${admin.create}`}
              onClick={() =>
                setValues((prev) => ({
                  ...prev,
                  pricesByOccupancy: [
                    ...prev.pricesByOccupancy,
                    { days: 1, price: 0 },
                  ],
                }))
              }
            >
              +
            </Button>
          </label>
          {values.pricesByOccupancy.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
            >
              <input
                type="number"
                placeholder="Gün sayı"
                value={item.occupancy ?? ""}
                onChange={(e) =>
                  handleChangePrice(index, "occupancy", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Qiymət"
                value={item.price ?? ""}
                onChange={(e) =>
                  handleChangePrice(index, "price", e.target.value)
                }
              />
              <button type="button" onClick={() => handleRemovePrice(index)}>
                X
              </button>
            </div>
          ))}
        </div>

        {[
          "service",
          "description",
          "miniDescription",
          "title",
          "miniTitle",
        ].map((field) => (
          <div key={field} className={admin.dFlex}>
            {[
              { lang: "en", code: 1 },
              { lang: "az", code: 2 },
              { lang: "ru", code: 3 },
            ].map(({ lang, code }) => (
              <div key={`${field}_${lang}`} className={admin.dFlex}>
                <label>
                  {field} ({lang.toUpperCase()}):
                  {field.includes("description") ? (
                    <textarea
                      value={values.translations[code][field]}
                      rows="5"
                      cols="33"
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations[code],
                              [field]: e.target.value,
                            },
                          },
                        }))
                      }
                      required={code === 1}
                    />
                  ) : (
                    <input
                      type="text"
                      value={values.translations[code][field]}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            [code]: {
                              ...prev.translations[code],
                              [field]: e.target.value,
                            },
                          },
                        }))
                      }
                      required={code === 1}
                    />
                  )}
                </label>
              </div>
            ))}
          </div>
        ))}
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

      <div className={admin.btns}>
        {child.map((item, i) => {
          const isSelected = values.childIds.includes(item.id);
          return (
            <Button
              key={`${i}_${item.name}`}
              className={`${admin.actionBtn} ${
                isSelected ? admin.selected : ""
              }`}
              onClick={() =>
                setValues((prev) => {
                  const alreadySelected = prev.childIds.includes(item.id);
                  return {
                    ...prev,
                    childIds: alreadySelected
                      ? prev.childIds.filter((id) => id !== item.id)
                      : [...prev.childIds, item.id],
                  };
                })
              }
            >
              {item?.ageRange} yaş - {item?.price}₼
            </Button>
          );
        })}
      </div>

      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={handleSubmit}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
