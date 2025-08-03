import { TimesContext } from "@/App";
import { useContext, useState } from "react";

const SessionDisplay = () => {
	const [newSessionName, setNewSessionName] = useState("");
	const timeContext = useContext(TimesContext);

	return (
		<div className="position-fixed bottom-0 start-0 end-0 my-4 d-flex justify-content-center">
			<div className="border-bottom border-primary-subtle p-4">

				<div className="dropup">
					<p className="d-inline"> &nbsp;Session: &nbsp;</p>
					<strong id="session-text" type="button" className="dropdown-toggle text-primary" data-bs-toggle="dropdown">{timeContext.sessionList[timeContext.session]}</strong>

					<ul className="session-dropdown dropdown-menu no-min-width p-1">
						<li>
							<div className="input-group">
								<input type="text" className="form-control m-0" placeholder="New Session" onChange={e => setNewSessionName(e.target.value)} value={newSessionName} />
								<button className="btn btn-outline-primary" type="button" onClick={() => timeContext.addSession(newSessionName)}>+</button>
							</div>
						</li>
						<li><hr className="dropdown-divider" /></li>
						{Object.entries(timeContext.sessionList).map(([k, v]) => (
							<li key={k} onClick={() => timeContext.setSession(k)}><p className="dropdown-item">{v}</p></li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)

}
export default SessionDisplay;
