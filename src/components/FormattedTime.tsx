import type { Time } from "@/db/times"
import "./FormattedTime.css"
import { formatMilliseconds } from "@/utils/time"

export function FormattedTime({ time }: { time: Time }) {

  const timeInMilliseconds = time.time + (time.modifier == "+2" ? 2000 : 0);

  return (
    <div className={`formattedTime ${time.modifier == "dnf" && "dnf"}`}>
      {formatMilliseconds(timeInMilliseconds)}{time.modifier == "+2" && "+"}
    </div>
  )
}