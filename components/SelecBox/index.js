import React from "react";
import styles from "../Input/style.module.scss";

const SelectBox = ({
  label,
  optionData,
  name,
  value,
  onChange,
  hasError,
  multiple = false, 
}) => {
  return (
    <div className={`${styles.selectWrapper} ${hasError ? styles.error : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple} 
        className={styles.select}
      >
        {optionData.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
