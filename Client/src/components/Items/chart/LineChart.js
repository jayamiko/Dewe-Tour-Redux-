import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({data}) => {
  var dataChart = {
    labels: data?.map((x) => x.title),
    datasets: [
      {
        label: "Quota Trips",
        data: data?.map((x) => x.quota),
        backgroundColor: ["blue", "orange"],
        borderColor: ["black"],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div style={{width: "700px", height: "400px"}}>
      <Line data={dataChart} options={options} />
    </div>
  );
};

export default LineChart;
