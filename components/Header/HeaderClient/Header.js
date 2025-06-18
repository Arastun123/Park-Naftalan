"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Bar, Facebook, Person, Phone, Youtube, Instagram } from "../../Svg";
import Button from "../../Button/Button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LinkItem from "../LinkItem/LinkItem";
import Logo from "../Logo";

import Close from "@/components/Svg/Close";
import ArrowFlow from "@/components/Svg/ArrowFlow";

import global from "@/styles/global.module.scss";
import styles from "../Header.module.scss";
import ReserveCard from "@/components/ReserveCard/ReserveCard";

export default function HeaderClient({ locale, t }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setMobileMenu((mobileMenu) => !mobileMenu);
  };

  const showFullHeader = ["/az", "/ru", "/en"].includes(pathname);

  const NavContent = (
    <nav className={styles.nav}>
      <div className={`${styles.menu} ${global.container}`}>
        <Button
          onClick={toggleMenu}
          className={styles.toggleMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <Close /> : <Bar />}
        </Button>

        <LinkItem slug="/" ariaLabel="Home">
          <Logo width="97" height="69" />
        </LinkItem>

        <div className={styles.links}>
          <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
          <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
          <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
        </div>

        <div className={styles.icons}>
          <LanguageSwitcher />
          <Person />
        </div>
      </div>

      {mobileMenu && (
        <div className={styles.mobileMenu}>
          <div className={`${styles.drawerColumns} ${styles.fRight}`}>
            <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
            <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
            <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
            <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
            <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
          </div>

          <div className={`${styles.drawerColumns} ${styles.fLeft}`}>
            <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
            <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
            <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
            <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
            <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
          </div>
          <div className={styles.drawerIcons}>
            <LinkItem slug="/">
              <Instagram />
            </LinkItem>
            <LinkItem slug="/">
              <Facebook />
            </LinkItem>
            <LinkItem slug="/">
              <Youtube />
            </LinkItem>
            <LinkItem slug="/">
              <Phone />
            </LinkItem>
          </div>
        </div>
      )}
    </nav>
  );
  if (showFullHeader) {
    return (
      <div
        className={styles.header}
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        <div className={styles.bckImg}>
          <img src="./header.png" alt="Hotel facade at night" priority="true" />
        </div>

        {NavContent}

        <div className={styles.reserve}>
          <p className={styles.reserveTitle}>
            Otağını indi rezerv et,
            <br />
            rahatlığın dadını çıxar!
          </p>
          <span>
            <ArrowFlow className={styles.arrow} />
          </span>
          <div>
            <ReserveCard className={styles.reserveCard} locale={locale} t={t} />
          </div>
        </div>
      </div>
    );
  }

  return NavContent;
}
