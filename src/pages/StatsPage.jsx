import BackIcon from '@/assets/icons/arrow-left.svg?react';
import SessionDisplay from '@/components/SessionDisplay';
import { useNavigate } from 'react-router-dom';
import TimesChart from '../components/TimesChart';

const StatsPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="position-fixed top-0 start-0 m-4 p-4 border-top border-start border-primary-subtle ">
				<div className="hoverColor" role="button"
					onClick={() => navigate(-1)} >
					<BackIcon style={{ width: "50px", height: "50px" }} />
				</div>
			</div>

			<div className="d-flex flex-column align-items-center vh-100 mx-5" >
				<div className="border-bottom border-primary-subtle mt-5 mb-4 py-3 px-5 fs-1">
					<SessionDisplay text={"STATISTICS FOR"} dropDirection={"down"} addButton={false} />
				</div>
				<TimesChart />
			</div>
		</>
	)
}

export default StatsPage;
