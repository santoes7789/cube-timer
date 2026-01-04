import { CustomDropdown } from "@/components/CustomDropdown";
import Popup from "@/components/Popup";
import { useTimes } from "@/contexts/TimesContext"
import { useState } from "react";

export default function SessionDisplay() {
  const [popup, setPopup] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const times = useTimes();

  function closePopup() {
    setPopup(false);
    setNewSessionName("");
  }
  return (
    <>
      <div className="session-display-container popout-container">
        Session: {" "}
        <CustomDropdown
          value={times?.activeSessionName ?? null}
          onClick={(id) => {
            if (id == "new") {
              setPopup(true);
            } else {
              times?.sessionDispatch({ type: "set", id: id })
            }
          }}
          options={times ?
            [
              ...times.sessionData.sessions.map(t => ({ value: t.id, label: t.name })),
              { value: "new", label: "Create New" }
            ] : []} />
      </div>
      <Popup show={popup} onClose={closePopup}>
        New session name:
        <input autoFocus value={newSessionName} onChange={e => setNewSessionName(e.target.value)} />
        <div className="new-session-popup-buttons">
          <button onClick={closePopup}>
            Cancel</button>
          <button
            disabled={newSessionName.trim() === ""}
            onClick={() => {
              times?.sessionDispatch({ type: "add", name: newSessionName, setSession: true, id: crypto.randomUUID() });
              closePopup();
            }}>
            YES!
          </button>
        </div>
      </Popup>

    </>
  )
}

