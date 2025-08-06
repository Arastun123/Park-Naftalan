import Button from "@/components/Button/Button";
import ContactComponent from "@/components/Contact";
import { Clock, Download, Phone, Reserve } from "@/components/Svg";

import { getTranslations } from "@/lib/getTranslations";

import global from "@/styles/global.module.scss";
import styles from "@/styles/restaurant.module.scss";

export default async function RestaurantPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className={styles.restaurant}>
      <div className={styles.mainImageWrapper}>
        <img
          src="/Rectangle99.png"
          alt="Park Terrace Restaurant"
          className={styles.backgroundImage}
        />
        <div className={styles.mainImage}>
          <h2>{t?.Park}</h2>
          <p>{t?.ResTxt}</p>
          <div className={styles.actions}>
            <Button>
              <Reserve /> {t?.Reserv}
            </Button>
            <Button>
              <Download /> {t?.Menu}
            </Button>
          </div>
        </div>
      </div>
      <div className={global.container}>
        <div className={styles.about}>
          <div className={styles.text}>
            {" "}
            <h3>{t?.Park}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Commodo venenatis egestas
              mollis id magna nisl ut. Odio faucibus tellus hac justo eu
              faucibus.Lorem ipsum dolor sit amet consectetur. Commodo venenatis
              egestas mollis id magna nisl ut. Odio faucibus tellus hac justo eu
              faucibus.
            </p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <Clock />
                <p>Open hours</p>
                <p>09:00 - 24:00</p>
                <p>Every day</p>
              </div>
              <div className={styles.card}>
                <Phone color="#333" width="30" height="30" />
                <p>Open hours</p>
                <p>09:00 - 24:00</p>
                <p>Every day</p>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <img src="/Rectangle99.png" alt="Park Terrace Restaurant" />
          </div>
        </div>
        <div className={styles.gallery}>
          <h3>{t?.Discover}</h3>

          <div className={styles.grid}>
            
          </div>
        </div>
      </div>
    </div>
  );
}
