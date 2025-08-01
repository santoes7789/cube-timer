const TimerStats = ({ times }) => {
	return (
		<div className='container stats'>
			<div className='stats-headings'>
				<p>Best:</p>
				<p>Mean:</p>
				<p>Ao5:</p>
				<p>Ao12:</p>
			</div>
			<div className='stats-values'>
				<p>--</p>
				<p>--</p>
				<p>--</p>
				<p>--</p>
			</div>
		</div>
	)
}

export default TimerStats;
