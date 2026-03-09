import React, { useState, useEffect } from 'react';

interface DietPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (plan: DietPlanData) => void;
}

export interface DietPlanData {
  name: string;
  goal: string;
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
  notes: string;
}

const DietPlanModal: React.FC<DietPlanModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState<DietPlanData>({
    name: '',
    goal: 'maintenance',
    calorieTarget: 2000,
    proteinTarget: 150,
    carbsTarget: 200,
    fatsTarget: 65,
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ 
        name: '', 
        goal: 'maintenance', 
        calorieTarget: 2000, 
        proteinTarget: 150, 
        carbsTarget: 200, 
        fatsTarget: 65,
        notes: '' 
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center sticky top-0">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            Create Diet Plan_
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 font-bold text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Plan Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
              placeholder="e.g., Lean Bulk Protocol"
              required
            />
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Goal</label>
            <select 
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
            >
              <option value="cut">Cut (Fat Loss)</option>
              <option value="maintenance">Maintenance</option>
              <option value="bulk">Bulk (Muscle Gain)</option>
              <option value="recomp">Recomposition</option>
            </select>
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Daily Calorie Target</label>
            <input 
              type="number" 
              value={formData.calorieTarget}
              onChange={(e) => setFormData({...formData, calorieTarget: Number(e.target.value)})}
              className="w-full border-3 border-black p-3 font-mono text-lg font-bold focus:bg-kaizen-lightgreen focus:outline-none"
              min="1000"
              required
            />
          </div>

          <div className="bg-kaizen-lightgreen border-3 border-black p-4">
            <h3 className="font-heading uppercase text-xs mb-3 font-bold">Macro Targets (grams)</h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-mono text-xs mb-1">Protein</label>
                <input 
                  type="number" 
                  value={formData.proteinTarget}
                  onChange={(e) => setFormData({...formData, proteinTarget: Number(e.target.value)})}
                  className="w-full border-2 border-black p-2 font-mono text-sm focus:outline-none"
                  min="0"
                />
              </div>
              <div>
                <label className="block font-mono text-xs mb-1">Carbs</label>
                <input 
                  type="number" 
                  value={formData.carbsTarget}
                  onChange={(e) => setFormData({...formData, carbsTarget: Number(e.target.value)})}
                  className="w-full border-2 border-black p-2 font-mono text-sm focus:outline-none"
                  min="0"
                />
              </div>
              <div>
                <label className="block font-mono text-xs mb-1">Fats</label>
                <input 
                  type="number" 
                  value={formData.fatsTarget}
                  onChange={(e) => setFormData({...formData, fatsTarget: Number(e.target.value)})}
                  className="w-full border-2 border-black p-2 font-mono text-sm focus:outline-none"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Notes (Optional)</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none resize-none"
              rows={3}
              placeholder="Meal timing, preferences, restrictions..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 bg-white text-black border-3 border-black py-3 font-heading uppercase text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietPlanModal;
