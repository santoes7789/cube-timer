import { formatMilliseconds } from "@/utils/helpers";
import { TimerStates } from "@/pages/Timer";

const Timer = ({ time, timerState }) => {

	const getTimerClasses = () => {
		switch (timerState) {
			case TimerStates.IDLE: return "";
			case TimerStates.WAITING: return "text-danger";
			case TimerStates.READY: return "text-success";
			case TimerStates.RUNNING: return "";
			case TimerStates.STOPPED: return "";
		}
	}

	return (
		<h1 className={getTimerClasses()} id="timer">{formatMilliseconds(time)}</h1>
	)
}

export default Timer;
