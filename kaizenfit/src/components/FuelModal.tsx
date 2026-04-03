import React, { useState, useEffect } from 'react';

interface FuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (fuel: FuelData) => void;
}

export interface FuelData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meal: string;
}

const FuelModal: React.FC<FuelModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState<FuelData>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    meal: 'breakfast'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', calories: 0, protein: 0, carbs: 0, fats: 0, meal: 'breakfast' });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md">
        
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            Log Fuel_
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 font-bold text-xl transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Food Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
              placeholder="e.g., Chicken Breast"
              required
            />
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Meal Type</label>
            <select 
              value={formData.meal}
              onChange={(e) => setFormData({...formData, meal: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Calories</label>
              <input 
                type="number" 
                value={formData.calories}
                onChange={(e) => setFormData({...formData, calories: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Protein (g)</label>
              <input 
                type="number" 
                value={formData.protein}
                onChange={(e) => setFormData({...formData, protein: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Carbs (g)</label>
              <input 
                type="number" 
                value={formData.carbs}
                onChange={(e) => setFormData({...formData, carbs: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="0"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Fats (g)</label>
              <input 
                type="number" 
                value={formData.fats}
                onChange={(e) => setFormData({...formData, fats: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black"
            >
              Log Fuel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuelModal;
