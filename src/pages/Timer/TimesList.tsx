import type { TimeType } from "@/types";
import { formatMilliseconds } from "@/utils/time";
import { useLayoutEffect, useRef, useState } from "react";

export default function TimesList({ times } : { times?: TimeType[]}) {

  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const element = scrollRef.current;
      if (element) {
        const hasOverflow = element.scrollHeight > element.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

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
