import React, { useEffect } from "react";

export default function TrackCalories({ onClose }) {
  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Content */}
      <div className="relative bg-[#0c2324] text-[#e7f6f2] font-[Montserrat] rounded-2xl p-8 w-full max-w-3xl mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7ed6c0] hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold tracking-wide">TRACK CALORIES</h2>
          <p className="text-sm text-[#a0c7c7] ml-6 flex-1">
            AIM TO STAY WITHIN YOUR SWEET SPOT
          </p>
          <div className="border border-[#7ed6c0] rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center text-sm font-medium relative">
            <span className="text-[#7ed6c0] text-lg font-semibold mb-1">1230</span>
            Cals Left
          </div>
        </div>

        <hr className="border-t border-[#183031] mt-0" />

        {/* Date */}
        <div className="text-center text-[#b2dfdb] text-sm font-medium tracking-wider mt-2">
          TODAY, 6TH DEC &nbsp; &#8250;
        </div>

        {/* Meals Section */}
        <div className="flex gap-6 mt-4 justify-between w-full flex-wrap">
          {meals.map((meal) => (
            <div
              key={meal}
              className="bg-[#113131] rounded-xl flex-1 min-w-[120px] p-4 shadow-md flex flex-col"
            >
              <h3 className="text-base font-semibold mb-3 tracking-wide">{meal}</h3>
              <div className="flex flex-col gap-2 mt-2 text-sm text-[#b2dfdb] font-medium">
                <div className="flex items-center gap-2">
                  <span>🌾</span> Carbs
                </div>
                <div className="flex items-center gap-2">
                  <span>🥚</span> Proteins
                </div>
                <div className="flex items-center gap-2">
                  <span>💧</span> Fats
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-6 mt-7">
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2 border border-[#7ed6c0] text-[#e7f6f2] rounded-full px-6 py-2 font-medium text-base hover:bg-[#7ed6c0] hover:text-[#182828] transition"
          >
            <span>📖</span> My Recipes
          </a>
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2 border border-[#7ed6c0] text-[#e7f6f2] rounded-full px-6 py-2 font-medium text-base hover:bg-[#7ed6c0] hover:text-[#182828] transition"
          >
            <span>🍽️</span> My Meals
          </a>
        </div>
      </div>
    </div>
  );
}
