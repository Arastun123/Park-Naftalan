import { getTranslations } from "@/lib/getTranslations";

import LinkItem from "../Header/LinkItem/LinkItem";
import Logo from "../Header/Logo";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import { Facebook, Phone, Youtube, Instagram } from "../Svg";

export default async function Footer({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  return (
    <footer className={global.container}>
      <div className={styles.footer}>
        <LinkItem slug="/">
          <Logo width="146" height="104" />
        </LinkItem>
        <div className={styles.links}>
          <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
          <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
          <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
          <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>{t?.Otaqlar}</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
          <LinkItem slug={`/${locale}/spa`}>{t?.Spa}</LinkItem>
          <LinkItem slug={`/${locale}/restaurants`}>{t?.Contact}</LinkItem>
        </div>
        <div className={styles.icons}>
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
        <div className={styles.bottom}>
          <p>
            Hotel Plaza Athenee SAS Société par Actions Simplifiées au capital
            de 460 000 Euros 25, 27 Avenue Montaigne, Paris 75008
          </p>
          <LinkItem slug="/">{t?.Developed} </LinkItem>
        </div>
      </div>
    </footer>
  );
}
