import { getTranslations } from "@/lib/getTranslations";
import LinkItem from "../Header/LinkItem/LinkItem";
import Logo from "../Header/Logo";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import { Facebook, Phone, Youtube, Instagram } from "../Svg";

export default function Footer({ locale, t }) {
  //   const { t } = await getTranslations();
  return (
    <footer className={global.container}>
      <div className={styles.footer}>
        <LinkItem slug="/">
          <Logo width="146" height="104" />
        </LinkItem>
        <div className={styles.links}>
          <LinkItem slug={`/${locale}/about`}>About</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>Otaqlar</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>Naftalan</LinkItem>
          <LinkItem slug={`/${locale}/spa`}>Spa</LinkItem>
          <LinkItem slug={`/${locale}/restaurants`}>Contact</LinkItem>
          <LinkItem slug={`/${locale}/about`}>About</LinkItem>
          <LinkItem slug={`/${locale}/rooms`}>Otaqlar</LinkItem>
          <LinkItem slug={`/${locale}/naftalan`}>Naftalan</LinkItem>
          <LinkItem slug={`/${locale}/spa`}>Spa</LinkItem>
          <LinkItem slug={`/${locale}/restaurants`}>Contact</LinkItem>
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
          <LinkItem slug="/">Saytın hazırlanması </LinkItem>
        </div>
      </div>
    </footer>
  );
}
