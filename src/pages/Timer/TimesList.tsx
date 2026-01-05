import Divider from "@/components/Divider";
import Popup from "@/components/Popup";
import { deleteTime } from "@/db/times";
import type { Timetype } from "@/types";
import { formatMilliseconds } from "@/utils/time";
import { useRef, useState } from "react";

export default function TimesList({ times } : { times?: Timetype[]}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTime, setSelectedTime] = useState<Timetype | null>(null);

  if(!times || times.length === 0) return;
  return (
    <>
      <div className="times-list-container popout-container">
        <div className="times-list-inner-container">
          <div ref={scrollRef} className="times-list-scroll-container">
            <div className="times-list-element-container">
              {[...times].reverse().map((t) => (
                <div className="times-list-element" key={t.id} onClick={() => setSelectedTime(t)}>
                  {formatMilliseconds(t.time)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Popup show={selectedTime !== null} onClose={() => setSelectedTime(null)}>
        {selectedTime !== null && 
          <>
            <h1>
              {formatMilliseconds(selectedTime?.time)}
            </h1>

            <Divider/>

            <div className="times-popup-content">
              <div className="heading">Timestamp:</div>
              <div className="content">
                {new Date(selectedTime.timestamp).toLocaleString()}
              </div>

              {selectedTime.comment !== "" &&
                <>
                  <div className="heading">Comments:</div>
                  <div className="content">
                    {selectedTime.comment}
                  </div>
                </>
              }
            </div>

            <div className="times-popup-buttons">
              <button onClick={() => setSelectedTime(null)}>close</button>
              <button className="button-danger" onClick={() => {
                deleteTime(selectedTime.id);
                setSelectedTime(null);
              }}>delete</button>
            </div>
          </>}
      </Popup>
    </>
  );
}
