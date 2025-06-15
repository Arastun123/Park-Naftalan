"use client";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { az, enUS, ru } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import getWindowSize from "@/lib/getWindowsize";
import styles from "./style.module.scss";
import CustomDateRange from "./CustomDateRange";

const localeMap = {
  az,
  en: enUS,
  ru,
};

export default function Calendar({ locale }) {
  const handleDateChange = ({ startDate, endDate }) => {
    console.log("Selected Dates:", startDate, endDate);
  };
  const [width] = getWindowSize();
  const selectedLocale = localeMap[locale] || az;
  return (
    <div>
      <CustomDateRange onChange={handleDateChange} />
    </div>
  );
}
