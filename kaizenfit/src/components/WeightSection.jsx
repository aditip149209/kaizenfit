import React from "react";

import Trends from "./TrendWeight";
import WeightLossProgress from "./WeightChart";



const WeightSection = () => {
    const currentWeight = 148; // Replace with dynamic data
    const goalWeight = 135;
    const startingWeight = 154;

    const trendsData = [
        { label: 'Last 7 Days', value: '-2' },
        { label: 'Last 30 Days', value: '-4' },
        { label: 'All Time', value: '-6' },
    ];

    return (
        <>
        <div className="mb-auto bg-gray-800 text-white rounded-lg p-2 shadow-md">
            <h2 className="text-xl font-semibold m-auto text-gray-300">🏋️‍♀️ Weight and Progress</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 gap-y-8 text-xl font-semibold m-auto text-gray-300 bg-slate-600 py-8 px-8 rounded-lg">
        <div className="flex flex-col items-center mb-6">
        <WeightLossProgress
          currentWeight={currentWeight}
          goalWeight={goalWeight}
          startingWeight={startingWeight}
        />
        <div className="flex flex-col justify-center items-center w-full mt-4 text-slate-900 text-lg m-auto">
          <span>Start Weight: {startingWeight} lbs</span>
          <span>Goal Weight: {goalWeight} lbs</span>
        </div>

        <h3 className="text-3xl font-semibold mb-4 pt-4">Trends</h3>
        <Trends trends={trendsData} />
        </div>
        </div>
        </>
    );
}
export default WeightSection;

