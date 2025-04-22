import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const WaterGoalModal = ({ onClose, goalGlasses, setGoalGlasses, onUpdate }) => {
  const [glasses, setGlasses] = useState(2);
  const [volume, setVolume] = useState(250);
  

  const [isHoveredSave, setIsHoveredSave] = useState(false);
  const [isHoveredUpdate, setIsHoveredUpdate] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);

  const token = localStorage.getItem('token');
  const id = jwtDecode(token).id;

  const handleGlassChange = (delta) => {
    setGlasses(prev => Math.max(1, Math.min(prev + delta, 20)));
  };

  
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3000/api/user/editgoalwaterintake', {
        userId: id,
        goalIntakeGlasses: glasses,
        goalIntakeVolume: volume
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Water intake goal updated!");
      onUpdate();
      onClose();
      
      
    } catch (err) {
      console.error(err);
      toast.error("There was an error updating your goal.");
    }
  };



  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] font-montserrat text-[#e7f6f2]">
          <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
      <div className="bg-[#073032] rounded-xl w-[340px] px-6 pt-7 pb-6 shadow-xl relative">
        <div className="flex justify-between items-center text-[1.05rem] font-semibold tracking-wide mb-4">
          <span>EDIT WATER GOAL</span>
          <button
            className={`absolute top-6 right-6 text-[#e0f7fa] text-xl font-bold transition-colors ${
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

        {/* Current Goal Display */}
        <div className="mb-4">
          <p className="text-sm text-[#a0c7c7] font-medium">
            Current Water Goal:
            <span className="text-[#7ed6c0] font-semibold ml-1">
              {goalGlasses} glasses 
            </span>
          </p>
        </div>

        {/* Goal Adjust Section */}
        <div className="mb-5">
          <label className="text-sm text-[#a0c7c7] mb-1 font-medium block">New Water Goal:</label>
          <div className="flex items-center gap-2.5 mt-2">
            <div className="flex items-center bg-[#092223] rounded-md overflow-hidden h-10">
              <button
                className="w-[34px] h-full text-[#7ed6c0] text-xl font-semibold transition-colors hover:bg-[#174243]"
                onClick={() => handleGlassChange(-1)}
              >
                –
              </button>
              <input
                type="text"
                readOnly
                value={glasses}
                className="w-[34px] text-center bg-transparent border-none text-[#e7f6f2] text-base font-semibold outline-none"
              />
              <button
                className="w-[34px] h-full text-[#7ed6c0] text-xl font-semibold transition-colors hover:bg-[#174243]"
                onClick={() => handleGlassChange(1)}
              >
                +
              </button>
            </div>

            <span className="text-[#b2dfdb] text-sm">glasses</span>

            <select
              className="bg-[#092223] text-[#7ed6c0] text-base font-medium rounded-md border-none px-3 py-2 ml-0.5"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
            >
              <option value="250">250</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>

            <span className="text-[#b2dfdb] text-sm">ml</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className={`w-full rounded-2xl px-8 py-2 font-semibold text-white text-base transition-colors ${
              isHoveredSave ? 'bg-[#16a05b]' : 'bg-[#1dbd6b]'
            }`}
            onMouseEnter={() => setIsHoveredSave(true)}
            onMouseLeave={() => setIsHoveredSave(false)}
            onClick={handleSave}
          >
            Save Goal
          </button>

          
        </div>
      </div>
  
    </div>
  );
};

export default WaterGoalModal;
