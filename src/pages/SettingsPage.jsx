import { Button, Form, ListGroup } from "react-bootstrap";
import BackIcon from '@/assets/icons/arrow-left.svg?react';
import { useSettings } from "@/context/SettingsContext";

import "./SettingsPage.css"
import { Link } from "react-router-dom";

const SettingsPage = () => {
	const settingsContext = useSettings();
	return (
		<>
			<Link to="/" className="start-0 position-fixed m-4 hoverColor" role="button">
				<BackIcon style={{ width: "50px", height: "50px" }} />
			</Link>

			<div className="d-flex flex-column align-items-center vh-100 mx-5" >
				<div className="border-bottom border-primary-subtle mt-5 mb-4 py-3 px-5">
					<h1>SETTINGS</h1>
				</div>

				<div className="flex-grow-1 w-100 overflow-auto" style={{ maxWidth: "600px" }}>
					<ListGroup>
						<ListGroup.Item className="d-flex justify-content-between align-items-center">
							Dark mode
							<Form.Check
								type="switch"
								id="dark-mode-switch"
								checked={settingsContext.darkMode}
								onChange={(e) => settingsContext.setDarkMode(e.target.checked)}
							/>
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>
		</>
	)
}

export default SettingsPage;
