"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Bar } from "../../Svg";
import Button from "../../Button/Button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LinkItem from "../LinkItem/LinkItem";
import Logo from "../Logo";

import Close from "@/components/Svg/Close";
import ArrowFlow from "@/components/Svg/ArrowFlow";

import global from "@/styles/global.module.scss";
import styles from "../Header.module.scss";
import ReserveCard from "@/components/ReserveCard/ReserveCard";
import TopReservation from "@/components/TopReservation";
import SocialMediaIcon from "@/components/SocailMediaIcons";

export default function HeaderClient({ locale, t }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setMobileMenu((mobileMenu) => !mobileMenu);
  };

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const showFullHeader = ["/az", "/ru", "/en"].includes(pathname);

  const renderNavContent = () => (
    <>
      {/* <div className={styles.top}>
        <div className={global.container}>
          <TopReservation t={t} locale={locale} />
        </div>
      </div> */}
      <nav className={styles.nav}>
        <div className={global.container}>
          <div className={styles.menu}>
            <Button
              onClick={toggleMenu}
              className={styles.toggleMenu}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <Close /> : <Bar />}
            </Button>

            <LinkItem slug={`/${locale}`} ariaLabel="Home">
              <Logo width="97" height="69" />
            </LinkItem>

            <div className={styles.links}>
              <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
              <LinkItem slug={`/${locale}/rooms`}>{t?.Rooms}</LinkItem>
              <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
              <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
              <LinkItem slug={`/${locale}/restaurant`}>
                {t?.Restaurant}
              </LinkItem>
            </div>

            <div className={styles.icons}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div
          className={`${styles.mobileMenu} ${mobileMenu ? styles.active : ""}`}
        >
          <div className={styles.drawerColumns}>
            <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
            <LinkItem slug={`/${locale}/rooms`}>{t?.Rooms}</LinkItem>
            <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
            <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
            <LinkItem slug={`/${locale}/restaurant`}>{t?.Restaurant}</LinkItem>
          </div>

          <SocialMediaIcon />
        </div>
      </nav>
    </>
  );

  if (showFullHeader) {
    return (
      <div
        className={styles.header}
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        <div className={styles.bckImg}>
          <img
            src="./header.png"
            alt="Park Naftalan Sanatoriyası"
            priority="true"
          />
        </div>

        {renderNavContent()}

        <div className={styles.reserve}>
          <p className={styles.reserveTitle}>{t?.HeaderTxt}</p>
          <span className={styles.arrow}>
            <ArrowFlow className={styles.arrow} />
          </span>
          <div className={styles.reserveCard}>
            <ReserveCard locale={locale} t={t} />
          </div>
        </div>
      </div>
    );
  }

  return renderNavContent();
}
