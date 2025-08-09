import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '@/components/TimerStats'
import Scramble from '@/components/Scramble'

import SessionDisplay from '@/components/SessionDisplay';


import { useEffect, useState, useCallback, useRef, useContext } from 'react'

import { Scrambow } from 'scrambow';
import { useSettings } from '@/context/SettingsContext';
import { Link } from 'react-router-dom';
import { useTimes } from '@/App';

export const TimerStates = {
	IDLE: "idle",
	WAITING: "waiting",
	READY: "ready",
	RUNNING: "running",
	STOPPED: "stopped",
}

const TimerPage = () => {
	const [scramble, setScramble] = useState("Generating Scramble...")
	const [timerState, setTimerState] = useState(TimerStates.IDLE);
	const [time, setTime] = useState(0);

	const timeoutRef = useRef(null);
	const updateTimerRef = useRef(null);
	const startTime = useRef(null)

	const scramb = useRef(new Scrambow());

	const timesContext = useTimes();
	const settingsContext = useSettings();

	const generateNewScramble = () => {
		setScramble(scramb.current.get()[0].scramble_string);
	}


	const handleKeyDown = useCallback((event) => {
		if (timerState == TimerStates.IDLE) {
			if (event.code == "Space") {
				setTimerState(TimerStates.WAITING);
				timeoutRef.current = setTimeout(
					() => setTimerState(TimerStates.READY), settingsContext.timerSettings.waitTime);
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
			}, settingsContext.timerSettings.updateInterval)

		} else if (timerState == TimerStates.WAITING) {
			setTimerState(TimerStates.IDLE);
			clearTimeout(timeoutRef.current);

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

	useEffect(() => {
		generateNewScramble();
		document.title = "Timer"
	}, []);

	return (
		<main>
			<div className="position-fixed top-0 start-0 m-4 p-4 border-top border-start border-primary-subtle ">
				<Link to="/" className='border-0 rounded-circle hoverColor' href='settings'>
					CubeTimer
				</Link>
			</div>
			{settingsContext.layoutSettings.scramble &&
				<div className="d-flex justify-content-center w-100 p-4">
					<Scramble scramble={scramble} />
				</div>
			}

			<TimerText time={time} setTime={setTime} onAnimationEnd={() => setTimerState(TimerStates.IDLE)} timerState={timerState} />
			{settingsContext.layoutSettings.table &&
				<TimerTable />}
			{settingsContext.layoutSettings.stats &&
				<TimerStats />}
			<div className="position-fixed bottom-0 start-50 translate-middle-x my-4 ">
				<div className="border-bottom border-primary-subtle p-4">
					<SessionDisplay />
				</div>
			</div>
		</main>
	)
}

export default TimerPage;
