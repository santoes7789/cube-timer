import type { Time } from "@/db/times"
import "./FormattedTime.css"

// Returns the time object, but formatted
export function FormattedTime({ time }: { time: Time }) {
  // If time is a dnf, have a cross out effect based on styles.
  return (
    <div className={`formattedTime ${time.modifier == "dnf" && "dnf"}`}>
      {time.getFormattedTimeValue()}
    </div>
  )
}
