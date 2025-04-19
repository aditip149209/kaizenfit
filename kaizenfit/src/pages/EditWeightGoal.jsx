import React from 'react';
import { useState, useEffect } from 'react';

export const EditWeightGoal = ({onClose}) => {

    const [hoverClose, setHoverClose] = useState(false);
    const [hoverSave, setHoverSave] = useState(false);
    
    const handleSave = async () => {
        
    }
    
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/50 px-4 py-8">
      <div className="relative bg-[#0c2627] rounded-xl w-[320px] p-6 shadow-xl text-[#e7f6f2]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium tracking-wider">EDIT WEIGHT GOAL</div>
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

        {/* Form */}
        <form>
          {/* Target Weight */}
          <div className="mb-4">
            <label htmlFor="targetWeight" className="block text-sm text-[#a0c7c7] mb-2">
              Target Weight
            </label>
            <div className="flex">
              <input
                type="number"
                id="targetWeight"
                step="0.1"
                min="0"
                className="flex-1 px-4 py-3 bg-[#0a1f20] rounded-l-lg text-[#e7f6f2] text-sm outline-none"
                placeholder="e.g. 140"
              />
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a1f20] rounded-r-lg text-[#7ed6c0] cursor-pointer">
                <span>Kg</span>
                <span className="text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label htmlFor="goalNotes" className="block text-sm text-[#a0c7c7] mb-2">Notes</label>
            <textarea
              id="goalNotes"
              className="w-full px-4 py-3 bg-[#0a1f20] rounded-lg text-[#e7f6f2] text-sm resize-none h-20"
              placeholder="Optional notes..."
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-[100px] py-2 bg-[#1dbd6b] text-white font-medium text-sm rounded-full mx-auto block mt-4 hover:bg-[#16a05b]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWeightGoal;
