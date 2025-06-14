"use client";
import { Bar, Person } from "../../Svg";
import Button from "../../Button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LinkItem from "../LinkItem/LinkItem";
import Logo from "../Logo";
import styles from "../Header.module.scss";
import { useState } from "react";
import Close from "@/components/Svg/Close";
import ArrowFlow from "@/components/Svg/ArrowFlow";

export default function HeaderClient({ locale, t }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    setMobileMenu((mobileMenu) => !mobileMenu);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={`${styles.menu} conatiner`}>
          <Button onClick={() => toggleMenu()} className={styles.toggleMenu}>
            {!mobileMenu ? <Bar /> : <Close />}
          </Button>

          <LinkItem slug="#">{<Logo />}</LinkItem>

          <div className={styles.links}>
            <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t?.Otaqlar}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t?.Naftalan}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t?.Spa}</LinkItem>
            <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
          </div>

          <div className={styles.leftSide}>
            <LanguageSwitcher />
            <Person />
          </div>
          {mobileMenu && (
            <div className={styles.mobileMenu}>
              <div>
                <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Otaqlar}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Naftalan}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Spa}</LinkItem>
                <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
              </div>

              <div className={styles.icons}>
                <LinkItem slug={`/${locale}/about`}>
                  <Person />
                </LinkItem>
                <LinkItem slug={`/${locale}/about`}>
                  <Person />
                </LinkItem>
                <LinkItem slug={`/${locale}/about`}>
                  <Person />
                </LinkItem>
                <LinkItem slug={`/${locale}/about`}>
                  <Person />
                </LinkItem>
              </div>
              <div>
                <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Otaqlar}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Naftalan}</LinkItem>
                <LinkItem slug={`/${locale}/about`}>{t?.Spa}</LinkItem>
                <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div>
        <h1>ffhflrgsrdfg</h1>
        <div>

        <ArrowFlow />
        </div>
      </div>
    </>
  );
}
