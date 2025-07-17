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

  const treatmentLanCode = useMemo(() => {
    if (locale === "en") return 0;
    if (locale === "az") return 1;
    return 2;
  }, [locale]);

  useEffect(() => {
    const fetchDatas = async () => {
      const illnessData = await getDatas("Illness");
      const treatmentData = await getDatas("TreatmentCategory");

      if (illnessData && treatmentData) {
        setIllness(illnessData);
        setTreatment(treatmentData);

        const firstValidTab = treatmentData.find((cat) =>
          cat.translations?.find(
            (tr) => tr.language === treatmentLanCode && tr.name
          )
        );

        setActiveTab(firstValidTab?.id);
      }
    };

    fetchDatas();
  }, [lanCode]);

  const getTranslatedName = (translations = []) => {
    const translation = translations.find(
      (t) => t.language === treatmentLanCode
    );
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
              className={`${cat.id === activeTab && styles.active}`}
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
            <div key={illnessItem.id}>
              <img
              // http://localhost:5041/api/ 
                src={`https://parknaftalan.az/uploads/images/illness${illnessItem.id}.png`}
                alt={`Park Naftalan Sanatoriyası - ${illnessItem.name}`}
              />
              <h3>{translation.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
