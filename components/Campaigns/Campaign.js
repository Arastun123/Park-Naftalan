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
        <h2>{t?.Campaigns}</h2>
        <p>{t?.MinStay7}</p>
        <p>{t?.CampingDuration}</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Car />
          <p>{t?.FivePercent}</p>
          <span>{t?.FivePercentDescription}</span>
          <p>25%</p>
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              onClick={() => handleCampaignSelect("5-percent")}
            >
              {t?.SelectCampaign}
            </Button>
          </div>
        </div>
        <div className={styles.card}>
          <Money />
          <p>{t?.FreeTransfer}</p>
          <span>{t?.FreeTransferDescription}</span>
          <p>Pulsuz</p>
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              onClick={() => handleCampaignSelect("free-transfer")}
            >
              {t?.SelectCampaign}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
