import React from "react";
import YourPlanWorkoutSection from "./YourPlanWorkoutSection";
import CreateYourWorkout from "./CreateYourWorkout";

const WorkoutSection = () => {
    return (
        <>
        <div className="mb-auto bg-gray-800 text-white rounded-lg p-2 shadow-md">
                <h2 className="text-xl font-semibold m-auto text-gray-300">🏃‍♂️ Workout Plans</h2>
        </div>
        <div className="flex gap-4">
            <YourPlanWorkoutSection/>
            <CreateYourWorkout />
        </div>
        </>
    );
}
export default WorkoutSection;

