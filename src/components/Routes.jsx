import { Routes, Route, useLocation } from "react-router-dom"
import TimerPage from "@/pages/TimerPage";
import SettingsPage from "@/pages/SettingsPage";
import Layout from "@/pages/Layout";
import StatsPage from "@/pages/StatsPage";
import { AnimatePresence } from "framer-motion";

const RoutesComponent = () => {
	const location = useLocation();
	return (
		<AnimatePresence mode="popLayout">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Layout />}>
					<Route index element={<TimerPage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="statistics" element={<StatsPage />} />
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

export default RoutesComponent
