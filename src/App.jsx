import { BrowserRouter } from "react-router-dom";
import SettingsProvider from "@/context/SettingsContext";
import Routes from "@/components/Routes";
import './App.css'


const TIMES_KEY = "times";
const SESSION_KEY = "session";
const SESSIONLIST_KEY = "sessionList"
import { createContext, useContext, useEffect, useState } from "react";

const TimesContext = createContext();

export function useTimes() {
	return useContext(TimesContext);
}


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

	const [currentTimeIdx, setCurrentTimeIdx] = useState(null);

	const times = allTimes[session] || [];
	const currentTime = times[currentTimeIdx] ? { ...times[currentTimeIdx] } : null;

	useEffect(() => localStorage.setItem(TIMES_KEY, JSON.stringify(allTimes)), [allTimes])
	useEffect(() => localStorage.setItem(SESSION_KEY, JSON.stringify(session)), [session])
	useEffect(() => localStorage.setItem(SESSIONLIST_KEY, JSON.stringify(sessionList)), [sessionList])

	const addTime = (time) => {
		const newTime = { timestamp: Date.now(), value: time };
		const newArray = { ...allTimes };
		if (!newArray[session]) {
			newArray[session] = [];
		}
		newArray[session].push(newTime);
		setAllTimes(newArray);
		setCurrentTimeIdx(times.length - 1);
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
			Object.keys(timeToModify).forEach(key => delete timeToModify[key]);
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
			<SettingsProvider>
				<TimesContext.Provider
					value={{ times, currentTime, session, setSession, sessionList, addSession, deleteSession, editSession, addTime, deleteTime, modifyTime }}>
					<BrowserRouter basename="/cube-timer">
						<Routes />
					</BrowserRouter>
				</TimesContext.Provider>
			</SettingsProvider>
		</>
	)
}

export default App
