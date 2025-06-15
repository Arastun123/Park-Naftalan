"use client";
import { useState } from "react";

import { Bar, Person } from "../../Svg";
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
  const toggleMenu = () => {
    setMobileMenu((mobileMenu) => !mobileMenu);
  };

  return (
    <div className={styles.header}>
      <div className={styles.bckImg}>
        <img src="./header.png" alt="Hotel facade at night" priority="true" />
      </div>

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
            <Logo />
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
            <div className={styles.drawerColumns}>
              <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
              <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
              <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
              <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
              <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
            </div>

            <div className={styles.drawerIcons}>
              <Person />
              <Person />
              <Person />
              <Person />
              <Person />
              <Person />
            </div>
          </div>
        )}
      </nav>

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
          <ReserveCard className={styles.reserveCard} />
        </div>
      </div>
    </div>
  );
}
