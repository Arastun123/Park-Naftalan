import Video from "@/components/Video/VIdeo";
import { getDatas } from "@/lib/getDatas";
import { getTranslations } from "@/lib/getTranslations";
import global from "@/styles/global.module.scss";
import styles from "@/styles/about.module.scss";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  // const data = await getDatas("Naftalan", locale);
  return (
    <div className={`${global.container} ${styles.about}`}>
      <Video />
      <section>
        <div className={styles.title}>
          <h2>Park Naftalan</h2>
          <p>İstirahət mərkəzi</p>
        </div>
        <div className={styles.mainContent}>
          <p>
            Lorem ipsum dolor sit amet consectetur. Vitae habitant sed purus
            urna pretium. Hendrerit elit aliquam consectetur sagittis tellus
            accumsan consectetur dui. Pellentesque vitae suspendisse viverra
            pellentesque viverra. Fermentum egestas eget cursus convallis.
            Porttitor nam pretium lacus imperdiet. Molestie donec adipiscing
            integer ac aliquet faucibus quam pharetra. Posuere tempor diam quis
            viverra leo. In lacus eleifend donec facilisi diam. Tortor convallis
            neque blandit quis molestie elementum pellentesque condimentum eros.
          </p>
          <img src="../headermain.png" alt="Park Naftalan" />
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
