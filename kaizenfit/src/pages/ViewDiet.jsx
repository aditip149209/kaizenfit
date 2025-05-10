import React, { useState } from "react";

export function ViewDiet({ onClose }) {
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverAction, setHoverAction] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[#073032] rounded-xl w-[340px] p-6 shadow-xl flex flex-col items-center relative">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-[#e0f7fa] text-[1.05rem] font-semibold tracking-wide">VIEW DIET</div>
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

        {/* Diet Name */}
        <input
          readOnly
          value="HIGH PROTEIN PLAN"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2 text-center text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />

        {/* Meal Table */}
        <table className="w-full border-separate border-spacing-y-2 mb-6">
          <thead>
            <tr className="text-[#7ed6c0] text-sm font-semibold tracking-wide">
              <th className="bg-[#0a2324] rounded-md py-2">MEAL</th>
           
              <th className="bg-[#0a2324] rounded-md py-2">ITEMS</th>
            </tr>
          </thead>
          <tbody className="text-[#b2dfdb] text-sm text-center">
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Breakfast</td>
           
              <td className="bg-[#0a2324] rounded-md py-2">Oats, Eggs, Banana</td>
            </tr>
           
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Lunch</td>

              <td className="bg-[#0a2324] rounded-md py-2">Grilled Chicken, Rice, Veggies</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Evening Snack</td>

              <td className="bg-[#0a2324] rounded-md py-2">Nuts, Protein Shake</td>
            </tr>
            <tr>
              <td className="bg-[#0a2324] rounded-md py-2">Dinner</td>

              <td className="bg-[#0a2324] rounded-md py-2">Fish, Quinoa, Salad</td>
            </tr>
          </tbody>
        </table>
        <input
          readOnly
          value="Total Calories: 2310 kcal"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2  text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />
        <input
          readOnly
          value="Carbohydrates: 150g"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2  text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />
        <input
          readOnly
          value="Protein: 100g"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2  text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />
        <input
          readOnly
          value="Fats: 20g"
          className="w-full bg-[#0a2324] rounded-lg px-3 py-2  text-[#e7f6f2] text-base font-medium tracking-wide mb-4 outline-none"
        />
        
      </div>
    </div>
  );
}
