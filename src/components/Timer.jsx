import { formatMilliseconds } from "@/utils/helpers";
import { TimerStates } from "@/pages/Timer";
import { useState } from "react";
import { useEffect } from "react";

const Timer = ({ time, timerState }) => {
	const [showCircle, setShowCircle] = useState(false);

	useEffect(() => {
		if (timerState == TimerStates.STOPPED) {
			setShowCircle(true);
		}
		else if (timerState == TimerStates.READY) {
			setShowCircle(false);
		}
	}, [timerState])

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
			<div className={`position-fixed vw-100 vh-100 top-0 start-0 bg-body background-timer z-1 
				${timerState == TimerStates.READY || timerState == TimerStates.RUNNING ? "show" : ""}`}></div>
			<div className="position-fixed translate-middle">
				{showCircle && <div className="z-2 circle"></div >}
			</div>
			<h1 className={`position-fixed z-3 top-50 start-50 translate-middle ${getTimerClasses()}`} id="timer">{formatMilliseconds(time)}</h1 >
		</>
	)
}

export default Timer;
