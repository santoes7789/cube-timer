import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timer from './pages/Timer'
import Layout from "./pages/Layout";
import './App.css'
import { useState } from "react";

const App = () => {
	const [times, setTimes] = useState([]);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Timer times={times} setTimes={setTimes} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
