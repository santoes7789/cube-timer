import { getBestTime, timeToString, formatMilliseconds, getAoX } from "@/utils/helpers";
import { useContext } from "react";
import { TimesContext } from "@/App";

const TimerStats = () => {
	const timeContext = useContext(TimesContext);

	return (
		<div className='container stats'>
			<div className='stats-headings'>
				<p>Best:</p>
				<p>Mean:</p>
				<p>Ao5:</p>
				<p>Ao12:</p>
			</div>
			<div className='stats-values'>
				<p>{timeToString(getBestTime(timeContext.times))}</p>
				<p>{formatMilliseconds(getAoX(timeContext.times, timeContext.times.length, undefined, 0))}</p>
				<p>{formatMilliseconds(getAoX(timeContext.times, 5))}</p>
				<p>{formatMilliseconds(getAoX(timeContext.times, 12))}</p>
			</div>
		</div>
	)
}

export default TimerStats;
