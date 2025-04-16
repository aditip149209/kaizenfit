import React from "react";

const YourPlanWorkoutSection = () => {
    return (
        <>
        <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg w-full max-w-md items-center justify-center flex flex-col">

            <h2 className="text-gray-200">Your Workout Plan
            </h2>
            <h2>No Plans?</h2>
            <button className="ml-2 mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Get a Plan now</button>
        </div>
        </>
    );
}

export default YourPlanWorkoutSection;