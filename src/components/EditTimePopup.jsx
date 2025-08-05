import { useContext, useEffect, useState } from "react";
import { TimesContext } from "../App";
import { Button, Modal, ToggleButtonGroup, ToggleButton, ButtonGroup } from "react-bootstrap";
import { timeToString } from "../utils/helpers";

const EditTimePopup = ({ timeInfo, show, handleClose }) => {
	const timeContext = useContext(TimesContext);
	const [value, setValue] = useState(null);
	const handleClick = (val) => {
		if (val === value) {
			setValue(null);
		} else {
			setValue(val);
		}
	};

	const getDate = () => {
		if (timeInfo.time) {
			const date = new Date(timeInfo.time.timestamp);
			return date.toDateString();
		} else {
			return "";
		}
	}

	const getTime = () => {
		if (timeInfo.time) {
			const date = new Date(timeInfo.time.timestamp);
			return date.toTimeString().split(" ")[0];
		} else {
			return "";
		}
	}

	return (
		<Modal show={show} centered onHide={handleClose}>
			<Modal.Header closeButton>
				<h1 className="modal-title fs-5">Solve No. {timeInfo.index}</h1>
			</Modal.Header>

			<Modal.Body className="d-flex align-items-center">
				<div className="flex-grow-1">
					<h1 className="time-heading text-start">{timeToString(timeInfo.time)}</h1>
					<p className="modifiers-text text-warning"></p>
				</div>
				<ButtonGroup>
					<ToggleButton className="me-1" variant="outline-primary"
						type="checkbox"
						checked={value == 1}
						onClick={() => { handleClick(1) }}>
						+2
					</ToggleButton>
					<ToggleButton variant="outline-primary"
						type="checkbox"
						checked={value == 2}
						onClick={() => { handleClick(2) }}>
						dnf
					</ToggleButton>
				</ButtonGroup>
			</Modal.Body>

			<Modal.Footer className="d-flex">
				<div className="flex-grow-1">
					<p className="date-text fs-7">{getDate()}</p>
					<p className="time-text fs-7">{getTime()}</p>
				</div>
				<button type="button" className="btn btn-outline-danger">Delete</button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditTimePopup;
