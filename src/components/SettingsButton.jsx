import SettingsIcon from '@/assets/icons/gear.svg?react';
import { Button } from 'react-bootstrap';

const SettingsButton = () => {
	return (
		<Button variant='outline-secondary' className='border-0 rounded-circle' href='settings'>
			<SettingsIcon />
		</Button>
	)
}

export default SettingsButton;
