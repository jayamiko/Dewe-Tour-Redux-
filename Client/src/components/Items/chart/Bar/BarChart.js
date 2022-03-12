import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import {Bar} from "react-chartjs-2";
ChartJS.register(BarController, CategoryScale, LinearScale);
ChartJS.register(ArcElement);
ChartJS.register(BarElement);

const BarChart = ({data}) => {
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
    <>
      <div style={{width: "700px", height: "400px"}}>
        <Bar
          data={{
            labels: data?.map((x) => x.title),
            datasets: [
              {
                label: "QUOTA TRIP",
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
    </>
  );
};

export default BarChart;
