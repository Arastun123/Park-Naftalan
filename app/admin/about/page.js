"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { getDatas, updateAbout } from "@/lib/handleApiActions";
import { toast } from "react-toastify";

export default function CreateAbout() {
  const router = useRouter();
  const id = 1;

  const [videoLink, setVideoLink] = useState("");
  const [image, setImage] = useState("");
  const [translations, setTranslations] = useState([
    { language: 1, title: "", miniTitle: "", description: "" },
    { language: 2, title: "", miniTitle: "", description: "" },
    { language: 3, title: "", miniTitle: "", description: "" },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDatas("About");
    if (data) {
      setVideoLink(data.videoLink || "");

      const newTranslations = translations.map((t) => {
        const match = data.translations.find((d) => d.language === t.language);
        return match
          ? {
              id: match.id || 0,
              language: t.language,
              title: match.title || "",
              miniTitle: match.miniTitle || "",
              description: match.description || "",
            }
          : t;
      });

      setTranslations(newTranslations);
    }
  };

  const handleTranslationChange = (lang, field, value) => {
    setTranslations((prev) =>
      prev.map((t) => (t.language === lang ? { ...t, [field]: value } : t))
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("VideoLink", videoLink);

    if (image) {
      formData.append("ImageFile", image);
    }

    translations.forEach((t) => {
      formData.append(
        "Translations",
        JSON.stringify({
          id: t.id || 1,
          title: t.title,
          miniTitle: t.miniTitle,
          description: t.description,
          language: t.language,
        })
      );
    });

    const res = await updateAbout("About", id, formData);

    if (res && res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
    } else {
      toast.error("Xəta baş verdi: " + (res?.status || "server xətası"));
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        {translations.map((t, i) => (
          <div key={t.language}>
            <h3 style={{ marginBottom: 8 }}>
              {t.language === 1 ? "EN" : t.language === 2 ? "AZ" : "RU"}
            </h3>
            <label>Başlıq</label>
            <input
              type="text"
              value={t.title}
              onChange={(e) =>
                handleTranslationChange(t.language, "title", e.target.value)
              }
            />
            <label>Başlıqın altında olan kiçik yazı</label>
            <input
              type="text"
              value={t.miniTitle}
              onChange={(e) =>
                handleTranslationChange(t.language, "miniTitle", e.target.value)
              }
            />
            <label>Ətraflı məlumat</label>
            <textarea
              rows={3}
              value={t.description}
              onChange={(e) =>
                handleTranslationChange(
                  t.language,
                  "description",
                  e.target.value
                )
              }
            />
            <hr />
          </div>
        ))}
        <label>Şəkil</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label>Video Link</label>
        <input
          type="url"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
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
