import { useState } from "react";
import Calendar from "react-calendar";
import styles from "./style.module.scss";
import 'react-calendar/dist/Calendar.css';

export default function CustomDateRange({ onChange }) {
  const [range, setRange] = useState([null, null]); // [the first date, the last date]

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

  return (
    <div className={styles.wrapper}>
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
      />
    </div>
  );
}
