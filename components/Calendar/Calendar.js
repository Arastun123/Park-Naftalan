"use client";

import { az, enUS, ru } from "date-fns/locale";
import CustomDateRange from "./CustomDateRange";

const localeMap = {
  az,
  en: enUS,
  ru,
};

export default function Calendar({
  locale,
  t,
  handleDateChange,
  initialRange = null,
}) {
  const selectedLocale = localeMap[locale] || az;

  return (
    <CustomDateRange
      onChange={handleDateChange}
      locale={selectedLocale.code}
      t={t}
      initialRange={initialRange}
    />
  );
}
