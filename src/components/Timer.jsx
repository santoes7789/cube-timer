import { formatMilliseconds } from "@/utils/helpers";
import { TimerStates } from "@/pages/TimerPage";
import { useState } from "react";
import { useEffect } from "react";
import TimerModButtons from '@/components/TimerModButtons'
import { useTimes } from "@/App";
import { timeToString } from "../utils/helpers";

const Timer = ({ time, setTime, timerState, onAnimationEnd }) => {
	const [showCircle, setShowCircle] = useState(false);
	const [classes, setClasses] = useState("");
	const [timerText, setTimerText] = useState(formatMilliseconds(time));
	const timesContext = useTimes();

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

	useEffect(() => {
		setTimerText(formatMilliseconds(time));
	}, [time])

	useEffect(() => {
		if (timerState == TimerStates.IDLE && timesContext.currentTime) {
			if (timesContext.currentTime.modifier == "dnf") {
				setClasses("strike");
			} else {
				setClasses("");
			}
			setTimerText(timeToString(timesContext.currentTime));
		}
	}, [timesContext.currentTime])

	// const timerText = () => {
	// 	// IF not running, display the current time 
	// 	if (timerState == TimerStates.IDLE && timesContext.currentTime) {
	// 		return timeToString(timesContext.currentTime);
	// 	}
	// 	return formatMilliseconds(time);
	// }
	//
	const formatText = () => {
		return (
			<>
				{timerText.split("").map((char, index) => {
					if (char >= '0' && char <= '9') {
						return char;
					} else {
						return <span className="text-primary" key={index}>{char}</span>
					}
				})}
			</>
		)
	}

	return (
		<>
			<div className={`position-fixed vw-100 vh-100 top-0 start-0 bg-body background-timer z-1 
				${timerState == TimerStates.READY || timerState == TimerStates.RUNNING ? "show" : ""}`}>
			</div>

			{showCircle &&
				<div className="position-fixed top-50 start-50 translate-middle z-3">
					<div className="z-2 circle"></div >
				</div>
			}
			<div className="position-fixed top-50 start-50  translate-middle z-3">
				<h1 className={classes} id="timer" onTransitionEnd={onAnimationEnd}>{formatText()}</h1 >
			</div>
			{timesContext.currentTime &&
				<div className="position-fixed top-50 start-50 translate-middle timer-mod-buttons">
					<TimerModButtons />
				</div>}
		</>
	)
}

export default Timer;
