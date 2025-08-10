
import { Button, ButtonGroup, Dropdown, Form, InputGroup } from 'react-bootstrap';

import TrashIcon from '@/assets/icons/trash.svg?react';
import EditIcon from '@/assets/icons/pencil-square.svg?react';
import EditSessionPopup from "@/components/EditSessionPopup";
import { useState } from 'react';
import { useTimes } from '@/App';

const SessionDisplay = ({ dropDirection = "up", addButton = true }) => {
	const timeContext = useTimes();
	const [newSessionName, setNewSessionName] = useState("");
	const [selectedSession, setSelectedSession] = useState({});
	const [showPopup, setShowPopup] = useState(false);

	const handlePopupClose = () => setShowPopup(false);
	const handlePopupOpen = () => setShowPopup(true);
	return (
		<>
			<Dropdown drop={dropDirection} className="d-inline-block">
				<Dropdown.Toggle as="strong" role="button" className="text-primary">
					{timeContext.sessionList[timeContext.session]}
				</Dropdown.Toggle>

				<EditSessionPopup session={selectedSession} show={showPopup} handleClose={handlePopupClose} handleOpen={handlePopupOpen} />
				<Dropdown.Menu className="session-dropdown">
					{addButton &&
						<>
							<InputGroup className="px-1">
								<Form.Control id="newSessionInput" placeholder="New Session" onChange={e => setNewSessionName(e.target.value)} value={newSessionName} />
								<Button variant="outline-primary"
									onClick={() => {
										timeContext.addSession(newSessionName);
										setNewSessionName("");
									}} > + </Button>

							</InputGroup>
							<Dropdown.Divider />
						</>
					}
					{Object.entries(timeContext.sessionList).map(([k, v]) => (
						<Dropdown.Item as="div" role="button" key={k} className="p-0">
							<div className="d-flex align-items-stretch ">
								<div className="flex-grow-1 d-flex align-items-center align-middle rounded me-1"
									onClick={() => {
										timeContext.setSession(k);
										timeContext.setCurrentTimeIdx(null);
									}}>
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
		</>
	)

}
export default SessionDisplay;

