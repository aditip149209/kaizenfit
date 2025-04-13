import React from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    return(
        <>

    <div className="min-h-screen bg-white text-black p-6 md:p-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Fitness Dashboard</h1>
          <p className="text-gray-600">Your health, your way 💪</p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Diet Plan Card */}
          <div className="bg-orange-100 border border-orange-400 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">Diet Plan</h2>
            <p className="text-gray-700">High protein, moderate carbs, healthy fats.</p>
          </div>

          {/* Today's Workout */}
          <div className="bg-teal-100 border border-teal-400 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-teal-800 mb-2">Today's Workout</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Pushups</li>
              <li>Deadlifts</li>
              <li>Cardio (20 mins)</li>
            </ul>
          </div>

          {/* Progress Tracker */}
          <div className="bg-indigo-100 border border-indigo-400 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">Progress</h2>
            <p className="text-gray-700">Weight down 3kg 🏋️‍♂️</p>
          </div>

          {/* Calories Info */}
          <div className="bg-green-100 border border-green-400 rounded-xl p-6 shadow-md col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Calorie Intake</h2>
            <p className="text-gray-700">Today: 1800 kcal / Goal: 2000 kcal</p>
          </div>

          {/* Extra Widget / Button */}
          <div className="col-span-full flex justify-center">
            <button className="bg-teal-800 text-white px-6 py-3 rounded-full shadow hover:bg-teal-900 transition">
              Update Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  

        </>
    )
}

