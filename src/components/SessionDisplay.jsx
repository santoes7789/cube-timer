import { TimesContext } from "@/App";
import { useContext, useState } from "react";

import TrashIcon from '@/assets/icons/trash.svg?react';
import EditIcon from '@/assets/icons/pencil-square.svg?react';
import EditSessionPopup from "@/components/EditSessionPopup";

const SessionDisplay = () => {
	const [newSessionName, setNewSessionName] = useState("");
	const [selectedSession, setSelectedSession] = useState({});
	const timeContext = useContext(TimesContext);

	return (
		<>
			<EditSessionPopup session={selectedSession} />
			<div className="position-fixed bottom-0 start-0 end-0 my-4 d-flex justify-content-center">
				<div className="border-bottom border-primary-subtle p-4">

					<div className="dropup">
						<p className="d-inline"> &nbsp;Session: &nbsp;</p>
						<strong id="session-text" type="button" className="dropdown-toggle text-primary" data-bs-toggle="dropdown">{timeContext.sessionList[timeContext.session]}</strong>

						<ul className="session-dropdown dropdown-menu no-min-width p-1">
							<li>
								<div className="input-group">
									<input type="text" className="form-control m-0" placeholder="New Session" onChange={e => setNewSessionName(e.target.value)} value={newSessionName} />
									<button className="btn btn-outline-primary" type="button" onClick={() => {
										timeContext.addSession(newSessionName);
										setNewSessionName("");
									}}>+</button>
								</div>
							</li>
							<li><hr className="dropdown-divider" /></li>

							<div className="list-group">
								{Object.entries(timeContext.sessionList).map(([k, v]) => (
									<a key={k}
										className="list-group-item p-1  list-group-item-action">
										<div className="ms-1 d-flex align-items-center ">
											<div className="flex-grow-1 align-middle rounded me-1"
												onClick={() => {
													timeContext.setSession(k);
												}}>
												{v}
											</div>
											<div className="btn-group">
												<button
													className="btn btn-outline-secondary btn-sm border-0"
													type="button"
													data-bs-toggle="modal" data-bs-target="#editSessionPopup"
													onClick={() => {
														setSelectedSession({ id: k, value: v })
													}} >
													<EditIcon />
												</button>
												<button
													className="btn btn-outline-danger btn-sm border-0"
													type="button"
													onClick={() => {
														timeContext.deleteSession(k);
														setNewSessionName("")
													}} >
													<TrashIcon />
												</button>
											</div>
										</div>
									</a>
								))}
							</div>
						</ul>
					</div>
				</div>
			</div>
		</>
	)

}
export default SessionDisplay;
