import { useState } from "react";
import styles from "./style.module.scss";
import Button from "../Button/Button";
import { Minus } from "../Svg";

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
          +
        </Button>
      </div>
    </div>
  );
}
export default function RoomSelector({ t, params }) {
  return (
    <div className={styles.roomCard}>
      <p className={styles.cardTitle}>Otaq 1</p>
      <Counter name="Yetişkin" />
      <Counter name="Uşaq" />
      <div className={styles.leftEndBtn}>
        <Button className={styles.more}>Otaq əlavə et</Button>
        <Button className={styles.submit}>Təsdiq et</Button>
      </div>
    </div>
  );
}
