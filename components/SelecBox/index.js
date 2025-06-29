 
import React from "react";
import styles from '../Input/style.module.scss'
const SelectBox = ({
  label,
  optionData,
  name,
  value,
  onChange,
  hasError,
  className,
}) => {
  return (
    <div className={`${styles.selectWrapper} ${hasError ? styles.error : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.selectField} ${className || ""}`}
      >
        {optionData.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
