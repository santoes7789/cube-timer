import { Button, Form, ListGroup } from "react-bootstrap";
import BackIcon from '@/assets/icons/arrow-left.svg?react';
import { useSettings } from "@/context/SettingsContext";

import "./SettingsPage.css"
import { Link } from "react-router-dom";
import SettingsItem from "@/components/SettingsItem";
import SettingsHeadingItem from "../components/SettingsHeadingItem";

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
						<SettingsHeadingItem>
							Appearance
						</SettingsHeadingItem>
						<SettingsItem text={"Dark mode"}
							checked={settingsContext.darkMode}
							onChange={(e) => settingsContext.setDarkMode(e.target.checked)} />


						<SettingsHeadingItem>
							Layout
						</SettingsHeadingItem>

						<SettingsItem text={"Show scramble"}
							checked={settingsContext.layoutSettings.scramble}
							onChange={(e) => settingsContext.setLayout("scramble", e.target.checked)} />

						<SettingsItem text={"Show statistics in corner"}
							checked={settingsContext.layoutSettings.stats}
							onChange={(e) => settingsContext.setLayout("stats", e.target.checked)} />

						<SettingsItem text={"Show table"}
							checked={settingsContext.layoutSettings.table}
							onChange={(e) => settingsContext.setLayout("table", e.target.checked)} />
					</ListGroup>
				</div>
			</div>
		</>
	)
}

export default SettingsPage;
