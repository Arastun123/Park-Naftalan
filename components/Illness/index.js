"use client";

import { getDatas } from "@/lib/handleApiActions";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

export default function Illness({ t, locale }) {
  const [illness, setIllness] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const lanCode = useMemo(() => {
    if (locale === "en") return 1;
    if (locale === "az") return 2;
    return 3;
  }, [locale]);

  useEffect(() => {
    const fetchDatas = async () => {
      const illnessData = await getDatas("Illness");
      const treatmentData = await getDatas("TreatmentCategory");
      console.log(treatmentData);

      if (illnessData && treatmentData) {
        setIllness(illnessData);
        setTreatment(treatmentData);

        const firstValidTab = treatmentData.find((cat) =>
          cat.translations?.some((tr) => tr.language === lanCode && tr.name)
        );

        setActiveTab(firstValidTab?.id || null);
      }
    };

    fetchDatas();
  }, [lanCode]);

  const getTranslatedName = (translations = []) => {
    const translation = translations.find((t) => t.language === lanCode);
    return translation?.name || "-";
  };

  const filteredIllnessByCategory = (categoryId) => {
    return illness.filter((item) => item.treatmentCategoryId === categoryId);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabBtn}>
        {treatment.map((cat) => {
          const name = getTranslatedName(cat.translations);
          if (!name) return null;

          return (
            <Button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cat.id === activeTab ? styles.active : ""}
            >
              {name}
            </Button>
          );
        })}
      </div>

      <div className={styles.tabContent}>
        {filteredIllnessByCategory(activeTab).map((illnessItem) => {
          const translation = illnessItem.translations.find(
            (t) => t.language === lanCode
          );
          if (!translation) return null;

          return (
            <div key={illnessItem.id} className={styles.illnessItem}>
              <img
                src={`http://localhost:5041/${illnessItem.imageUrls}`}
                alt={`Park Naftalan - ${translation.name}`}
              />
              <h3>{translation.name}</h3>
              {/* <p>{translation.description}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
