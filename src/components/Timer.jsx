import { formatMilliseconds } from "@/utils/helpers";
import { TimerStates } from "@/pages/TimerPage";
import { useState } from "react";
import { useEffect } from "react";

const Timer = ({ time, setTime, timerState, onAnimationEnd }) => {
	const [showCircle, setShowCircle] = useState(false);
	const [classes, setClasses] = useState("");

	useEffect(() => {

		switch (timerState) {
			case TimerStates.IDLE:
				setClasses("");
				break;
			case TimerStates.WAITING:
				setClasses("text-danger");
				break;
			case TimerStates.READY:
				setTime(0);
				setClasses("focused text-success");
				// setShowCircle(false);
				break;
			case TimerStates.RUNNING:
				setClasses("focused");
				break;
			case TimerStates.STOPPED:
				setClasses("");
				// setShowCircle(true);
				break;
		}
	}, [timerState])

	return (
		<>
			<div className={`position-fixed vw-100 vh-100 top-0 start-0 bg-body background-timer z-1 
				${timerState == TimerStates.READY || timerState == TimerStates.RUNNING ? "show" : ""}`}>
			</div>

			<div className="position-fixed top-50 start-50 translate-middle z-3">
				{showCircle && <div className="z-2 circle"></div >}
			</div>
			<div className="position-fixed top-50 start-50  translate-middle z-3">
				<h1 className={classes} id="timer" onTransitionEnd={onAnimationEnd}>{formatMilliseconds(time)}</h1 >
			</div>
		</>
	)
}

export default Timer;
