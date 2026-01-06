import type { Timetype } from "@/types";
import { getAoX, getBestTime } from "@/utils/time";
import { formatMilliseconds } from "@/utils/time";
import { useMemo } from "react";

function TimesStats({ times } : {times?: Timetype[]}) {
  if(!times) return;
  const ao5 = useMemo(() => getAoX(times, 5), [times]);
  const ao12 = useMemo(() => getAoX(times, 12), [times]);
  const best = useMemo(() => getBestTime(times)?.time, [times]);
  return (
    <div className="times-stats popout-container bottom-left">
      <div className="times-stats-row">
        <div>
          Best:  
        </div>
        <div>
          {best ? formatMilliseconds(best) : "--"}
        </div>
      </div>
      <div className="times-stats-row">
        <div>
          Ao5:
        </div>
        <div>
          {ao5 ? formatMilliseconds(ao5) : "--"} 
        </div>
      </div>
      <div className="times-stats-row">
        <div>
          Ao12:
        </div>
        <div>
          {ao12 ? formatMilliseconds(ao12) : "--"}
        </div>
      </div>
    </div>
  )
}

export default TimesStats;
