import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function ViewWorkout( {onClose, workout}) {
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);

  const exerciseList = workout.Exercises.map((exercise) => ({
    Name: exercise.Name,  
    defaultReps: exercise.defaultReps,
    defaultSets: exercise.defaultSets
  }));


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[#073032] rounded-xl w-[340px] p-6 shadow-xl flex flex-col items-center relative">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-[#e0f7fa] text-[1.05rem] font-semibold tracking-wide">VIEW WORKOUT</div>
          <button
            className={`text-[#e0f7fa] text-xl font-bold transition-colors ${
              hoverClose ? "text-red-500" : ""
            }`}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Workout Name */}
        <input
          readOnly
          value={workout.Name}
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2 text-center text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />

        {/* Exercise Table */}
        {exerciseList.map((exercise, index) => (
          <div key={index} className="w-full mb-2">
            <div className="flex justify-between items-center bg-[#0a2324] rounded-lg px-3 py-2">
              <span className="text-[#e7f6f2] text-base font-medium">{exercise.Name}</span>
              <span className="text-[#e7f6f2] text-base font-medium">
                {exercise.defaultReps} reps, {exercise.defaultSets} sets
              </span>
            </div>
          </div>
        ))}

        {/* Save Button */}
        

        
      </div>
    </div>
  );
}
