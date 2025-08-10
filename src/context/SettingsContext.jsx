import { createContext, useContext, useState, useEffect } from "react";
import { darken } from "../utils/helpers";

const SettingsContext = createContext();

export function useSettings() {
	return useContext(SettingsContext);
}
const SettingsProvider = ({ children }) => {
	const [appearanceSettings, setAppearanceSettings] = useState(() => {
		const saved = localStorage.getItem('appearanceSettings');
		return saved ? JSON.parse(saved) : { 'darkMode': true, 'pageAnimations': true, 'color': "#0d6efd" }
	});

	const [layoutSettings, setLayoutSettings] = useState(() => {
		const saved = localStorage.getItem('layoutSettings');
		return saved ? JSON.parse(saved) : { 'scramble': true, 'stats': true, 'table': true, 'logo': true }
	});

	const [timerSettings, setTimerSettings] = useState(() => {
		const saved = localStorage.getItem('timerSettings');
		return saved ? JSON.parse(saved) : { 'waitTime': 400, 'updateInterval': 10 }
	});

	const setLayout = (k, v) => {
		setLayoutSettings({ ...layoutSettings, [k]: v });
	}

	const setTimer = (k, v) => {
		setTimerSettings({ ...timerSettings, [k]: v });
	}

	const setAppearance = (k, v) => {
		setAppearanceSettings({ ...appearanceSettings, [k]: v });
	}

	useEffect(() => {
		localStorage.setItem('layoutSettings', JSON.stringify(layoutSettings));
	}, [layoutSettings]);

	useEffect(() => {
		localStorage.setItem('appearanceSettings', JSON.stringify(appearanceSettings));
		document.documentElement.setAttribute("data-bs-theme", appearanceSettings.darkMode ? "dark" : "light")
		document.documentElement.style.setProperty('--primary', appearanceSettings.color);
		document.documentElement.style.setProperty('--primary-border', darken(appearanceSettings.color, 35));
	}, [appearanceSettings]);

	useEffect(() => {
		localStorage.setItem('timerSettings', JSON.stringify(timerSettings));
	}, [timerSettings]);

	return (
		<SettingsContext.Provider value={{ appearanceSettings, setAppearance, layoutSettings, setLayout, timerSettings, setTimer }}>
			{children}
		</SettingsContext.Provider>
	)

}

export default SettingsProvider;
