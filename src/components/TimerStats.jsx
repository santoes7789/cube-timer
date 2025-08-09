import { getBestTime, timeToString, formatMilliseconds, getAoX, getMean } from "@/utils/helpers";
import { useTimes } from "@/App";

const TimerStats = () => {
	const timeContext = useTimes();

	return (
		<div>
			<div className="d-inline-block text-end">
				<p>Best:</p>
				<p>Mean:</p>
				<p>Ao5:</p>
				<p>Ao12:</p>
			</div>
			<div className='d-inline-block text-start ms-3'>
				<p><strong>{timeToString(getBestTime(timeContext.times))}</strong></p>
				<p><strong>{formatMilliseconds(getMean(timeContext.times))}</strong></p>
				<p><strong>{formatMilliseconds(getAoX(timeContext.times, 5))}</strong></p>
				<p><strong>{formatMilliseconds(getAoX(timeContext.times, 12))}</strong></p>
			</div>
		</div>
	)
}

export default TimerStats;
