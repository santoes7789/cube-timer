import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '@/components/TimerStats'
import Scramble, { generateNewScramble } from '@/components/Scramble'

import './Timer.css'
import { useEffect, useState } from 'react'

const Timer = () => {
	const [scramble, setScramble] = useState("Generating Scramble...")
	useEffect(() => {
		generateNewScramble(setScramble);
	}, [])

	return (
		<main>
			<Scramble scramble={scramble} />
			<TimerText />
			<TimerTable />
			<TimerStats />
		</main>
	)
}

export default Timer;
