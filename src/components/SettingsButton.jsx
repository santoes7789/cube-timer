import SettingsIcon from '@/assets/icons/gear.svg?react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SettingsButton = () => {
	return (
		<Link to="/settings" className='border-0 rounded-circle text-body' href='settings'>
			<SettingsIcon />
		</Link>
	)
}

export default SettingsButton;
