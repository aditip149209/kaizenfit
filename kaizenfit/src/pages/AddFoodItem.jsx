import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Don’t forget this if it’s not imported already

function AddFoodItem({ onClose}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [measure, setMeasure] = useState("grams");
  const [protein, setProtein] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [fats, setFats] = useState("");
  const [timing, setTiming] = useState("snack");
  const [quantity, setQuantity] = useState("1");
  const [type, setType] = useState("vegetarian");
  const [avgWeight, setAvgWeight] = useState("");

  const [hoverClose, setHoverClose] = useState(false);

  const token = localStorage.getItem("token");

  const handleSave = async () => {
    if (
      !name ||
      !calories ||
      !protein ||
      !carbohydrates ||
      !fats ||
      !timing ||
      !quantity ||
      !type
    ) {
      toast.warn("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/createnewfoodItem",
        {
          Name: name,
          Description: description,
          Calories: Number(calories),
          Measure: measure,
          Protein: Number(protein),
          Carbohydrates: Number(carbohydrates),
          Fats: Number(fats),
          Timing: timing,
          Quantity: Number(quantity),
          Type: type,
          AvgWeightPerServing: avgWeight
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Food Item added!");
      setName("");
      setDescription("");
      setCalories("");
      setMeasure("grams");
      setProtein("");
      setCarbohydrates("");
      setFats("");
      setTiming("snack");
      setQuantity("1");
      setType("vegetarian");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-[700px] bg-[#182828] rounded-[30px] p-8 relative text-white">
        <button
          className={`absolute top-10 right-10 text-[#e0f7fa] text-xl font-bold transition-colors  ${
            hoverClose ? "text-red-500" : ""
          }`}
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-center text-[#7ed6c0] text-xl font-medium mb-6">
          ADD FOOD ITEM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Food Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={3}
            className="col-span-full resize-none px-4 py-2 rounded-[20px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Calories *"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <select
            className="h-10 px-4 rounded-[31px] bg-[#182828] border border-white/30 text-white text-sm"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          >
            <option value="grams">grams</option>
            <option value="ml">ml</option>
            <option value="pieces">pieces</option>
          </select>
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Protein (g) *"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Carbohydrates (g) *"
            value={carbohydrates}
            onChange={(e) => setCarbohydrates(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-[#182828] border border-white/30 text-white text-sm"
            placeholder="Fats (g) *"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
          />
          <select
            className="h-10 px-4 rounded-[31px] bg-[#182828] border border-white/30 text-white text-sm"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Quantity *"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            className="h-10 px-4 rounded-[31px] bg-[#182828] border border-white/30 text-white text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non_vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="eggetarian">Eggetarian</option>
          </select>

          <input
        type="number"
        disabled={measure === "pieces"}
        className={`h-10 px-4 rounded-[31px] ${
          measure === "pieces"
            ? "bg-transparent text-gray-400 cursor-not-allowed"
            : "bg-transparent text-white"
          } border border-white/30 text-sm`}
        placeholder="Avg Weight Per Serving"
        value={avgWeight}
        onChange={(e) => setAvgWeight(e.target.value)}
        />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="w-64 h-12 bg-teal-700 rounded-[31px] border border-white/20 text-white text-xl font-normal"
          >
            SAVE FOOD ITEM
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default AddFoodItem;
