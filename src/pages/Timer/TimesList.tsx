import type { Timetype } from "@/types";
import { formatMilliseconds } from "@/utils/time";
import { useRef } from "react";

export default function TimesList({ times } : { times?: Timetype[]}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if(!times || times.length === 0) return;
  return (
    <>
      <div className="times-list-container popout-container">
        <div className="times-list-inner-container">
          <div ref={scrollRef} className="times-list-scroll-container">
            <div className="times-list-element-container">
              {[...times].reverse().map((t) => (
                <div className="times-list-element" key={t.time}>
                  {formatMilliseconds(t.time)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
