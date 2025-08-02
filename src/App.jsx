import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from './pages/Timer'
import Layout from "./pages/Layout";
import './App.css'


const TIMES_KEY = "times";
const SESSION_KEY = "session";
import { createContext, useEffect, useState } from "react";

export const TimesContext = createContext();


const App = () => {
	const [allTimes, setAllTimes] = useState(() => {
		const saved = localStorage.getItem(TIMES_KEY);
		return saved ? JSON.parse(saved) : {};
	});
	const [session, setSession] = useState(() => {
		const saved = localStorage.getItem(SESSION_KEY);
		return saved ? JSON.parse(saved) : "3x3";
	});

	const times = allTimes[session] || [];

	useEffect(() => localStorage.setItem(TIMES_KEY, JSON.stringify(allTimes)), [allTimes])

	const addTime = (time) => {
		const newTime = { timestamp: Date.now(), value: time, modifier: "" };
		const newArray = { ...allTimes };
		if (!newArray[session]) {
			newArray[session] = [];
		}
		newArray[session].push(newTime);
		setAllTimes(newArray);
	}

	const deleteTime = (time) => {
		const newArray = { ...allTimes };
		newArray[session] = newArray[session].filter(item => item != time);
		setAllTimes(newArray);
	}

	const modifiyTime = (time) => {
		const newArray = { ...allTimes };
		const timeToModify = newArray[session].find(item => item.timestamp == timestamp);
		if (timeToModify) {
			Object.assign(timeToModify, time);
			setAllTimes(newArray);
		}
	}
	return (
		<>
			<TimesContext.Provider
				value={{ times, session, setSession, addTime, deleteTime, modifiyTime }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Timer />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</TimesContext.Provider>
		</>
	)
}

export default App
