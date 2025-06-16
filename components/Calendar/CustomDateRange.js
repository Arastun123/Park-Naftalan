import { useEffect, useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./style.module.scss";
import getWindowSize from "@/lib/getWindowsize";
import { ArrowLeft, ArrowRight } from "../Svg";

function CustomCalendar({
  onChange,
  initialMonthOffset = 0,
  isMobile = false,
  isSecondCalendar = false,
  localeString,
}) {
  const [range, setRange] = useState([null, null]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    today.setMonth(today.getMonth() + initialMonthOffset);
    setActiveStartDate(today);
  }, [initialMonthOffset]);

  function handleSelect(date) {
    const [start, end] = range;
    if (!start || (start && end)) {
      setRange([date, null]);

      onChange?.({ startDate: date, endDate: null });
    } else {
      const newRange = date >= start ? [start, date] : [date, start];
      setRange(newRange);

      onChange?.({ startDate: newRange[0], endDate: newRange[1] });
    }
  }

  const goToPreviousMonth = useCallback(() => {
    setActiveStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setActiveStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const months = {
    "az-AZ": [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
    "en-US": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    "ru-RU": [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const formatMonthYearLabel = useCallback(
    (date) => {
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthName =
        months[localeString]?.[month] ||
        date.toLocaleString(localeString, { month: "long" });

      return `${monthName} ${year}`;
    },
    [localeString]
  );

  const formatWeekdayShort = useCallback(
    (internalLocale, date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "";
      }

      const dayIndex = date.getDay();

      const azWeekdays = ["B", "Ç.A", "Ç", "C.A", "C", "Ş", "B"];

      if (localeString === "az-AZ") {
        return azWeekdays[dayIndex];
      }

      return new Intl.DateTimeFormat(localeString, { weekday: "short" }).format(
        date
      );
    },
    [localeString]
  );

  return (
    <div className={styles.customCalendarWrapper}>
      <div className={styles.customNavigation}>
        {isMobile || (!isMobile && !isSecondCalendar) ? (
          <button onClick={goToPreviousMonth} className={styles.navButton}>
            <ArrowLeft />
          </button>
        ) : (
          <div className={styles.placeholderButton}></div>
        )}

        <span className={styles.navLabel}>
          {formatMonthYearLabel(activeStartDate)}
        </span>

        {isMobile || (!isMobile && isSecondCalendar) ? (
          <button onClick={goToNextMonth} className={styles.navButton}>
            <ArrowRight />
          </button>
        ) : (
          <div className={styles.placeholderButton}></div>
        )}
      </div>

      <Calendar
        selectRange={true}
        onClickDay={handleSelect}
        value={range}
        className={styles.calendar}
        tileClassName={({ date }) => {
          const [start, end] = range;
          if (start && !end && date.getTime() === start.getTime())
            return styles.selected;
          if (start && end && date >= start && date <= end)
            return styles.inRange;
          return null;
        }}
        showNavigation={false}
        navigationLabel={() => null}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        minDetail="month"
        maxDetail="month"
        locale={localeString}
        formatShortWeekday={formatWeekdayShort}
      />
    </div>
  );
}

export default function CustomDateRange({ onChange, locale }) {
  const [width] = getWindowSize();
  const isMobile = width < 1024;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <span>Giriş</span>
          <span>→</span>
          <span>Çıxış</span>
        </div>
      </div>
      <div className={styles.calendars}>
        <CustomCalendar
          onChange={onChange}
          initialMonthOffset={0}
          isMobile={isMobile}
          isSecondCalendar={false}
          localeString={locale}
        />
        {!isMobile && (
          <CustomCalendar
            onChange={onChange}
            initialMonthOffset={1}
            isMobile={false}
            isSecondCalendar={true}
            localeString={locale}
          />
        )}
      </div>
    </div>
  );
}
