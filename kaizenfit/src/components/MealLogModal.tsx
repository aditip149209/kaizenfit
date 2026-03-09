import React, { useState } from 'react';

export interface MealLogData {
  mealType: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize?: string;
}

interface MealLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MealLogData) => void;
  mealType: string;
}

export default function MealLogModal({ isOpen, onClose, onConfirm, mealType }: MealLogModalProps) {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [servingSize, setServingSize] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      mealType,
      foodName,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
      servingSize: servingSize || undefined,
    });
    // Reset form
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setServingSize('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black">
          <h2 className="font-heading text-xl uppercase text-center">
            LOG {mealType}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Food Name */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Food Name *
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="Chicken Breast"
              required
            />
          </div>

          {/* Serving Size */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Serving Size
            </label>
            <input
              type="text"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="200g or 1 cup"
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Calories *
            </label>
            <input
              type="number"
              step="0.1"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="250"
              required
            />
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-heading uppercase text-xs mb-2">
                Protein (g) *
              </label>
              <input
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="40"
                required
              />
            </div>

            <div>
              <label className="block font-heading uppercase text-xs mb-2">
                Carbs (g) *
              </label>
              <input
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="10"
                required
              />
            </div>

            <div>
              <label className="block font-heading uppercase text-xs mb-2">
                Fats (g) *
              </label>
              <input
                type="number"
                step="0.1"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="5"
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
            <p className="font-mono text-xs text-gray-700">
              💡 TIP: Use the barcode scanner for quick entry (coming soon)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 bg-kaizen-green text-black border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint transition-colors"
            >
              ADD ENTRY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
