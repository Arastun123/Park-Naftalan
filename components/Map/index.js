import styles from "@/styles/global.module.scss";
export default function Map({}) {
  return (
    <div className={styles.mapContainer}>
      <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.637159174405!2d46.82237402609282!3d40.50540590023731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403f2d1fe018fdff%3A0x984bc193d7c77b13!2sPark%20Naftalan%20Hotel!5e0!3m2!1sen!2saz!4v1751961377456!5m2!1sen!2saz"         allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Park Naftalan Location"
        width={600}
        height={400}
      ></iframe>
    </div>
  );
}
