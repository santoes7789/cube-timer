import { CustomDropdown } from "@/components/CustomDropdown";
import Popup from "@/components/Popup";
import { addSession } from "@/db/session";
import type { SessionType } from "@/types";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function SessionDisplay({ sessions, currentSession, setSession} :
  {sessions?: SessionType[], currentSession: number, setSession: Dispatch<SetStateAction<number>>}) {
  const [popup, setPopup] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");

  const currentSessionName = sessions?.find(s => s.id === currentSession)?.name;
  function closePopup() {
    setPopup(false);
    setNewSessionName("");
  }
  return (
    <>
      <div className="session-display-container popout-container">
        Session: {" "}
        <CustomDropdown
          value={currentSessionName}
          onClick={(id) => {
            if (id == "new") {
              setPopup(true);
            } else {
              setSession(!isNaN(+id) ? +id : 0);
            }
          }}
          options={sessions ?
            [
              ...sessions.map(t => ({ value: t.id.toString(), label: t.name })),
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
            onClick={async () => {
              const id = await addSession({
                name: newSessionName,
                timestamp: Date.now()
              })
              setSession(id);
              closePopup();
            }}>
            YES!
          </button>
        </div>
      </Popup>

    </>
  )
}

