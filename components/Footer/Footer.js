import { getTranslations } from "@/lib/getTranslations";

import LinkItem from "../Header/LinkItem/LinkItem";
import Logo from "../Header/Logo";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import SocialMediaIcon from "../SocailMediaIcons";

export default async function Footer({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  return (
    <footer>
      <div className={styles.footer}>
        <LinkItem slug="/">
          <Logo width="146" height="104" />
        </LinkItem>
        <div className={styles.links}>
          <LinkItem slug={`/${locale}/about`}>{t?.About}</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>{t?.Rooms}</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>{t?.Naftalan}</LinkItem>
          <LinkItem slug={`/${locale}/contact`}>{t?.Contact}</LinkItem>
          <LinkItem slug={`/${locale}/reservations`}>{t?.Reservation}</LinkItem>
          <LinkItem slug={`/${locale}/restaurant`}>{t?.Restaurant}</LinkItem>
        </div>
        <SocialMediaIcon />
        <div className={styles.bottom}>
          <p>
            {/* Hotel Plaza Athenee SAS Société par Actions Simplifiées au capital
            de 460 000 Euros 25, 27 Avenue Montaigne, Paris 75008 */}
          </p>
          {/* <LinkItem slug="/"></LinkItem> */}
        </div>
      </div>
    </footer>
  );
}
