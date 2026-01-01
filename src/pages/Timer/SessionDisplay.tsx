import { CustomDropdown } from "@/components/CustomDropdown";
import { useTimes } from "@/contexts/TimesContext"

export default function SessionDisplay() {
  const times = useTimes();

  return (
    <div className="session-display-container popout-container">
      Session:  
      {/* <CustomDropdown options={times ? times.sessionData.map(t => ( { value: t.id, label: t.name})) : []}/> */}
      <CustomDropdown options={[
        { value: "one", label: "1"},
        { value: "two", label: "2"},
        { value: "three", label: "3"},
        { value: "four", label: "4"},
      ]}/>
    </div>
  )
}

