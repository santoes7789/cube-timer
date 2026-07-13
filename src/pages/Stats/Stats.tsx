import { Line, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useDB } from "@/contexts/DBContext";
import { CustomDropdown } from "@/components/CustomDropdown";
import { formatMilliseconds, getAoX, getBestTime, getDeviation, getSessionAverage, getTotalTime, getWorstTime } from "@/utils/time";
import "./Stats.css";
import { BackIcon } from "@/components/BackIcon";
import { useNavigate } from "react-router-dom";
import Divider from "@/components/Divider";

ChartJS.register(...registerables);

const options = {
  responsive: true,
};

function StatComponent({ text, value }: { text: string, value: string | null }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ paddingRight: "30px" }}>{text}</div>
      <div>{value ?? "--"}</div>
    </div>
  )
}


function Stats() {
  const { sessions, times, setCurrentSession, currentSessionName } = useDB();
  const navigate = useNavigate();

  const labels = [];
  for (let i = 1; i <= times.length; i++) {
    labels.push(i);
  }


  let bestSingle = Infinity;
  let bestAo5 = Infinity;
  let bestAo12 = Infinity;
  let bestAo100 = Infinity;
  const data = {
    labels,
    datasets: [
      {
        label: 'Single',
        data: times.map((time) => {
          bestSingle = Math.min(bestSingle, time.time / 1000);
          return time.time / 1000;
        }),
        showLine: true
      },
      {
        label: 'Ao5',
        data: times.map((time, i) => {
          const ao5 = getAoX(times, 5, i);
          if (ao5 === null) {
            return null;
          }
          bestAo5 = Math.min(bestAo5, ao5 / 1000);
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
          bestAo12 = Math.min(bestAo12, ao12 / 1000);
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
          bestAo100 = Math.max(bestAo100, ao100 / 1000);
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

      <div>
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


      <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginTop: "30px" }}>

        <div className="popout-container">
          <div style={{ fontWeight: "bold" }}>BEST</div>
          <Divider />
          <StatComponent text="Single:" value={(bestSingle == Infinity ? null : bestSingle.toFixed(3))} />
          <StatComponent text="Ao5:" value={(bestAo5 == Infinity ? null : bestAo5.toFixed(3))} />
          <StatComponent text="Ao12:" value={(bestAo12 == Infinity ? null : bestAo12.toFixed(3))} />
          <StatComponent text="Ao100:" value={(bestAo100 == Infinity ? null : bestAo100.toFixed(3))} />
        </div>

        <div className="popout-container">
          <div style={{ fontWeight: "bold" }}>CURRENT</div>
          <Divider />
          <StatComponent text="Single:" value={data.datasets[0].data.at(-1)?.toFixed(3) ?? null} />
          <StatComponent text="Ao5:" value={data.datasets[1].data.at(-1)?.toFixed(3) ?? null} />
          <StatComponent text="Ao12:" value={data.datasets[2].data.at(-1)?.toFixed(3) ?? null} />
          <StatComponent text="Ao100:" value={data.datasets[3].data.at(-1)?.toFixed(3) ?? null} />
        </div>

        <div className="popout-container">
          <StatComponent text="Average:" value={formatMilliseconds(getSessionAverage(times))} />
          <StatComponent text="Deviation:" value={formatMilliseconds(getDeviation(times))} />
          <StatComponent text="Best:" value={(bestSingle == Infinity ? null : bestSingle.toFixed(3))} />
          <StatComponent text="Worst:" value={formatMilliseconds(getWorstTime(times)?.time)} />
          <StatComponent text="Total time:" value={formatMilliseconds(getTotalTime(times))} />
          <StatComponent text="Count:" value={times.length.toString()} />
        </div>

      </div>
    </div>
  )
}

export default Stats;