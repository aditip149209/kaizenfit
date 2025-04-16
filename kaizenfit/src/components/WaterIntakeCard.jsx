import React from "react";
import { useState } from "react";


const WaterIntakeCard = ({waterGoal}) =>{
    
    const [waterCount, setCount] = useState(0);
    const percentage = Math.min((waterCount/waterGoal) * 100, 100);
    const onLogWater = () => {
        setCount(waterCount + 1);
    }
    const onMinusLogWater = () => {
        setCount(Math.max((waterCount - 1), 0));
    }
    return (
    <>
    <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg w-full max-w-md">
    <h3 className="text-lg font-semibold mb-2">💧 Water Intake</h3>
    <div className="text-3xl font-bold">{waterCount} glasses</div>
    <div className="text-sm text-gray-400 mb-4">Goal: {waterGoal} glasses</div>
    
    {/* Progress Bar */}
    <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
      <div
        className="bg-cyan-400 h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <button onClick={onLogWater} className="mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
    ➕💧 
    </button>
    <button onClick={onMinusLogWater} className="ml-2 mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
    ➖💧 
    </button>
   

    {/* Status Message */}
    <div className={`mt-3 font-medium ${percentage >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
      {percentage >= 100 ? "Goal reached! ✅" : `${percentage.toFixed(0)}% of daily goal`}
    </div>
    </div>
    </>
    );
};

export default  WaterIntakeCard ;

