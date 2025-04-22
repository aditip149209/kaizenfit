import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const LogWeightModal = ({ onClose, userId, token }) => {
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    weight: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Save button click
  const handleSave = async (e) => {
    e.preventDefault();
    const { date, weight } = formData;

    if (!date || !weight) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/logweight', // Replace with your API endpoint
        {
          userId: userId,
          date: date,
          weight: weight
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Weight logged successfully');
      onClose(); // Close modal on successful save
    } catch (error) {
      toast.error('Error logging weight');
      console.error('Error logging weight', error);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,  // Update the date
    }));
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/50 px-4 py-8">
      <div className="relative bg-[#0c2627] rounded-xl w-[320px] p-6 shadow-xl text-[#e7f6f2]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium tracking-wider">LOG WEIGHT</div>

          <button
            className={` absolute top-10 right-10 text-[#e0f7fa] text-xl font-bold transition-colors ${
              hoverClose ? 'text-red-500' : ''
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
          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm text-[#a0c7c7] mb-2">
              Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd" // Date format (optional)
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
            <label htmlFor="weight" className="block text-sm text-[#a0c7c7] mb-2">
              Weight
            </label>
            <div className="flex">
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="flex-1 px-4 py-3 bg-[#0a1f20] rounded-l-lg text-[#e7f6f2] text-sm outline-none"
                required
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

export default LogWeightModal;
