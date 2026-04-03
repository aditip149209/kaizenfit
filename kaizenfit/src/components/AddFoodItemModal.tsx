import React, { useEffect, useState } from 'react';

export interface NewFoodItemData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: number;
  servingUnit?: string;
}

interface AddFoodItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: NewFoodItemData) => void;
  initialName?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function AddFoodItemModal({
  isOpen,
  onClose,
  onConfirm,
  initialName = '',
  showBackButton = false,
  onBack,
}: AddFoodItemModalProps) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [servingSize, setServingSize] = useState('1');
  const [servingUnit, setServingUnit] = useState('grams');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(initialName);
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setServingSize('1');
    setServingUnit('grams');
  }, [isOpen, initialName]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const safeServingSize = Number.isFinite(Number(servingSize)) && Number(servingSize) > 0
      ? Number(servingSize)
      : 1;

    onConfirm({
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      servingSize: safeServingSize,
      servingUnit,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
          <div className="w-10" aria-hidden="true"></div>
          <h2 className="font-heading text-xl uppercase text-center">Add New Food Item</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-red-500 font-bold text-xl transition-colors"
            aria-label="Close add food modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-heading uppercase text-sm mb-2">Food Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="Paneer Bhurji"
              required
            />
          </div>

          <div>
            <label className="block font-heading uppercase text-sm mb-2">Calories *</label>
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

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-heading uppercase text-xs mb-2">Protein (g) *</label>
              <input
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="20"
                required
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-2">Carbs (g) *</label>
              <input
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="15"
                required
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-2">Fats (g) *</label>
              <input
                type="number"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-heading uppercase text-sm mb-2">Base Serving Size</label>
              <input
                type="number"
                step="0.1"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-sm mb-2">Base Unit</label>
              <select
                value={servingUnit}
                onChange={(e) => setServingUnit(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
              >
                <option value="grams">grams</option>
                <option value="katori">katori</option>
                <option value="bowl">bowl</option>
                <option value="glass">glass</option>
                <option value="spoon">spoon</option>
                <option value="piece">piece</option>
                <option value="pieces">pieces</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {showBackButton && (
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-kaizen-lightgreen border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-kaizen-green border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint"
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
