import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from './pages/Timer'
import Layout from "./pages/Layout";
import './App.css'


const TIMES_KEY = "times";
const SESSION_KEY = "session";
const SESSIONLIST_KEY = "sessionList"
import { createContext, useEffect, useState } from "react";

export const TimesContext = createContext();


const App = () => {
	const [allTimes, setAllTimes] = useState(() => {
		const saved = localStorage.getItem(TIMES_KEY);
		return saved ? JSON.parse(saved) : {};
	});
	const [session, setSession] = useState(() => {
		const saved = localStorage.getItem(SESSION_KEY);
		return saved ? JSON.parse(saved) : 0;
	});
	const [sessionList, setSessionList] = useState(() => {
		const saved = localStorage.getItem(SESSIONLIST_KEY);
		return saved ? JSON.parse(saved) : { 0: "3x3" };
	})

	const times = allTimes[session] || [];

	useEffect(() => localStorage.setItem(TIMES_KEY, JSON.stringify(allTimes)), [allTimes])
	useEffect(() => localStorage.setItem(SESSION_KEY, JSON.stringify(session)), [session])
	useEffect(() => localStorage.setItem(SESSIONLIST_KEY, JSON.stringify(sessionList)), [sessionList])

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

	const modifyTime = (time) => {
		const newArray = { ...allTimes };
		const timeToModify = newArray[session].find(item => item.timestamp == time.timestamp);
		if (timeToModify) {
			Object.assign(timeToModify, time);
			setAllTimes(newArray);
		}
	}

	const addSession = (sessionName) => {
		const freeId = Math.max(-1, ...Object.keys(sessionList).map(Number)) + 1;
		setSessionList(prev => ({ ...prev, [freeId]: sessionName }));
		setSession(freeId);
	}

	const deleteSession = (sessionId) => {
		let sessionIds = Object.keys(sessionList);
		console.log(sessionIds)
		if (sessionIds.length <= 1) {
			return;
		}
		const { [sessionId]: _1, ...newSessionList } = sessionList;
		const { [sessionId]: _2, ...newTimesList } = allTimes;
		setSessionList(newSessionList);
		setAllTimes(newTimesList);

		sessionIds = Object.keys(newSessionList);
		if (sessionId == session) {
			setSession(sessionIds[0]);
		}
	}

	const editSession = (sessionId, sessionName) => {
		setSessionList(prevData => ({ ...prevData, [sessionId]: sessionName }));
	}
	return (
		<>
			<TimesContext.Provider
				value={{ times, session, setSession, sessionList, addSession, deleteSession, editSession, addTime, deleteTime, modifyTime }}>
				<BrowserRouter basename="/cube-timer">
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
