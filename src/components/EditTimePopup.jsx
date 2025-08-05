import { useContext, useEffect, useState } from "react";
import { TimesContext } from "../App";
import { Button, Modal, ToggleButtonGroup, ToggleButton, ButtonGroup } from "react-bootstrap";
import { timeToString } from "../utils/helpers";

const EditTimePopup = ({ timeInfo, show, handleClose }) => {
	const timeContext = useContext(TimesContext);
	const [value, setValue] = useState(null);

	useEffect(() => {
		if (timeInfo.time) setValue(timeInfo.time.modifier)
	}, [show])

	const handleClick = (val) => {
		if (val === value) {
			setValue(null);
			timeContext.modifyTime({ ...timeInfo.time, modifier: "" });
		} else {
			setValue(val);
			timeContext.modifyTime({ ...timeInfo.time, modifier: val });
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

	const getClasses = () => {
		if (timeInfo.time) {
			if (timeInfo.time.modifier == "dnf") return "strike"
		}
		return "";
	}

	return (
		<Modal show={show} centered onHide={handleClose}>
			<Modal.Header closeButton>
				<div>
					<h1 className="modal-title fs-5">Solve No. {timeInfo.index}</h1>
					<p className="date-text fs-7">Session: <strong>{timeContext.sessionList[timeInfo.session]}</strong></p>
				</div>
			</Modal.Header>

			<Modal.Body className="d-flex align-items-center">
				<div className="flex-grow-1">
					<h1 className={`time-heading text-start ${getClasses()}`}>{timeToString(timeInfo.time)}</h1>
					<p className="modifiers-text text-warning"></p>
				</div>
				<ButtonGroup>
					<ToggleButton className="me-1" variant="outline-primary"
						type="checkbox"
						checked={value == "+2"}
						onClick={() => { handleClick("+2") }}>
						+2
					</ToggleButton>
					<ToggleButton variant="outline-primary"
						type="checkbox"
						checked={value == "dnf"}
						onClick={() => { handleClick("dnf") }}>
						dnf
					</ToggleButton>
				</ButtonGroup>
			</Modal.Body>

			<Modal.Footer className="d-flex">
				<div className="flex-grow-1">
					<p className="date-text fs-7">{getDate()}</p>
					<p className="time-text fs-7">{getTime()}</p>
				</div>
				<Button variant="outline-danger"
					onClick={() => {
						timeContext.deleteTime(timeInfo.time);
						handleClose();
					}}
				>Delete</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditTimePopup;
