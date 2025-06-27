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
        <LinkItem slug="/admin/reservasion">Rezervasiya</LinkItem>
        <LinkItem slug="/admin/slider">Ana səhifə başlıq şəkili</LinkItem>
        <LinkItem slug="/admin/about">Haqqımızda</LinkItem>
        <LinkItem slug="/admin/contact">Əlaqə məlumatları</LinkItem>
        <LinkItem slug="/admin/treatmentmethod">Naftalan Müalicəsi</LinkItem>
        <LinkItem slug="/admin/spa">Spa</LinkItem>
        <LinkItem slug="/admin/equipment">Equipment</LinkItem>
        <LinkItem slug="/admin/room">Otaqlar</LinkItem>
        
      </div>
      <LinkItem slug="/">Əsas sayta kec</LinkItem>
    </div>
  );
}
