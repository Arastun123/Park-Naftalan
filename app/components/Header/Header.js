import { getTranslations } from "@/lib/getTranslations";
import Logo from "./Logo";
import LinkItem from "./LinkItem/LinkItem";
import styles from "./Header.module.scss";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import Button from "../Button";
import { Bar } from "../Svg";

function ButtonClientWrapper() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Button onClick={handleClick}>
      <Bar />
    </Button>
  );
}
export default async function Header({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const handleClick = () => {
    console.log("dasds!");
  };

  return (
    <header
      style={{
        backgroundImage: `url('/headermain.png')`,
        backgroundSize: "cover",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={styles.header}
    >
      <nav className={styles.nav}>
        <div className={`${styles.menu} conatiner`}>
          {/* <Button onClick={() => handleClick()}>
            {" "}
            <Bar />
          </Button> */}
          <LinkItem slug="/">{<Logo />}</LinkItem>

          <div>
            <LinkItem slug={`/${locale}/about`}>{t.About}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t.Otaqlar}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t.Naftalan}</LinkItem>
            <LinkItem slug={`/${locale}/about`}>{t.Spa}</LinkItem>
            <LinkItem slug={`/${locale}/contact`}>{t.Contact}</LinkItem>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
