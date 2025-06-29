import React from "react";
import styles from "./style.module.scss";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  hasError,
  placeholder,
  min,
  className,
}) => {
  return (
    <div className={`${styles.inputWrapper} ${hasError ? styles.error : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className={`${styles.inputField} ${className || ""}`}
      /> 
      {/* {hasError && <span className={styles.errorMessage}>Bu sahə vacibdir.</span>} */}
    </div>
  );
};

export default Input;
