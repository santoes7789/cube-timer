import { CustomDropdown } from "@/components/CustomDropdown";
import Popup from "@/components/Popup";
import { addSession, deleteSession, updateSession } from "@/db/session";
import type { SessionType } from "@/types";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function SessionDisplay({ sessions, currentSession, setSession} :
  {sessions?: SessionType[], currentSession: number, setSession: Dispatch<SetStateAction<number>>}) {
  const [newNamePopup, setNewNamePopup] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);
  const [newSessionName, setNewSessionName] = useState("");


  const currentSessionName = sessions?.find(s => s.id === currentSession)?.name;
  function closePopup() {
    setNewNamePopup(false);
  }
  return (
    <>
      <div className="session-display-container popout-container">
        Session: {" "}
        <CustomDropdown
          value={currentSessionName}
          onClick={(id) => {
            if (id == "new") {
              setNewSessionName("");
              setNewNamePopup(true);
            } else {
              setSession(!isNaN(+id) ? +id : 0);
            }
          }}

          onRightClick={(id) => {
            const session = sessions?.find(s => s.id.toString() === id);
            setSelectedSession(session ?? null);
            setNewSessionName(session?.name ?? "");
          }}
          options={sessions ?
            [
              ...sessions.map(t => ({ value: t.id.toString(), label: t.name })),
              { value: "/divider/", label: "/divider/" },
              { value: "new", label: "New Session" }
            ] : []} />
      </div>
      <Popup show={newNamePopup} onClose={closePopup}>
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

      <Popup show={selectedSession !== null} onClose={() => setSelectedSession(null)}>
        {selectedSession && 

          <>

            <div className="session-popup-content">


              <div className="heading">Session name:</div>
              <div className="content">
                <input value={newSessionName} onChange={e => setNewSessionName(e.target.value)} />
              </div>


              <div className="heading" style={{marginTop: 5}}>Timestamp</div>
              <div className="content">
                {new Date(selectedSession?.timestamp).toLocaleString()}
              </div>



            </div>
            <div className="new-session-popup-buttons">
              <button onClick={() => setSelectedSession(null)}>
                Close
              </button>
              <button
                className="button-danger"
                disabled={sessions ? sessions.length <= 1 : false}
                onClick={async () => {
                  await deleteSession(selectedSession.id)
                  if(currentSession === selectedSession.id && sessions) {
                    setSession(sessions[0].id);
                  }
                  setSelectedSession(null);
                }}>
                Delete
              </button>
              <button 
                disabled={newSessionName.trim() === ""}
                onClick={() => {
                setSelectedSession(null);
                updateSession(selectedSession.id, {name: newSessionName})
              }}>
                Save 
              </button>
            </div>

          </>

        }
      </Popup>
    </>
  )
}

