"use client";
import Button from "../Button/Button";
import { Car, Money } from "../Svg";
import styles from "./styles.module.scss";

export default function Campaigns({ locale, t }) {
  const handleCampaignSelect = (campaignType) => {
    try {
      sessionStorage.setItem("campaign", campaignType);
    } catch {}
    if (locale) {
      window.location.href = `/${locale}/booking`;
    } else {
      window.location.href = "/booking";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>{t?.Campaigns || "Kampaniyalar"}</h2>
        <p>
          {t?.MinStay7 ||
            "Kampaniya yalnız minimum 7 günlük müalicə paketinə aiddir."}
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Car />
          <p>{t?.FivePercent || "15% Endirim"}</p>
          <span>{t?.FivePercentDescription || "Qonaqlama xidməti ödənişindən 15% endirim"} </span>
          <p>15%</p>
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              onClick={() => handleCampaignSelect("5-percent")}
            >
              {t?.SelectCampaign || "Kampaniyanı seç"}
            </Button>
          </div>
        </div>
        <div className={styles.card}>
          <Money />
          <p>{t?.FreeTransfer || "Ödənişsiz Transfer"}</p>
          <span> {t?.FreeTransferDescription || "Bakı-Gəncə-Goran transfer xidməti"} </span>
          <p>Pulsuz</p>
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              onClick={() => handleCampaignSelect("free-transfer")}
            >
              {t?.SelectCampaign || "Kampaniyanı seç"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
