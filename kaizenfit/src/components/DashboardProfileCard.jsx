import React from "react";
import { useNavigate } from "react-router-dom";


const DashboardProfileCard = () => {
    return (
        <>
         <div className="w-48 h-48 bg-slate-800 text-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-sm text-gray-400">Goal: {goal}</span>
    </div>


        </>

    );
};

export default DashboardProfileCard;
