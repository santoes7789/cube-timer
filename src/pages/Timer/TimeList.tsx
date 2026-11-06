import { useDB } from "@/contexts/DBContext"
import styles from "./Timer.module.css";
import type { Time } from "@/db/times";

function TimeList() {
  const db = useDB();
  const times = db.times.toReversed();
  const groups = 12;
  const groupedTimes: Array<Time[]> = [];
  for (let i = 0; i < times.length; i += groups) {
    groupedTimes.push(times.slice(i, i + groups));
  }
  return (
    <>
      <div className={styles.timesList}>
        {groupedTimes.map((e, i) =>
          <div className={styles.timesListRow} key={`group-${i}`}>
            {e.map((e) => (
              <a key={e.id}>
                {e.getFormattedTimeValue()}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )

}

export default TimeList;
