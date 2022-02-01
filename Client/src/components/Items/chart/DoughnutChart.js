import React from "react";
import {BarController, CategoryScale, LinearScale} from "chart.js";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(BarController, CategoryScale, LinearScale);
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({data}) => {
  const options = {
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
      <Doughnut
        data={{
          labels: data?.map((x) => x.title),
          datasets: [
            {
              label: "#QUOTA TRIP",
              data: data?.map((x) => x.quota),
              backgroundColor: ["blue", "orange"],
              borderColor: ["white"],
              borderWidth: 1,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default DoughnutChart;
