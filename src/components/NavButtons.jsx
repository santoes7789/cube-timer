import GraphIcon from '@/assets/icons/graph-down.svg?react';
import SettingsIcon from '@/assets/icons/gear.svg?react';
import StopwatchIcon from '@/assets/icons/stopwatch.svg?react';
import { Link } from "react-router-dom";
const NavButtons = () => {
	return (
		<>
			<div className="position-fixed top-0 end-0 m-4 p-4 border-top border-end border-primary">
				<Link to="/" className='border-0 rounded-circle hoverColor' href='settings'>
					<StopwatchIcon style={{ width: "20px", height: "20px" }} />
				</Link>
				<Link to="/statistics" className='border-0 rounded-circle hoverColor ps-3' href='settings'>
					<GraphIcon style={{ width: "20px", height: "20px" }} />
				</Link>
				<Link to="/settings" className='border-0 rounded-circle hoverColor ps-3' href='settings'>
					<SettingsIcon style={{ width: "20px", height: "20px" }} />
				</Link>
			</div>
		</>
	)
};

export default NavButtons;
