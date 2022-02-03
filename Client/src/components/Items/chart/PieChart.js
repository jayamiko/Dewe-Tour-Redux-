import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({data}) => {
  const dataChart = {
    labels: data?.map((x) => x.title),
    datasets: [
      {
        label: `${data?.length} Coins Available`,
        data: data?.map((x) => x.quota),
        backgroundColor: ["blue", "orange"],
        borderColor: ["white"],
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
      <Pie data={dataChart} options={options} />
    </div>
  );
};

export default PieChart;
