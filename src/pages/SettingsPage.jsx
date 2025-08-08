import { Button, Form, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import BackIcon from '@/assets/icons/arrow-left.svg?react';
import { useSettings } from "@/context/SettingsContext";
import { SettingsHeadingItem, SettingsItemSwitch, SettingsItemInputInt } from "@/components/SettingsItems";

import "./SettingsPage.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SettingsPage = () => {
	const settingsContext = useSettings();

	useEffect(() => {
		document.title = "Settings"
	}, [])

	const renderTooltip = (txt) => (
		<Tooltip className="ms-2">
			{txt}
		</Tooltip>
	);
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
						<SettingsItemSwitch
							checked={settingsContext.darkMode}
							onChange={(v) => settingsContext.setDarkMode(v)}>
							Dark mode
						</SettingsItemSwitch>

						<SettingsHeadingItem>
							Timer
						</SettingsHeadingItem>

						<SettingsItemInputInt
							value={settingsContext.timerSettings.waitTime}
							onChange={(v) => settingsContext.setTimer("waitTime", v)}>

							<OverlayTrigger
								placement="right"
								delay={{ show: 150, hide: 150 }}
								overlay={renderTooltip("In milliseconds, how long spacebar needs to be held to turn timer green")} >
								<p>Timer wait time</p>
							</OverlayTrigger>
						</SettingsItemInputInt>

						<SettingsItemInputInt
							value={settingsContext.timerSettings.updateInterval}
							onChange={(v) => settingsContext.setTimer("updateInterval", v)}>
							<OverlayTrigger
								placement="right"
								delay={{ show: 150, hide: 150 }}
								overlay={renderTooltip("In milliseconds, how often running timer updates (recommended: 10) ")} >
								<p>Timer update interval</p>
							</OverlayTrigger>
						</SettingsItemInputInt>

						<SettingsHeadingItem>
							Layout
						</SettingsHeadingItem>

						<SettingsItemSwitch
							checked={settingsContext.layoutSettings.scramble}
							onChange={(v) => settingsContext.setLayout("scramble", v)}>
							Show scramble
						</SettingsItemSwitch>

						<SettingsItemSwitch
							checked={settingsContext.layoutSettings.stats}
							onChange={(v) => settingsContext.setLayout("stats", v)}>
							Show Statistics in corner
						</SettingsItemSwitch>

						<SettingsItemSwitch
							checked={settingsContext.layoutSettings.table}
							onChange={(v) => settingsContext.setLayout("table", v)}>
							Show table
						</SettingsItemSwitch>
					</ListGroup>
				</div>
			</div>
		</>
	)
}

export default SettingsPage;
