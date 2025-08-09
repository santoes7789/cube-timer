import GraphIcon from '@/assets/icons/graph-down.svg?react';
import SettingsIcon from '@/assets/icons/gear.svg?react';
import StopwatchIcon from '@/assets/icons/stopwatch.svg?react';
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
	return (
		<>
			<Outlet />
		</>
	)
};

export default Layout;
