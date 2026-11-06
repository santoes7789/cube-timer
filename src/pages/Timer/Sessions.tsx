import { useDB } from "@/contexts/DBContext";
import styles from "./Timer.module.css";
import Popup from "@/components/Popup";
import { useRef, useState } from "react";

function Sessions() {
  const [addSessionPopup, setAddSessionPopup] = useState(false);
  const db = useDB();
  const inputRef = useRef(null);
  return (
    <div>
      <div>
        Current session:
        <select value={db.currentSession ?? undefined} onChange={(e) => db.setCurrentSession(e.target.value)}>
          {db.sessions.map((sess) => (
            <option value={sess.uuid} key={sess.uuid}>
              {sess.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <a onClick={() => setAddSessionPopup(true)}>Add session</a>
      </div>
      {/*<div>
        <a className={styles.deleteSession} data-status={db.sessions.length <= 1 ? "disabled" : ""}>Delete session</a>
      </div>*/}

      <Popup show={addSessionPopup} setShow={setAddSessionPopup}>
        <div>
          <p>
            New session name:
          </p>
          <input ref={inputRef}/>
          <div className="row-container">
            <a>cancel</a>
            <a onClick={() => {
              db.addSession(inputRef.current.value);
              setAddSessionPopup(false);
            }}>create</a>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default Sessions;
