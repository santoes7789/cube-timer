import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '@/components/TimerStats'
import Scramble from '@/components/Scramble'
import { TimesContext } from "@/App";

import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useState, useCallback, useRef, useContext } from 'react'

import './Timer.css'

const waitTime = 500;
const updateTimeInterval = 10;

export const TimerStates = {
	IDLE: "idle",
	WAITING: "waiting",
	READY: "ready",
	RUNNING: "running",
	STOPPED: "stopped",
}

const Timer = () => {
	const [scramble, setScramble] = useState("Generating Scramble...")
	const [timerState, setTimerState] = useState(TimerStates.IDLE);
	const [time, setTime] = useState(0);
	const timeoutRef = useRef(null);
	const updateTimerRef = useRef(null);
	const startTime = useRef(null)
	const timesContext = useContext(TimesContext);

	const generateNewScramble = () => {
		randomScrambleForEvent("333").then(s => setScramble(s.toString()))
	}
	useEffect(generateNewScramble, []);

	const handleKeyDown = useCallback((event) => {
		if (timerState == TimerStates.IDLE) {
			if (event.code == "Space") {
				setTimerState(TimerStates.WAITING);
				timeoutRef.current = setTimeout(
					() => setTimerState(TimerStates.READY), waitTime);
			} else if (event.shiftKey && event.code == "Backspace") {
				const length = timesContext.times.length;
				if (length > 0) {
					timesContext.deleteTime(timesContext.times[length - 1]);
				}
			}

		} else if (timerState == TimerStates.RUNNING) {
			clearInterval(updateTimerRef.current);
			const time = Date.now() - startTime.current;
			setTime(time);
			timesContext.addTime(time);
			generateNewScramble();
			setTimerState(TimerStates.STOPPED);
		}
	}, [timerState, timesContext.times])

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

	return (
		<main>
			<Scramble scramble={scramble} />
			<TimerText text={time} timerState={timerState} />
			<TimerTable />
			<TimerStats />
		</main>
	)
}

export default Timer;
