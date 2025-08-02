import { formatMilliseconds } from "@/utils/helpers";
import { TimerStates } from "@/pages/Timer";

const Timer = ({ text, timerState }) => {

	const getTimerClasses = () => {
		switch (timerState) {
			case TimerStates.IDLE: return "timer";
			case TimerStates.WAITING: return "timer waiting";
			case TimerStates.READY: return "timer ready";
			case TimerStates.RUNNING: return "timer running";
			case TimerStates.STOPPED: return "timer stopped";
		}
	}

	return (
		<h1 className={getTimerClasses()}>{formatMilliseconds(text)}</h1>
	)
}

export default Timer;
