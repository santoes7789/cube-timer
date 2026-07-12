import { Line, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useDB } from "@/contexts/DBContext";
import { CustomDropdown } from "@/components/CustomDropdown";
import { getAoX } from "@/utils/time";
import "./Stats.css";
import { BackIcon } from "@/components/BackIcon";
import { useNavigate } from "react-router-dom";
import Divider from "@/components/Divider";

ChartJS.register(...registerables);

const options = {
  responsive: true,
};


function Stats() {
  const { sessions, times, setCurrentSession, currentSessionName } = useDB();
  const navigate = useNavigate();

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
      <div className="top-left">
        <BackIcon onClick={() => navigate("/timer")} />
      </div>

      <div style={{ marginTop: "50px", marginBottom: "30px" }}>
        <div style={{ paddingRight: "50px", paddingLeft: "50px" }}>
          <h2 style={{ display: "inline", marginRight: "30px", fontSize: "40px" }}>
            STATISTICS FOR:
          </h2>
          <div style={{ display: "inline", fontSize: "40px" }}>
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
        </div>
        <Divider />
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default Stats;