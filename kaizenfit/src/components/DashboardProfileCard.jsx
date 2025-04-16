import React from "react";
import { useNavigate } from "react-router-dom";


const DashboardProfileCard = () => {
    return (
        <>
         <div className="w-80 h-80 bg-slate-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <img src="/user.png" alt="skjs" className="h-24 w-24 mt-3"/>

            <h3 className="text-2xl font-semibold mt-3 ">Name</h3>
          <p className="text-xl font-bold">Age 20, Female</p>
        </div>

        </>

    );
};

export default DashboardProfileCard;
