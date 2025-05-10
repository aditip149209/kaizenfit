import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
export const LogWeightModal = ({onClose}) => {


  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);

  const handleSave = async () => {

  }

             
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/50 px-4 py-8">
      <div className="relative bg-[#0c2627] rounded-xl w-[320px] p-6 shadow-xl text-[#e7f6f2]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium tracking-wider">LOG WEIGHT</div>

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
          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm text-[#a0c7c7] mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                id="date"
                className="w-full px-4 py-3 bg-[#0a1f20] rounded-lg text-[#e7f6f2] text-sm outline-none"
                required
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7ed6c0]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
            </div>
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label htmlFor="weight" className="block text-sm text-[#a0c7c7] mb-2">Weight</label>
            <div className="flex">
              <input
                type="number"
                id="weight"
                step="0.1"
                min="0"
                className="flex-1 px-4 py-3 bg-[#0a1f20] rounded-l-lg text-[#e7f6f2] text-sm outline-none"
              />
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a1f20] rounded-r-lg text-[#7ed6c0] cursor-pointer">
                <span>Lb</span>
                <span className="text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm text-[#a0c7c7] mb-2">Notes</label>
            <textarea
              id="notes"
              className="w-full px-4 py-3 bg-[#0a1f20] rounded-lg text-[#e7f6f2] text-sm resize-none h-20"
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

export default LogWeightModal;
