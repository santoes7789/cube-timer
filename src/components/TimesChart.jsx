import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useTimes } from "@/App";
import { getAoX } from "@/utils/helpers";

ChartJS.register(...registerables);

const TimesChart = () => {

	const timesContext = useTimes();

	const label = [];
	const data_single = [];
	const data_ao5 = [];
	const data_ao12 = [];

	let count = 0;
	for (let i = 0; i < timesContext.times.length; i++) {
		if (timesContext.times[i].modifier == "dnf") {
			data_single.push(null);
		} else if (timesContext.times[i].modifier == "+2") {
			data_single.push(timesContext.times[i].value / 1000 + 2);
			count++;
		} else {
			data_single.push(timesContext.times[i].value / 1000);
			count++;
		}
		const ao5 = getAoX(timesContext.times, 5, i);

		data_ao5.push(ao5 ? ao5 / 1000 : null);

		const ao12 = getAoX(timesContext.times, 12, i);
		data_ao12.push(ao12 ? ao12 / 1000 : null);
		label.push(i + 1);
	}



	const data = {
		labels: label,
		datasets: [
			{
				label: 'Single',
				data: data_single,
				borderWidth: 1,
				tension: 0.3,
			},
			{
				label: 'Ao5',
				data: data_ao5,
				borderWidth: 1,
				tension: 0.3,
			},
			{
				label: 'Ao12',
				data: data_ao12,
				borderWidth: 1,
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
