import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddFoodModal from "../components/AddFoodModal";
import axios from "axios";

export default function TrackCalories({ onClose, token, id }) {
  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  const [foodList, setFoodList] = useState([]);
  const [mealData, setMealData] = useState({
    Breakfast: [],
    Lunch: [],
    Snacks: [],
    Dinner: [],
  });

  const [caloriesInfo, setCaloriesInfo] = useState({
    total: 0,
    perMeal: {
      Breakfast: 0,
      Lunch: 0,
      Snacks: 0,
      Dinner: 0,
    },
  });

  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const getFoodItemList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/getfooditemlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoodList(response.data || []);
    } catch (err) {
      console.error("Error fetching food list", err);
      toast.error("Could not fetch food item list.");
    }
  };

  const getLoggedFoodList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/getfoodlogfortoday",
        { userId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const allFoodItems = response.data.todayLog?.FoodItems || [];
      const sorted = {
        Breakfast: allFoodItems.filter((i) => i.Timing === "breakfast"),
        Lunch: allFoodItems.filter((i) => i.Timing === "lunch"),
        Snacks: allFoodItems.filter((i) => i.Timing === "snack"),
        Dinner: allFoodItems.filter((i) => i.Timing === "dinner"),
      };

      setMealData(sorted);
      const calInfo = calculateCalories(sorted);
      setCaloriesInfo(calInfo);
    } catch (error) {
      console.error("Failed to get food log", error);
      toast.error("Could not fetch logged food items.");
    }
  };

  const calculateCalories = (mealData) => {
    let totalCalories = 0;
    const caloriesPerMeal = {};

    for (const [meal, items] of Object.entries(mealData)) {
      const mealCalories = items?.reduce((sum, item) => {
        const qty = item?.LogTodayFoodItem?.CustomQuantity || 0;
        const avg = item?.FoodServingReference?.AvgWeightPerServing;
        const baseQty = item?.Quantity || 1;
        const calPerServing = item?.Calories || 0;

        if (avg) {
          return sum + (avg * qty) / baseQty;
        } else {
          return sum + calPerServing * qty;
        }
      }, 0);

      caloriesPerMeal[meal] = Math.round(mealCalories);
      totalCalories += mealCalories;
    }

    return {
      total: Math.round(totalCalories),
      perMeal: caloriesPerMeal,
    };
  };

  useEffect(() => {
    getFoodItemList();
    getLoggedFoodList();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-[#0c2324] text-[#e7f6f2] font-[Montserrat] rounded-2xl p-8 w-full max-w-3xl mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7ed6c0] hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold tracking-wide">TRACK CALORIES</h2>
          <p className="text-sm text-[#a0c7c7] ml-6 flex-1">AIM TO STAY WITHIN YOUR SWEET SPOT</p>
          <div className="border border-[#7ed6c0] rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center text-sm font-medium relative">
            <span>{caloriesInfo.total}</span>
            <span className="text-[10px] text-[#a0c7c7]">Cals</span>
          </div>
        </div>

        <hr className="border-t border-[#183031] mt-0" />

        <div className="flex gap-6 mt-4 justify-between w-full flex-wrap">
          {meals.map((meal) => (
            <div
              key={meal}
              className="bg-[#113131] rounded-xl flex-1 min-w-[120px] p-4 shadow-md flex flex-col"
            >
              <div className="flex justify-between">
                <h3 className="text-base font-semibold mb-3 tracking-wide capitalize">{meal}</h3>
                <button
                  onClick={() => {
                    setCurrentMeal(meal);
                    setShowAddFoodModal(true);
                  }}
                  className="text-[#7ed6c0] text-2xl font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-2 text-sm text-[#b2dfdb] font-medium">
                {mealData[meal]?.length > 0 ? (
                  mealData[meal].map((food) => (
                    <div key={food.FoodID} className="flex items-center justify-between">
                      <span>🍽️ {food?.Name || "Unnamed"}</span>
                      <span>{food?.Calories || 0} Cals</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs italic text-[#86b5b0]">No items logged</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {showAddFoodModal && (
          <AddFoodModal
            onClose={() => setShowAddFoodModal(false)}
            foodList={foodList || []}
            currentMeal={currentMeal}
            userId={id}
          />
        )}
      </div>
    </div>
  );
}
