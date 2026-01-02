import { CustomDropdown } from "@/components/CustomDropdown";
import { useTimes } from "@/contexts/TimesContext"

export default function SessionDisplay() {
  const times = useTimes();

  return (
    <div className="session-display-container popout-container">
      Session: {" "} 
      <CustomDropdown 
        defaultValue={times?.activeSessionName ?? null}
        onClick={(id) => {
          if(id == "new") {

          } else {
            times?.setActiveSession(id)
          }
        }}
        options={times ? 
          [
            ...times.sessionData.map(t => ( { value: t.id, label: t.name})), 
            {value: "new", label: "Create New"}
          ] : []}/>
    </div>
  )
}

