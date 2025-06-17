import { useState } from "react";
import styles from "./style.module.scss";
import Button from "../Button/Button";
import { Minus, Plus } from "../Svg";

function Counter({ name }) {
  const [count, setCount] = useState(0);
  const maxCount = 3;

  const handleCount = (action) => {
    switch (action) {
      case "increase":
        if (count < maxCount) {
          setCount(count + 1);
        }
        break;
      case "decrease":
        if (count > 0) {
          setCount(count - 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.counter}>
      <div>
        <p>{name}</p>
      </div>
      <div className={styles.btnBox}>
        <Button
          onClick={() => handleCount("decrease")}
          className={styles.counterBtn}
        >
          <Minus />
        </Button>
        <span>{count}</span>
        <Button
          onClick={() => handleCount("increase")}
          className={styles.counterBtn}
        >
          <Plus/>
        </Button>
      </div>
    </div>
  );
}
export default function RoomSelector({ t, params }) {
  return (
    <div className={styles.roomCard}>
      <p className={styles.cardTitle}>{t?.Room} 1</p>
      <Counter name={t?.Adult} />
      <Counter name={t?.Child} />
      <div className={styles.leftEndBtn}>
        <Button className={styles.more}>{t?.AddRoom}</Button>
        <Button className={styles.submit}>{t?.Submit}</Button>
      </div>
    </div>
  );
}
