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
     <LinkItem slug="http://www.instagram.com/parknaftalan.az">
        <Instagram />
      </LinkItem>
      <LinkItem slug="http://www.facebook.com/ParkNaftalanSanatoriyasi">
        <Facebook />
      </LinkItem>
      <LinkItem slug="http://www.facebook.com/ParkNaftalanSanatoriyasi">
        <Youtube />
      </LinkItem>
      {/* <LinkItem slug="/">
        <Phone />
      </LinkItem> */}
    </div>
  );
}
