import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const TimesChart = ({ label, data_single, data_ao5, data_ao12 }) => {

	const data = {
		labels: label,
		datasets: [
			{
				label: 'Single',
				data: data_single.map(item => (item ? item / 1000 : null)),
				borderWidth: 1,
				radius: 2,
				tension: 0.3,
			},
			{
				label: 'Ao5',
				data: data_ao5.map(item => (item ? item / 1000 : null)),
				borderWidth: 1,
				radius: 1,
				tension: 0.3,
			},
			{
				label: 'Ao12',
				data: data_ao12.map(item => (item ? item / 1000 : null)),
				borderWidth: 1,
				radius: 1,
				tension: 0.3,
			},
		],
	};

	const options = {
		responsive: true,
	};

	return (
		<Line data={data} options={options} />
	);
}

export default TimesChart;
