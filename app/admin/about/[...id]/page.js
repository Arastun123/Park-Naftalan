"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { getDataById, updateData } from "@/lib/handleApiActions";

export default function CreateAbout() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [videoLink, setVideoLink] = useState("");

  const [translations, setTranslations] = useState([
    { id: 0, language: 1, title: "", miniTitle: "", description: "" }, // AZ
    { id: 0, language: 2, title: "", miniTitle: "", description: "" }, // EN
    { id: 0, language: 3, title: "", miniTitle: "", description: "" }, // RU
  ]);

  const languageLabels = {
    1: "AZ",
    2: "EN",
    3: "RU",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDataById("About", id || 1);
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
      prev.map((t) =>
        t.language === lang ? { ...t, [field]: value } : t
      )
    );
  };

  const handleSubmit = async () => {
    const payload = {
      id: Number(id),
      videoLink,
      translations: translations.map((t) => ({
        id: t.id || 0,
        title: t.title,
        miniTitle: t.miniTitle,
        description: t.description,
        language: t.language,
      })),
    };

    try {
      const res = await updateData("about", id || 1, payload);
      if (res.status === 204) {
        alert("Proses uğurla başa çatdı");
        router.back();
      } else {
        alert("Xəta baş verdi: " + res.status);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Xəta baş verdi");
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        {translations.map((t) => (
          <div key={t.language}>
            <h3 style={{ marginBottom: 8 }}>{languageLabels[t.language]}</h3>

            <label>Title</label>
            <input
              type="text"
              value={t.title}
              onChange={(e) =>
                handleTranslationChange(t.language, "title", e.target.value)
              }
            />

            <label>Mini Title</label>
            <input
              type="text"
              value={t.miniTitle}
              onChange={(e) =>
                handleTranslationChange(t.language, "miniTitle", e.target.value)
              }
            />

            <label>Description</label>
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
