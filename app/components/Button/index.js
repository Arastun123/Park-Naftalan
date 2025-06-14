"use client";

import styles from "./Button.module.scss";

export default function Button({
  onClick,
  children,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
}
