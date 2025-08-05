import { TimesContext } from "@/App";
import { useContext, useState } from "react";

import TrashIcon from '@/assets/icons/trash.svg?react';
import EditIcon from '@/assets/icons/pencil-square.svg?react';
import EditSessionPopup from "@/components/EditSessionPopup";
import { Button, ButtonGroup, Dropdown, Form, InputGroup } from 'react-bootstrap';

const SessionDisplay = () => {
	const [newSessionName, setNewSessionName] = useState("");
	const [selectedSession, setSelectedSession] = useState({});
	const [showPopup, setShowPopup] = useState(false);
	const timeContext = useContext(TimesContext);

	const handlePopupClose = () => setShowPopup(false);
	const handlePopupOpen = () => setShowPopup(true);
	return (
		<>
			<EditSessionPopup session={selectedSession} show={showPopup} handleClose={handlePopupClose} handleOpen={handlePopupOpen} />
			<div className="position-fixed bottom-0 start-50 translate-middle-x my-4 d-flex justify-content-center">
				<div className="border-bottom border-primary-subtle p-4">
					<Dropdown drop="up">
						<p className="d-inline"> &nbsp;Session: &nbsp;</p>
						<Dropdown.Toggle as="strong" role="button" className="text-primary">
							{timeContext.sessionList[timeContext.session]}
						</Dropdown.Toggle>
						<Dropdown.Menu className="session-dropdown">
							<InputGroup className="px-1">
								<Form.Control id="newSessionInput" placeholder="New Session" onChange={e => setNewSessionName(e.target.value)} value={newSessionName} />
								<Button variant="outline-primary"
									onClick={() => {
										timeContext.addSession(newSessionName);
										setNewSessionName("");
									}} > + </Button>
							</InputGroup>
							<Dropdown.Divider />
							{Object.entries(timeContext.sessionList).map(([k, v]) => (
								<Dropdown.Item as="button" key={k} className="p-0" href="">
									<div className="d-flex align-items-stretch ">
										<div className="flex-grow-1 d-flex align-items-center align-middle rounded me-1"
											onClick={() => { timeContext.setSession(k); }}>
											<p className="ps-4">{v}</p>
										</div>

										<ButtonGroup>
											<Button variant="outline-secondary" className="border-0" size="sm"
												onClick={() => {
													setSelectedSession({ id: k, value: v })
													handlePopupOpen()
												}} >
												<EditIcon />
											</Button>
											<Button variant="outline-danger" className="border-0" size="sm"
												onClick={() => {
													timeContext.deleteSession(k);
													setNewSessionName("")
												}} >
												<TrashIcon />
											</Button>
										</ButtonGroup>
									</div>
								</Dropdown.Item>
							))
							}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		</>
	)

}
export default SessionDisplay;

