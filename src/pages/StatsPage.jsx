import BackIcon from '@/assets/icons/arrow-left.svg?react';
import SessionDisplay from '@/components/SessionDisplay';
import TimesChart from '@/components/TimesChart';
import { useTimes } from "@/App";
import { getBestTime, timeToString, formatMilliseconds, getAoX, getMean } from "@/utils/helpers";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const StatsPage = () => {
	const navigate = useNavigate();

	const settingsContext = useSettings()
	const timeContext = useTimes();

	const label = [];
	const data_single = [];
	const data_ao5 = [];
	const data_ao12 = [];

	let count = 0;
	for (let i = 0; i < timeContext.times.length; i++) {
		if (timeContext.times[i].modifier == "dnf") {
			data_single.push(null);
		} else if (timeContext.times[i].modifier == "+2") {
			data_single.push(timeContext.times[i].value + 2000);
			count++;
		} else {
			data_single.push(timeContext.times[i].value);
			count++;
		}
		const ao5 = getAoX(timeContext.times, 5, i);

		data_ao5.push(ao5 ? ao5 : null);

		const ao12 = getAoX(timeContext.times, 12, i);
		data_ao12.push(ao12 ? ao12 : null);
		label.push(i + 1);
	}

	const ao5filtered = data_ao5.filter(x => x != null);
	const ao12filtered = data_ao12.filter(x => x != null);
	const best_ao5 = ao5filtered.length == 0 ? null : Math.min(...ao5filtered);
	const best_ao12 = ao12filtered.length == 0 ? null : Math.min(...ao12filtered);

	return (
		<motion.main
			className='position-fixed bg-body z-1'
			{...(settingsContext.appearanceSettings.pageAnimations ?
				{
					transition: {
						ease: "easeInOut"
					},
					initial: { x: "100%" },
					animate: { x: 0 },
					exit: { x: "100%" }
				} : {}
			)}
		>
			<div className="position-fixed top-0 start-0 m-4 p-4 hoverColor" role="button"
				onClick={() => navigate(-1)} >
				<BackIcon style={{ width: "50px", height: "50px" }} />
			</div >

			<div className="d-flex flex-column align-items-center vh-100 mx-5" >
				<div className="border-bottom border-primary-subtle mt-5 mb-4 py-3 px-5 fs-1">
					<h1 className='d-inline ps-4'>STATISTICS FOR &nbsp;</h1>
					<SessionDisplay dropDirection={"down"} addButton={false} />
				</div>
				<div className="chart-container">
					<TimesChart label={label} data_single={data_single} data_ao5={data_ao5} data_ao12={data_ao12} />
				</div>

				<div className="d-flex">
					<div className="border border-primary-subtle rounded p-4">
						<h4 className="text-start mb-2">Best</h4>
						<div className="d-inline-block text-end">
							<p>Single:</p>
							<p>Ao5:</p>
							<p>Ao12:</p>
						</div>
						<div className='d-inline-block text-start ms-3'>
							<p><strong>{timeToString(getBestTime(timeContext.times))}</strong></p>
							<p><strong>{formatMilliseconds(best_ao5)}</strong></p>
							<p><strong>{formatMilliseconds(best_ao12)}</strong></p>
						</div>
					</div>
					<div className="border border-primary-subtle rounded p-4">
						<h4 className="text-start mb-2">Current</h4>
						<div className="d-inline-block text-end">
							<p>Single:</p>
							<p>Ao5:</p>
							<p>Ao12:</p>
						</div>
						<div className='d-inline-block text-start ms-3'>
							<p><strong>{timeToString(timeContext.times[timeContext.times.length - 1])}</strong></p>
							<p><strong>{formatMilliseconds(getAoX(timeContext.times, 5))}</strong></p>
							<p><strong>{formatMilliseconds(getAoX(timeContext.times, 12))}</strong></p>
						</div>
					</div>
				</div>
			</div>
		</motion.main>
	)
}

export default StatsPage;
