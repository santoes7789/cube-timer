import { useDB } from "@/contexts/DBContext";
import styles from "./Timer.module.css";
import { formatMilliseconds, getAoX, getBestTime } from "@/utils/time";

function TimeStats() {
  const db = useDB();
  return (
    <div className={styles.timeStats}>
      <div>Best: {formatMilliseconds(getBestTime(db.times)?.time)}</div>
      <div>Ao5: {formatMilliseconds(getAoX(db.times, 5))}</div>
      <div>Ao12: {formatMilliseconds(getAoX(db.times, 12))}</div>
    </div>
  )
}

export default TimeStats;
