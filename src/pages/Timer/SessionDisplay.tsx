import { useTimes } from "@/contexts/TimesContext"

export default function SessionDisplay() {
  const times = useTimes();

  return (
    <div className="session-display-container popout-container">
      Session:  
      <select className="dropdown session-dropdown" value={times?.activeSession}>
        <option value="apple">3x3</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
        <option value="orange">New session</option>
      </select>
    </div>
  )
}
