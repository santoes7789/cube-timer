import Divider from "@/components/Divider";
import { FormattedTime } from "@/components/FormattedTime";
import { MultiButton } from "@/components/MultiButton";
import Popup from "@/components/Popup";
import { useDB } from "@/contexts/DBContext";
import db from "@/db/db";
import { Time } from "@/db/times";
import { formatMilliseconds } from "@/utils/time";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef, useState } from "react";
import { applyScramble, DisplayCube } from "react-rubiks-cube-utils";

export default function TimesList() {

  // variables to control the popup's inputs 
  const [comment, setComment] = useState("");
  const [modifierIdx, setModifierIdx] = useState(-1);

  // selected id for popup
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);


  // get the selected time from the databse using id
  const selectedTime = useLiveQuery(async () => {
    if (selectedTimeId === null) {
      setComment("");
      setModifierIdx(-1);
      return undefined;
    }

    const time = await db.times.get(selectedTimeId);

    // sets the default values for the popup
    setComment(time?.comment ?? "");
    if (time?.modifier == "dnf") {
      setModifierIdx(0);
    } else if (time?.modifier == "+2") {
      setModifierIdx(1);
    } else {
      setModifierIdx(-1);
    }
    return time;
  }, [selectedTimeId]) ?? null;



  // cube for the scramble preview on the popup
  const myCube = selectedTime?.scramble ? applyScramble({ type: '3x3', scramble: selectedTime.scramble }) : null

  const { times, deleteTime, updateTime } = useDB();


  // update changes onto the db
  function saveChanges() {
    if (selectedTimeId === null) return;
    let modifier = "";

    if (modifierIdx === 0) {
      modifier = "dnf";
    } else if (modifierIdx === 1) {
      modifier = "+2";
    }
    updateTime(selectedTimeId, { comment, modifier });
  }

  useEffect(saveChanges, [modifierIdx]); // If modifer change is applied, have it change immediately

  if (!times || times.length === 0) return;

  return (
    <>
      <div className="times-list-container popout-container bottom-right">
        <div className="times-list-inner-container">
          <div className="times-list-scroll-container">
            <div className="times-list-element-container">
              {[...times].reverse().map((t) => (
                <div className="times-list-element" key={t.id} onClick={() => setSelectedTimeId(t.id)}>
                  <FormattedTime time={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      <Popup show={selectedTime !== null} onClose={() => {
        saveChanges();
        setSelectedTimeId(null);
      }}>
        {selectedTime !== null &&
          <>
            <h1>
              <FormattedTime time={selectedTime} />
            </h1>

            <Divider />

            <div className="times-popup-content">
              <div className="row">
                <div>
                  <div className="heading">Scramble</div>
                  <div className="content" style={{ maxWidth: 250, marginRight: 15 }}>
                    {selectedTime.scramble}
                  </div>
                </div>

                {myCube &&
                  <div>
                    <DisplayCube cube={myCube} size={8} />
                  </div>
                }
              </div>

              <div style={{ display: "flex", flexDirection: "row", gap: "70px" }}>
                <div>
                  <div className="heading">Timestamp:</div>
                  <div className="content">
                    {new Date(selectedTime.timestamp).toLocaleString()}
                  </div>
                </div>


                <div>
                  <div className="heading">Modifiers:</div>
                  <div className="content">
                    <MultiButton texts={["DNF", "+2"]} selected={modifierIdx} onChange={(idx) => {
                      if (modifierIdx === idx) {
                        setModifierIdx(-1);
                      } else {
                        setModifierIdx(idx);
                      }
                    }} />
                  </div>
                </div>
              </div>

              <div>
                <div className="heading">Comments:</div>
                <div className="content">
                  <input type="text" value={comment} placeholder="no comments" onChange={(e) => setComment(e.target.value)} />
                </div>
              </div>


            </div>

            <div className="times-popup-buttons">
              <button onClick={() => {
                saveChanges();
                setSelectedTimeId(null);
              }}>close</button>
              <button className="button-danger" onClick={() => {
                deleteTime(selectedTime.id);
                setSelectedTimeId(null);
              }}>delete</button>
            </div>
          </>}
      </Popup>
    </>
  );
}
