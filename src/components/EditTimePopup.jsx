import { useContext, useEffect, useState } from "react";
import { TimesContext } from "../App";

const EditTimePopup = ({ time }) => {
	const timeContext = useContext(TimesContext);
	return (
		<div className="modal fade" id="editTimePopup" tabIndex="-1">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">Solve No. {5}</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body d-flex align-items-center">
						<div className="flex-grow-1">
							<h1 className="time-heading text-start">1.00</h1>
							<p className="modifiers-text text-warning"></p>
						</div>
						<button type="button" className="btn btn-primary me-2 plus-2">+2</button>
						<button type="button" className="btn btn-primary dnf">DNF</button>
					</div>
					<div className="modal-footer d-flex">
						<div className="flex-grow-1">
							<p className="date-text fs-7"></p>
							<p className="time-text fs-7"></p>
						</div>
						<button type="button" className="btn btn-outline-danger" id="delete-time-btn" data-bs-dismiss="modal">Delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditTimePopup;
