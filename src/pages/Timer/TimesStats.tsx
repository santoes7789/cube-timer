import type { Time } from "@/db/times";
import { getAoX, getBestTime } from "@/utils/time";
import { formatMilliseconds } from "@/utils/time";
import { useMemo } from "react";

function TimesStats({ times } : {times?: Time[]}) {

  const ao5 = useMemo(() => {
    if (!times) return null;
    return getAoX(times, 5)
  }, [times]);

  const ao12 = useMemo(() => {
    if (!times) return null;
    return getAoX(times, 12)
  }, [times]);

  const best = useMemo(() => {
    if (!times) return null;
    return getBestTime(times)?.time
  }, [times]);

  if(!times) return;

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
