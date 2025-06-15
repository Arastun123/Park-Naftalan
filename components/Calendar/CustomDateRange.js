"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import styles from "./style.module.scss";
import "react-calendar/dist/Calendar.css";
import getWindowSize from "@/lib/getWindowsize"; 

export default function CustomDateRange({ onChange, selectedLocale }) {
  const [range, setRange] = useState([null, null]);
  const [width] = getWindowSize();

  function handleSelect(date) {
    const [start, end] = range;
    if (!start || (start && end)) {
      setRange([date, null]);
      onChange && onChange(null, null);
    } else {
      const newRange = date >= start ? [start, date] : [date, start];
      setRange(newRange);
      onChange && onChange(newRange[0], newRange[1]);
    }
  }

  const startDate = range[0] || new Date();

  const nextMonthDate = new Date(startDate);
  nextMonthDate.setMonth(startDate.getMonth() + 1);

  return (
    <div className={styles.wrapper}>
      <p>Giris cixis</p>
      <div className={styles.line}></div>
      <div className={styles.calendars}>
        <Calendar
          selectRange={true}
          onClickDay={handleSelect}
          value={range}
          tileClassName={({ date }) => {
            const [start, end] = range;
            if (start && !end && date.getTime() === start.getTime())
              return styles.selected;
            if (start && end && date >= start && date <= end)
              return styles.inRange;
            return null;
          }}
          className={styles.calendar}
        />

        {width >= 1024 && (
          <Calendar
            selectRange={false}
            value={range}
            activeStartDate={nextMonthDate}
            tileClassName={({ date }) => {
              const [start, end] = range;
              if (start && !end && date.getTime() === start.getTime())
                return styles.selected;
              if (start && end && date >= start && date <= end)
                return styles.inRange;
              return null;
            }}
            onClickDay={handleSelect}
            className={styles.calendar}
          />
        )}
      </div>
    </div>
  );
}
