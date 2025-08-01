import { timeToString } from "@/utils/helpers"
import { useContext } from "react"

import { TimesContext } from "@/App"

const TimerTable = () => {
	const timeContext = useContext(TimesContext)
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
						{[...timeContext.times].reverse().map((time, index) => (
							<tr key={time.timestamp}>
								<td>{timeContext.times.length - index}</td>
								<td>{timeToString(time)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TimerTable
