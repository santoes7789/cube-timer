const TimerTable = ({ times }) => {
	return (
		<div className='container table'>
			<div className='table-wrapper'>
				<table className='timer-table'>
					<thead>
						<tr>
							<th># &nbsp;</th>
							<th>time</th>
						</tr>
					</thead>
					<tbody>
						{times.map((time, index) => (
							<tr key={time['timestamp']}>
								<td>{index}</td>
								<td>{time['value']}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TimerTable
