import { ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import BackIcon from '@/assets/icons/arrow-left.svg?react';
import { useSettings } from "@/context/SettingsContext";
import { SettingsHeadingItem, SettingsItemSwitch, SettingsItemInputInt } from "@/components/SettingsItems";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SettingsItemColorPicker } from "../components/SettingsItems";

const SettingsPage = () => {
	const settingsContext = useSettings();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Settings"
	}, [])

	const renderTooltip = (txt) => (
		<Tooltip className="ms-2">
			{txt}
		</Tooltip>
	);

	return (
		<motion.main
			className='position-fixed bg-body z-1'
			{...(settingsContext.appearanceSettings.pageAnimations ?
				{
					transition: {
						ease: "easeInOut"
					},
					initial: { x: "100%" },
					animate: { x: 0 },
					exit: { x: "100%" }
				} : {}

			)}
		>
			<div className="position-fixed top-0 start-0 m-4 p-4 hoverColor" role="button"
				onClick={() => navigate(-1)} >
				<BackIcon style={{ width: "50px", height: "50px" }} />
			</div >

			<div className="d-flex flex-column align-items-center vh-100 mx-5" >
				<div className="border-bottom border-primary mt-5 mb-4 py-3 px-5">
					<h1 className="d-inline">SETTINGS</h1>
				</div>

				<div className="flex-grow-1 w-100 overflow-auto" style={{ maxWidth: "600px" }}>
					<ListGroup>
						<SettingsHeadingItem>
							Appearance
						</SettingsHeadingItem>
						<SettingsItemSwitch
							checked={settingsContext.appearanceSettings.darkMode}
							onChange={(v) => settingsContext.setAppearance("darkMode", v)}>
							Dark mode
						</SettingsItemSwitch>

						<SettingsItemColorPicker
							value={settingsContext.appearanceSettings.color}
							onChange={(v) => settingsContext.setAppearance("color", v)}>
							Color theme
						</SettingsItemColorPicker>

						<SettingsItemSwitch
							checked={settingsContext.appearanceSettings.pageAnimations}
							onChange={(v) => settingsContext.setAppearance("pageAnimations", v)}>
							Page animations
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
							Show statistics
						</SettingsItemSwitch>

						<SettingsItemSwitch
							checked={settingsContext.layoutSettings.table}
							onChange={(v) => settingsContext.setLayout("table", v)}>
							Show table
						</SettingsItemSwitch>
						<SettingsItemSwitch
							checked={settingsContext.layoutSettings.scrambledCube}
							onChange={(v) => settingsContext.setLayout("scrambledCube", v)}>
							Show scramble preview
						</SettingsItemSwitch>
					</ListGroup>
				</div>
			</div>
		</motion.main >
	)
}

export default SettingsPage;
