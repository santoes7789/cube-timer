import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '@/components/TimerStats'
import NavButtons from '@/components/NavButtons'
import Scramble from '@/components/Scramble'
import RubiksCubeDisplay from '@/components/RubiksCubeDisplay'
import { generateScramble } from 'react-rubiks-cube-utils';

import SessionDisplay from '@/components/SessionDisplay';

import { motion } from 'framer-motion';


import { useEffect, useState, useCallback, useRef, useContext } from 'react'

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
	const [scramble, setScramble] = useState("")
	const [timerState, setTimerState] = useState(TimerStates.IDLE);
	const [time, setTime] = useState(0);

	const timeoutRef = useRef(null);
	const updateTimerRef = useRef(null);
	const startTime = useRef(null)

	const timesContext = useTimes();
	const settingsContext = useSettings();

	const generateNewScramble = () => {
		setScramble(generateScramble({ type: '3x3' }));
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
			if (settingsContext.layoutSettings.scramble) {
				timesContext.addTime(time, scramble);
			} else {
				timesContext.addTime(time);
			}
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

	useEffect(() => {
		if (timesContext.currentTime == null) {
			setTime(0);
		}
	}, [timesContext.currentTime])

	return (
		<>
			<motion.main className="position-fixed top-0"
				exit={{ opacity: 0.99 }}
			>
				<NavButtons />
				{settingsContext.layoutSettings.scrambledCube &&
					<div className="position-fixed top-0 start-0 m-4 p-4 border-top border-start border-primary ">
						<RubiksCubeDisplay scramble={scramble} />
					</div>
				}

				{settingsContext.layoutSettings.scramble &&
					<div className="d-flex justify-content-center w-100 p-4">
						<Scramble scramble={scramble} />
					</div>
				}

				<TimerText time={time} setTime={setTime} onAnimationEnd={() => setTimerState(TimerStates.IDLE)} timerState={timerState} />


				{settingsContext.layoutSettings.table &&
					<TimerTable />}

				{settingsContext.layoutSettings.stats &&
					<div className="position-fixed m-4 p-4 bottom-0 start-0 border-start border-bottom border-primary">
						<TimerStats />
					</div>
				}
				<div className="position-fixed bottom-0 start-50 translate-middle-x my-4 ">
					<div className="border-bottom border-primary p-4">
						<span className="ps-2">Session:&nbsp;</span>
						<SessionDisplay />
					</div>
				</div>
			</motion.main>
		</>
	)
}

export default TimerPage;
