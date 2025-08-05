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
		<>
			<div className={`position-fixed vw-100 vh-100 top-0 start-0 bg-body background-timer z-2 
				${timerState == TimerStates.READY || timerState == TimerStates.RUNNING ? "show" : ""}`}></div>
			<h1 className={`position-fixed z-3 top-50 start-50 translate-middle ${getTimerClasses()}`} id="timer">{formatMilliseconds(time)}</h1 >
		</>
	)
}

export default Timer;
