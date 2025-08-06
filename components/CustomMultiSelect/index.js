import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const CustomMultiSelect = ({
  label,
  options,
  name,
  selectedValues,
  onChange,
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const selectedLabels =
    options
      .filter((opt) => selectedValues.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ") || "";

  return (
    <div
      ref={wrapperRef}
      className={`${styles.multiSelectBoxWrapper} ${
        hasError ? styles.error : ""
      }`}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectBox} onClick={toggleDropdown}>
        <span className={styles.selectedText}>{selectedLabels}</span>
        <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <label key={option.value} className={styles.optionItem}>
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
