import { timeToString } from "@/utils/helpers"
import { useContext } from "react"

import { TimesContext } from "@/App"
import EditTimePopup from "./EditTimePopup"

const TimerTable = () => {
	const timeContext = useContext(TimesContext)
	return (
		<>
			<EditTimePopup />
			<div className='position-fixed m-4 p-4 bottom-0 end-0 border-end border-bottom border-primary-subtle'>
				<div className='table-wrapper'>
					<table className='table table-sm table-hover m-0'>
						<thead className="sticky-top">
							<tr>
								<th>#</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
							{[...timeContext.times].reverse().map((time, index) => (
								<tr key={time.timestamp}
									data-bs-toggle="modal"
									data-bs-target="#editTimePopup">
									<td>{timeContext.times.length - index}</td>
									<td>{timeToString(time)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default TimerTable;
