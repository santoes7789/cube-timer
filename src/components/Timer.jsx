import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatMilliseconds } from "@/utils/helpers";
import { TimesContext } from "../App";

const waitTime = 500;
const updateTimeInterval = 10;

const TimerStates = {
	IDLE: "idle",
	WAITING: "waiting",
	READY: "ready",
	RUNNING: "running",
	STOPPED: "stopped",
}


const Timer = () => {

	const timesContext = useContext(TimesContext);

	const [timerState, setTimerState] = useState(TimerStates.IDLE);
	const [time, setTime] = useState(0);

	const timeoutRef = useRef(null);
	const updateTimerRef = useRef(null);
	const startTime = useRef(null)

	const handleKeyDown = useCallback((event) => {
		if (timerState == TimerStates.IDLE) {
			if (event.code == "Space") {
				setTimerState(TimerStates.WAITING);
				timeoutRef.current = setTimeout(
					() => setTimerState(TimerStates.READY), waitTime);
			}

		} else if (timerState == TimerStates.RUNNING) {
			clearInterval(updateTimerRef.current);

			const time = Date.now() - startTime.current;
			setTime(time);
			timesContext.addTime(time);
			setTimerState(TimerStates.STOPPED);
		}
	}, [timerState])

	const handleKeyUp = useCallback((event) => {
		if (timerState == TimerStates.READY && event.code == "Space") {
			setTimerState(TimerStates.RUNNING);
			startTime.current = Date.now();
			updateTimerRef.current = setInterval(() => {
				setTime(Date.now() - startTime.current)
			}, updateTimeInterval)

		} else if (timerState == TimerStates.WAITING) {
			setTimerState(TimerStates.IDLE);
			clearTimeout(timeoutRef.current);

		} else if (timerState == TimerStates.STOPPED) {
			setTimerState(TimerStates.IDLE);
		}
	}, [timerState])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown)
		document.addEventListener("keyup", handleKeyUp)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("keyup", handleKeyUp)
		}
	}, [handleKeyDown, handleKeyUp])


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
		<main>
			<h1
				className={getTimerClasses()}>{formatMilliseconds(time)}</h1>
		</main>
	)
}

export default Timer;
