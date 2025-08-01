import { getBestTime, timeToString, formatMilliseconds, getAoX } from "@/utils/helpers";

const TimerStats = ({ times }) => {
	return (
		<div className='container stats'>
			<div className='stats-headings'>
				<p>Best:</p>
				<p>Mean:</p>
				<p>Ao5:</p>
				<p>Ao12:</p>
			</div>
			<div className='stats-values'>
				<p>{timeToString(getBestTime(times))}</p>
				<p>{formatMilliseconds(getAoX(times, times.length, undefined, 0))}</p>
				<p>{formatMilliseconds(getAoX(times, 5))}</p>
				<p>{formatMilliseconds(getAoX(times, 12))}</p>
			</div>
		</div>
	)
}

export default TimerStats;
