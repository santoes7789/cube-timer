import { useContext, useEffect, useState } from "react";
import { TimesContext } from "../App";

const EditSessionPopup = ({ session }) => {
	const timeContext = useContext(TimesContext);
	const [newSessionName, setSessionName] = useState("");
	useEffect(() => {
		setSessionName(session.value || "");
	}, [session])
	return (
		<div className="modal fade" id="editSessionPopup" tabIndex="-1">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">Edit session</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p className="text-start pb-2 px-1">
							Input a new session name for&nbsp;
							<strong>{session.value}</strong>: </p>
						<input type="text"
							className="form-control"
							placeholder="Enter new session name"
							onChange={e => setSessionName(e.target.value)}
							value={newSessionName}
						/>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-primary"
							data-bs-dismiss="modal"
							onClick={() => timeContext.editSession(session.id, newSessionName)}
						>Save changes</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditSessionPopup;
