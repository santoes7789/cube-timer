import { useContext, useEffect, useState } from "react";
import { TimesContext } from "../App";
import { Button, Form, Modal } from "react-bootstrap";

const EditSessionPopup = ({ session, show, handleClose, handleOpen }) => {
	const timeContext = useContext(TimesContext);
	const [newSessionName, setSessionName] = useState("");
	useEffect(() => {
		setSessionName(session.value || "");
	}, [session])

	return (
		<Modal show={show} centered onHide={handleClose}>
			<Modal.Header closeButton>
				<h1 className="modal-title fs-5">Edit session</h1>
			</Modal.Header>

			<Modal.Body>
				<p className="text-start pb-2 px-1">
					Input a new session name for&nbsp;
					<strong>{session.value}</strong>: </p>
				<Form.Control
					id="newSessionNameInput"
					placeholder="Enter new session name"
					onChange={e => setSessionName(e.target.value)}
					value={newSessionName}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose} >Cancel</Button>
				<Button
					onClick={() => {
						timeContext.editSession(session.id, newSessionName)
						handleClose();
					}}
				>Save changes</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditSessionPopup;
