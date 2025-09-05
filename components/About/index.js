"use client";
import { getDatas } from "@/lib/handleApiActions";
import { useEffect, useMemo, useState } from "react";

export default function About({ t, locale }) {
  const [about, setAbout] = useState([]);

  const lanCode = useMemo(() => {
    if (locale === "en") return 1;
    if (locale === "az") return 2;
    return 3;
  }, [locale]);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const data = await getDatas("About");
    if (data) {
      setAbout(data);
    }
  };
  const selectedTranslation = about.translations?.find(
    (t) => t.language === lanCode
  );
  

  return <>{selectedTranslation?.description}</>;
}
