import SettingsIcon from '@/assets/icons/gear.svg?react';
import { Link } from 'react-router-dom';

const SettingsButton = () => {
	return (
		<Link to="/settings" className='border-0 rounded-circle hoverColor' href='settings'>
			<SettingsIcon style={{ width: "20px", height: "20px" }} />
		</Link>
	)
}

export default SettingsButton;
