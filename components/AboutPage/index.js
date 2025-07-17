"use client";
import { useEffect, useMemo, useState } from "react";

import Video from "@/components/Video/VIdeo";

import global from "@/styles/global.module.scss";
import styles from "@/styles/about.module.scss";
import { getDatas } from "@/lib/handleApiActions";
import Loading from "../Loading";

export default function AboutPageMain({ t, locale }) {
  const [about, setAbout] = useState([]);


  const lanCode = useMemo(() => {
    if (locale === "en") return 2;
    if (locale === "az") return 1;
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
    about.imageUrl = about;
  };

  const selectedTranslation = about.translations?.find(
    (t) => t.language === lanCode
  );

  const originalPath = about?.imageUrl || "";
  const updatedPath = originalPath.replace("uploads/", "uploads/");

  if (!about && !originalPath) return <Loading />;

  return (
    <div className={`${global.container} ${styles.about}`}>
      <Video src={about?.videoLink} />
      <section>
        <div className={styles.title}>
          <h2>{selectedTranslation?.title}</h2>
          <p>{selectedTranslation?.miniTitle}</p>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.imageBox}>
            <img
            // http://localhost:5041/  https://parknaftalan.az/
              src={`http://localhost:5041/${updatedPath}`}
              alt="Park Naftalan Sanatoriyası"
            />
          </div>
          <div className={styles.txt}>
            <p>{selectedTranslation?.description}</p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.title}>
          <h2>{t?.Gallery}</h2>
        </div>
        <div className={styles.galary}>
          <img src="../DSC_0610.png" alt="Park Naftalan Sanatoriyası" />
          <img src="../DSC_0618.png" alt="Park Naftalan Sanatoriyası" />
          <img src="../DSC_0620.png" alt="Park Naftalan Sanatoriyası" />
          <img src="../DSC_6927.png" alt="Park Naftalan Sanatoriyası" />
        </div>
      </section>
    </div>
  );
}
