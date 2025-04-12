import React from "react";
import { useNavigate } from "react-router-dom";

const CreateYourWorkout = () => {
    const navigate = useNavigate();
    const handleCreateWorkout = (e) => {
        e.preventDefault();
        navigate("/createWorkout");
    };

    return (
        <>
        <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg w-full max-w-md items-center justify-center flex flex-col">
            
            <h2 className="text-gray-200">Create Your Workout Plan
            </h2>
            <button onClick = {handleCreateWorkout} className="ml-2 mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Create</button>
        </div>

        </>
    );
};

export default CreateYourWorkout;


