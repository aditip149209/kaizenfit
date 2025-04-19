import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function ViewWorkout( {onClose}) {
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [userId, setUserId] = useState('');

  const [todayWorkout, setTodayWorkout] = useState('')
  const [token, setToken] = useState('');
  useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        setToken(token);
      }
    });
  useEffect(() => {
    if (token) {
      getExerciseList();
    }
  }, [token]);

  const getExerciseList = async () => {
    const response = await axios.get('http://localhost:3000/api/user/getExerciseList', {
        headers: {Authorization: `Bearer ${token}`}
    })
    setExerciseList(response.data);
  }
     

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[#073032] rounded-xl w-[340px] p-6 shadow-xl flex flex-col items-center relative">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-[#e0f7fa] text-[1.05rem] font-semibold tracking-wide">VIEW WORKOUT</div>
          <button
            className={`text-[#e0f7fa] text-xl font-bold transition-colors ${
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

        {/* Workout Name */}
        <input
          readOnly
          value="FULL BODY HIIT"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2 text-center text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />

        {/* Exercise Table */}
        <table className="w-full border-separate border-spacing-y-2 mb-6">
          <thead>
            <tr className="text-[#7ed6c0] text-sm font-semibold tracking-wide">
              <th className="bg-[#0a2324] rounded-md py-2">Exercise Name</th>
              <th className="bg-[#0a2324] rounded-md py-2">Sets</th>
              <th className="bg-[#0a2324] rounded-md py-2">Reps</th>
            </tr>
          </thead>
          <tbody className="text-[#b2dfdb] text-sm text-center">
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Pushups</td>
              <td className="bg-[#0a2324] rounded-md py-2">3</td>
              <td className="bg-[#0a2324] rounded-md py-2">15</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Donkey Kicks</td>
              <td className="bg-[#0a2324] rounded-md py-2">4</td>
              <td className="bg-[#0a2324] rounded-md py-2">15</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Low Plank</td>
              <td className="bg-[#0a2324] rounded-md py-2">5</td>
              <td className="bg-[#0a2324] rounded-md py-2">30 sec</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">High Plank</td>
              <td className="bg-[#0a2324] rounded-md py-2">5</td>
              <td className="bg-[#0a2324] rounded-md py-2">30 sec</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Tuck Ins</td>
              <td className="bg-[#0a2324] rounded-md py-2">5</td>
              <td className="bg-[#0a2324] rounded-md py-2">15</td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <button
          className="w-full bg-[#1dbd6b] hover:bg-[#16a05b] text-white font-semibold py-2 rounded-lg transition-colors mb-2"
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
          onClick={() => alert("View Workout")}
        >
          View Workout
        </button>

        <button
          className={`w-full font-semibold py-2 rounded-lg transition-colors ${
            hoverSave ? "bg-[#16a05b]" : "bg-[#1dbd6b]"
          } text-white`}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
          onClick={() => alert("Mark as completed")}
        >
          MARK AS COMPLETED
        </button>
      </div>
    </div>
  );
}
