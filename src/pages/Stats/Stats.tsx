import { Line, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useDB } from "@/contexts/DBContext";
import "./Stats.css";
import { CustomDropdown } from "@/components/CustomDropdown";
import { getAoX } from "@/utils/time";

ChartJS.register(...registerables);

const options = {
  responsive: true,
};


function Stats() {
  const { sessions, times, setCurrentSession, currentSessionName } =
    useDB();

  const labels = [];
  for (let i = 1; i <= times.length; i++) {
    labels.push(i);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Single',
        data: times.map((time) => time.time / 1000),
        showLine: true
      },
      {
        label: 'Ao5',
        data: times.map((time, i) => {
          const ao5 = getAoX(times, 5, i);
          if (ao5 === null) {
            return null;
          }
          return ao5 / 1000;
        }),
        showLine: true
      },
      {
        label: 'Ao12',
        data: times.map((time, i) => {
          const ao12 = getAoX(times, 12, i);
          if (ao12 === null) {
            return null;
          }
          return ao12 / 1000;
        }),
        showLine: true
      },
      {
        label: 'Ao100',
        data: times.map((time, i) => {
          const ao100 = getAoX(times, 100, 5);
          if (ao100 === null) {
            return null;
          }
          return ao100 / 1000;
        }),
        showLine: true
      },
    ],
  };


  return (
    <div className="stats-page-container">
      <div>

        <h3 style={{ display: "inline", marginRight: "10px" }}>
          Statistics for:
        </h3>
        <CustomDropdown
          below
          value={currentSessionName}
          onClick={(id) => {
            setCurrentSession(id);
          }}
          options={
            sessions
              ? [
                ...sessions.map((t) => ({ value: t.uuid, label: t.name })),
              ]
              : []
          }
        />
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default Stats;