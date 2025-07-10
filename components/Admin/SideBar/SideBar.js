import LinkItem from "@/components/Header/LinkItem/LinkItem";
import styles from "./style.module.scss";
import Logo from "@/components/Header/Logo";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.after}>
        <Logo />
      </div>
      <div className={`${styles.menu} ${styles.after}`}>
        {/* <LinkItem slug="/admin/reservasion">Rezervasiya</LinkItem> */}
        <LinkItem slug="/admin/package">Kompaniyalar</LinkItem>
        <LinkItem slug="/admin/about">Haqqımızda</LinkItem>
        <LinkItem slug="/admin/contact">Əlaqə məlumatları</LinkItem>
        <LinkItem slug="/admin/illness">Xəstəliklər</LinkItem>
        <LinkItem slug="/admin/treatmentmethod">Müalicəsi Nethodu</LinkItem>
        <LinkItem slug="/admin/treatmentCategory">Müalicə Növü</LinkItem>
        <LinkItem slug="/admin/equipment">Təhcizat</LinkItem>
        <LinkItem slug="/admin/room">Otaqlar</LinkItem>
      </div>
      <LinkItem slug="/">Əsas sayta kec</LinkItem>
    </div>
  );
}
