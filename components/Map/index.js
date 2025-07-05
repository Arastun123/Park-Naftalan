import styles from "@/styles/global.module.scss";
export default function Map({}) {
  return (
    <div className={styles.mapContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14412.613858272412!2d49.7876062989235!3d40.41848290601152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030879f861dcafd%3A0x698cf8c88c5e0179!2sBak%C4%B1%20Beyn%C9%99lxalq%20Avtova%C4%9Fzal%20Kompleksi!5e1!3m2!1sen!2saz!4v1751391969769!5m2!1sen!2saz"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Park Naftalan Location"
        width={600}
        height={400}
      ></iframe>
    </div>
  );
}
