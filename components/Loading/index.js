import React from "react";
import styles from "./LoadingPage.module.scss";

export default function Loading() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
