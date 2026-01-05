import type { Timetype } from "@/types";
import { getAoX } from "@/utils/helpers";
import { formatMilliseconds } from "@/utils/time";
import { useMemo } from "react";

function TimesStats({ times } : {times?: Timetype[]}) {
  if(!times) return;
  const ao5 = useMemo(() => getAoX(times, 5), [times]);
  return (
    <div className="popout-container">
      {ao5 && formatMilliseconds(ao5)}
    </div>
  )
}

export default TimesStats;
