import React, { useState } from "react";


const CaloriesConsumed = ({calGoal}) =>{
    
    const [calConsumed, setCal] = useState(0);
    const percentage = Math.min((calConsumed/calGoal) * 100, 100);
    
    return (
    <>
    <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg w-full max-w-md">
    <h3 className="text-lg font-semibold mb-2">🍽️ Calorie Intake</h3>
    <div className="text-3xl font-bold">{calConsumed} cal</div>
    <div className="text-sm text-gray-400 mb-4">Goal: {calGoal} cal</div>
    
    {/* Progress Bar */}
    <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
      <div
        className="bg-cyan-400 h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
    

    {/* Status Message */}
    <div className={`mt-3 font-medium ${percentage >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
      {percentage >= 100 ? "Goal reached! ✅" : `${percentage.toFixed(0)}% of daily goal`}
    </div>
    </div>
    </>
    );
};

export default  CaloriesConsumed;
