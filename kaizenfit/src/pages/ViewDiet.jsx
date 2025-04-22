import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function ViewDiet({ onClose }) {
  const [hoverClose, setHoverClose] = useState(false);
  const [userID, setUserID] = useState(null);
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);

  // Get userID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.id);
    }
  }, []);

  // Fetch diets
  useEffect(() => {
    const getDiets = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/dietlist?UserID=${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDiets(res.data);
      } catch (error) {
        console.error("Error fetching diets", error);
      }
    };

    if (userID) getDiets();
  }, [userID]);

  // Group food items by timing
  const groupFoodItemsByTiming = (foodItems) => {
    const groups = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    foodItems.forEach((item) => {
      groups[item.Timing].push(item);
    });
    return groups;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[#073032] rounded-xl w-[360px] p-6 shadow-xl flex flex-col items-center relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-[#e0f7fa] text-[1.05rem] font-semibold tracking-wide">VIEW DIET</div>
          <button
            className={`text-[#e0f7fa] text-xl font-bold transition-colors ${hoverClose ? "text-red-500" : ""}`}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Diet Selection Buttons */}
        <div className="w-full flex flex-col gap-2 mb-4">
          {diets.map((diet) => (
            <button
              key={diet.DietPlanID}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                selectedDiet?.DietPlanID === diet.DietPlanID ? "bg-teal-600" : "bg-[#135D58]"
              }`}
              onClick={() => setSelectedDiet(diet)}
            >
              {diet.Name}
            </button>
          ))}
        </div>

        {/* Show Diet Details */}
        {selectedDiet && (
          <div className="w-full text-[#e0f7fa]">
            <div className="text-center font-semibold text-lg mb-2">{selectedDiet.Name}</div>
            <div className="text-sm text-center mb-4 italic">{selectedDiet.Type}</div>

            {Object.entries(groupFoodItemsByTiming(selectedDiet.FoodItems)).map(
              ([timing, items]) =>
                items.length > 0 && (
                  <div key={timing} className="mb-3">
                    <div className="text-[#b2ebf2] font-semibold mb-1 capitalize">{timing}</div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {items.map((item) => (
                        <li key={item.FoodID}>
                          {item.Name} ({item.DietPlanFoodItem.customQuantity || item.Quantity} {item.Measure || "units"})
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
