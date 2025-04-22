import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EditWeightGoal = ({ onClose, userId, token }) => {

  const [hoverClose, setHoverClose] = useState(false);
  const [targetWeight, setTargetWeight] = useState(""); // State to store target weight

  const handleSave = async (e) => {
    e.preventDefault();

    // Ensure target weight is filled in
    if (!targetWeight || targetWeight <= 0) {
      toast.error("Please provide a valid target weight");
      return;
    }

    try {
      // Send a POST request to update weight goal
      const response = await axios.post(
        'http://localhost:3000/api/user/changeweightgoal',
        {
          userId: userId, // User ID passed as prop
          updatedData: {
            GoalWeight: targetWeight, // Send the target weight as weightGoal
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      onClose(); // Close the modal on success
    } catch (error) {
      toast.error('Error updating weight goal');
      console.error("Error updating weight goal", error);
    }
  };

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
        <form onSubmit={handleSave}>
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
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)} // Update state with input
              />
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a1f20] rounded-r-lg text-[#7ed6c0] cursor-pointer">
                <span>Kg</span>
              </div>
            </div>
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
