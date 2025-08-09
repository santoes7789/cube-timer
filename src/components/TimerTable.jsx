import { timeToString } from "@/utils/helpers"
import { useState } from "react"

import EditTimePopup from "./EditTimePopup"
import { useTimes } from "@/App"

const TimerTable = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [selectedTime, setSelectedTime] = useState({});
	const timeContext = useTimes();

	const handlePopupClose = () => setShowPopup(false);
	const handlePopupOpen = () => setShowPopup(true);

	return (
		<>
			<EditTimePopup
				timeInfo={selectedTime}
				show={showPopup}
				handleClose={handlePopupClose}
			/>
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
									role="button"
									onClick={() => {
										setSelectedTime({ time: time, index: timeContext.times.length - index, session: timeContext.session })
										handlePopupOpen()
									}} >
									<td>{timeContext.times.length - index}</td>
									<td>{time.modifier == "dnf" ? "DNF" : timeToString(time)}</td>
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
