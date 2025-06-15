import { useEffect, useState } from "react";
import { nextWindowChecker } from "./helper";
export default function getWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize(nextWindowChecker && [window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () =>
      nextWindowChecker() && window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
