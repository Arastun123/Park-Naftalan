import styles from "@/styles/global.module.scss";
import {
  Facebook,
  Phone,
  Youtube,
  Instagram,
} from "@/components/Svg/index";
import LinkItem from "../Header/LinkItem/LinkItem"; 

export default function SocialMediaIcon({}) {
  return (
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
  );
}
