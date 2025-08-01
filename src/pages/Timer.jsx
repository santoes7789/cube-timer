import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '../components/TimerStats'

import './Timer.css'

const Timer = () => {
	return (
		<main>
			<TimerText />
			<TimerTable />
			<TimerStats />
		</main>
	)
}

export default Timer;
