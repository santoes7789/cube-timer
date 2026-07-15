import type { Time } from "@/db/times"
import "./FormattedTime.css"

export function FormattedTime({ time }: { time: Time }) {
  return (
    <div className={`formattedTime ${time.modifier == "dnf" && "dnf"}`}>
      {time.getFormattedTimeValue()}
    </div>
  )
}