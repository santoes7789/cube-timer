import { useDB } from "@/contexts/DBContext"
import styles from "./Timer.module.css";

function TimeList() {

  const db = useDB();
  return (
    <>
      <div className={styles.timesList}>
        {db.times.toReversed().map((e) =>
          <a key={e.id}>
            {e.getFormattedTimeValue()}
          </a>
        )}
      </div>
    </>
  )

}

export default TimeList;
