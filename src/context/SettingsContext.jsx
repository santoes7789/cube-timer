import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function useSettings() {
	return useContext(SettingsContext);
}
const SettingsProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode');
		return saved ? JSON.parse(saved) : true;
	});

	const [layoutSettings, setLayoutSettings] = useState(() => {
		const saved = localStorage.getItem('layoutSettings');
		return saved ? JSON.parse(saved) : { 'scramble': true, 'stats': true, 'table': true }
	});

	const setLayout = (k, v) => {
		setLayoutSettings({ ...layoutSettings, [k]: v });
	}

	useEffect(() => {
		localStorage.setItem('layoutSettings', JSON.stringify(layoutSettings));
	}, [layoutSettings]);

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
		document.documentElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light")
	}, [darkMode]);

	return (
		<SettingsContext.Provider value={{ darkMode, setDarkMode, layoutSettings, setLayout }}>
			{children}
		</SettingsContext.Provider>
	)

}

export default SettingsProvider;
