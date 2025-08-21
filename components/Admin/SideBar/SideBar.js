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
        {/* <LinkItem slug="/naftalanPark/reservasion">Rezervasiya</LinkItem> */}
        {/* <LinkItem slug="/naftalanPark/package">Kompaniyalar</LinkItem> */}
        <LinkItem slug="/naftalanPark/about">Haqqımızda</LinkItem>
        <LinkItem slug="/naftalanPark/contact">Əlaqə məlumatları</LinkItem>
        <LinkItem slug="/naftalanPark/illness">Xəstəliklər</LinkItem>
        <LinkItem slug="/naftalanPark/treatmentmethod">Müalicəsi Methodu</LinkItem>
        <LinkItem slug="/naftalanPark/treatmentCategory">Müalicə Növü</LinkItem>
        <LinkItem slug="/naftalanPark/equipment">Təhcizat</LinkItem>
        <LinkItem slug="/naftalanPark/room">Otaqlar</LinkItem>
        <LinkItem slug="/naftalanPark/children">Uşaqlar üçün qiymət</LinkItem>

      </div>
      <LinkItem slug="/">Əsas sayta kec</LinkItem>
    </div>
  );
}
