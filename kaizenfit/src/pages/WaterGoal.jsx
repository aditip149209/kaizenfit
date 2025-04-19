import React, { useState } from 'react';

const WaterGoalModal = ({onClose}) => {
  const [glasses, setGlasses] = useState(2);
  const [volume, setVolume] = useState('250');
  const [isHovered, setIsHovered] = useState(false);

  const handleGlassChange = async (delta) => {
    setGlasses(prev => Math.max(1, Math.min(prev + delta, 20)));
    // TODO: Add API logic
  };
  
   const [hoverClose, setHoverClose] = useState(false);
      const [hoverSave, setHoverSave] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] font-montserrat text-[#e7f6f2]">
      <div className="bg-[#073032] rounded-xl w-[320px] px-5 pt-7 pb-5 shadow-xl relative">
        <div className="flex justify-between items-center text-[1.05rem] font-semibold tracking-wide mb-4">
          <span>EDIT WATER GOAL</span>
          <button
            className={` absolute top-10 right-10 text-[#e0f7fa] text-xl font-bold transition-colors ${
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

        <div className="text-sm text-[#a0c7c7] mb-2 font-medium">
          Current Water Goal:
          <span className="text-[#7ed6c0] font-semibold ml-1">8 glasses</span>
        </div>

        <label className="text-sm text-[#a0c7c7] mb-1 font-medium block">New Water Goal:</label>

        <div className="flex items-center gap-2.5 my-4">
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
            onChange={(e) => setVolume(e.target.value)}
          >
            <option value="250">250</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </select>

          <span className="text-[#b2dfdb] text-sm">ml</span>
        </div>

        <button
          className={`block mx-auto mt-3 rounded-2xl px-8 py-2 font-semibold text-white text-base transition-colors ${
            isHovered ? 'bg-[#16a05b]' : 'bg-[#1dbd6b]'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => console.log('Save goal', { glasses, volume })}
        >
          Save Goal
        </button>
      </div>
    </div>
  );
};

export default WaterGoalModal;
