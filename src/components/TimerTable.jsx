import { timeToString } from "@/utils/helpers"
import { useContext, useState } from "react"

import { TimesContext } from "@/App"
import EditTimePopup from "./EditTimePopup"

const TimerTable = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [selectedTime, setSelectedTime] = useState({});
	const timeContext = useContext(TimesContext)

	const handlePopupClose = () => setShowPopup(false);
	const handlePopupOpen = () => setShowPopup(true);

	return (
		<>
			<EditTimePopup
				timeInfo={selectedTime}
				show={showPopup}
				handleClose={handlePopupClose}
				handleOpen={handlePopupOpen}
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
