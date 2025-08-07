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

	useEffect(() => {
		console.log(darkMode)
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
		document.documentElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light")
	}, [darkMode]);

	return (
		<SettingsContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</SettingsContext.Provider>
	)

}

export default SettingsProvider;
