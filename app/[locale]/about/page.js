import Video from "@/components/Video/VIdeo";
import { getDatas } from "@/lib/handleApiActions";
import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss";
import styles from "@/styles/about.module.scss";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  // const data = await getDatas("Naftalan", locale);
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
            <img src="../headermain.png" alt="Park Naftalan" />
          </div>
          <div className={styles.txt}>
            <p>
              2022-ci ildən fəaliyyətə başlayan Park Naftalan Sanatoriya
              Kompleksi 1 hektara yaxın ərazidə yerləşir və iki altımərtəbəli
              korpusdan ibarətdir. Mərkəzdə ümumilikdə 114 komfortlu otaq
              mövcuddur və 240 nəfərədək qonağın yerləşdirilməsi
              mümkündür.Kompleks müasir tibbi və texniki avadanlıqlarla təchiz
              olunmuşdur. Qonaqlara milli və Avropa mətbəxinin ləziz təamları
              təqdim olunan restoran, istirahət üçün isə Lobby bar xidmət
              göstərir.
            </p>
            <p> Müalicə bölməsi geniş spektrli prosedurları ilə seçilir.</p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.title}>
          <h2>Qalereya</h2>
        </div>
        <div className={styles.galary}>
          <img src="../DSC_0610.png" alt="Name" />
          <img src="../DSC_0618.png" alt="Name" />
          <img src="../DSC_0620.png" alt="Name" />
          <img src="../DSC_6927.png" alt="Name" />
        </div>
      </section>
    </div>
  );
}
