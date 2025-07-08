import Video from "@/components/Video/VIdeo";

import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";
import styles from "@/styles/about.module.scss";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={`${global.container} ${styles.about}`}>
      <Video src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1" />
      <section>
        <div className={styles.title}>
          <h2>Park Naftalan</h2>
          <p>İstirahət mərkəzi</p>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.imageBox}>
            <img src="../headermain.png" alt="Park Naftalan Sanatoriyası" />
          </div>
          <div className={styles.txt}>
            <p>
                          {t?.AboutTxt}

            </p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.title}>
          <h2>Qalereya</h2>
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
