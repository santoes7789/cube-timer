import { CustomDropdown } from "@/components/CustomDropdown";
import Popup from "@/components/Popup";
import { useDB } from "@/contexts/DBContext";
import { Session } from "@/db/session";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function SessionDisplay() {
  const [newNamePopup, setNewNamePopup] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [newSessionName, setNewSessionName] = useState("");

  const { sessions, currentSession, setCurrentSession, addSession, deleteSession, updateSession } =
    useDB();

  const currentSessionName = sessions?.find((s) => s.uuid === currentSession)?.name;
  function closePopup() {
    setNewNamePopup(false);
  }
  return (
    <>
      <div className="session-display-container popout-container">
        <div style={{ display: "inline", marginRight: 10 }}> Session: </div>
        <CustomDropdown
          value={currentSessionName}
          onClick={(id) => {
            if (id == "new") {
              setNewSessionName("");
              setNewNamePopup(true);
            } else {
              setCurrentSession(id);
            }
          }}
          onRightClick={(id) => {
            const session = sessions?.find((s) => s.uuid === id);
            setSelectedSession(session ?? null);
            setNewSessionName(session?.name ?? "");
          }}
          options={
            sessions
              ? [
                  ...sessions.map((t) => ({ value: t.uuid, label: t.name })),
                  { value: "/divider/", label: "/divider/" },
                  { value: "new", label: "New Session" },
                ]
              : []
          }
        />
      </div>
      <Popup show={newNamePopup} onClose={closePopup}>
        New session name:
        <input
          autoFocus
          value={newSessionName}
          onChange={(e) => setNewSessionName(e.target.value)}
        />
        <div className="new-session-popup-buttons">
          <button onClick={closePopup}>Cancel</button>
          <button
            disabled={newSessionName.trim() === ""}
            onClick={() => {
              addSession(newSessionName);
              closePopup();
            }}>
            YES!
          </button>
        </div>
      </Popup>

      <Popup show={selectedSession !== null} onClose={() => setSelectedSession(null)}>
        {selectedSession && (
          <>
            <div className="session-popup-content">
              <div className="heading">Session name:</div>
              <div className="content">
                <input value={newSessionName} onChange={(e) => setNewSessionName(e.target.value)} />
              </div>
            </div>
            <div className="new-session-popup-buttons">
              <button
                className="button-danger"
                disabled={sessions ? sessions.length <= 1 : false}
                onClick={() => {
                  deleteSession(selectedSession.uuid);
                  if (currentSession === selectedSession.uuid && sessions) {
                    setCurrentSession(sessions[0].uuid);
                  }
                  setSelectedSession(null);
                }}>
                Delete
              </button>
              <button
                disabled={newSessionName.trim() === ""}
                onClick={() => {
                  setSelectedSession(null);
                  updateSession(selectedSession.id, { name: newSessionName });
                }}>
                Save
              </button>
            </div>
          </>
        )}
      </Popup>
    </>
  );
}
