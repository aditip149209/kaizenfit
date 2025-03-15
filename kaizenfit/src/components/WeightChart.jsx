import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);


const WeightLossProgress = ({ currentWeight, goalWeight, startingWeight }) => {
  const weightLost = startingWeight - currentWeight;
  const totalToLose = startingWeight - goalWeight;

  const percentage = (weightLost / totalToLose) * 100;

  const data = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [weightLost, totalToLose - weightLost],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // Controls the thickness of the doughnut ring
    plugins: {
      tooltip: { enabled: false }, // Disable tooltips
      legend: { display: false }, // Hide legend
      title: {
        display: true,
        text: 'My Weight Loss Progress',
        font: { size: 20 },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Doughnut data={data} options={options} />

      <div className="text-center m-auto">
        <h2 className="text-3xl font-bold pt-4">{currentWeight} lbs</h2>
        <p className="text-lg text-slate-900 m-auto">
          {totalToLose - weightLost} lbs left to achieve your goal
        </p>
      </div>
    </div>
  );
};

export default WeightLossProgress;


