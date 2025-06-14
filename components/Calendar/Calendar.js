"use client";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { az, enUS, ru } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css

const localeMap = {
  az,
  en: enUS,
  ru,
};

export default function Calendar({ locale }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const selectedLocale = localeMap[locale] || az;

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={2}
        direction="horizontal"
        locale={selectedLocale}
        showMonthAndYearPickers={false}
        weekdayDisplayFormat="EEEEEE"
      />
    </div>
  );
}
