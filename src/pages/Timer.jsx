import TimerText from '@/components/Timer'
import TimerTable from '@/components/TimerTable'
import TimerStats from '../components/TimerStats'

import './Timer.css'

const Timer = ({ times, setTimes }) => {
	return (
		<main>
			<TimerText setTimes={setTimes} />
			<TimerTable times={times} />
			<TimerStats times={times} />
		</main>
	)
}

export default Timer;
