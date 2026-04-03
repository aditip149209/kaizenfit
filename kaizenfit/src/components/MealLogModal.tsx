import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { normalizeServingUnit } from '../lib/measurementConfig';

export interface MealLogData {
  mealType: string;
  foodItemId: string;
  foodName: string;
  servingSize?: number;
  servingUnit?: string;
  baseServingSize?: number;
  baseServingUnit?: string;
}

interface MealLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MealLogData) => void;
  mealType: string;
  initialSearchTerm?: string;
  onOpenAddFood: (prefillName: string) => void;
}

export default function MealLogModal({ isOpen, onClose, onConfirm, mealType, initialSearchTerm = '', onOpenAddFood }: MealLogModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [foodOptions, setFoodOptions] = useState<Array<any>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servingSize, setServingSize] = useState('');
  const [servingUnit, setServingUnit] = useState('grams');

  const servingUnitOptions = ['grams', 'katori', 'bowl', 'glass', 'spoon', 'piece', 'pieces'];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!debouncedSearchTerm) {
      setFoodOptions([]);
      setIsSearching(false);
      return;
    }

    let active = true;

    const fetchFoodOptions = async () => {
      try {
        setIsSearching(true);
        const response = await api.get('/nutrition/foods', {
          params: {
            search: debouncedSearchTerm,
            limit: 8,
            offset: 0,
          },
        });

        if (!active) {
          return;
        }

        setFoodOptions(response.data?.rows ?? []);
      } catch (error) {
        if (active) {
          setFoodOptions([]);
        }
        console.error('Failed to search foods:', error);
      } finally {
        if (active) {
          setIsSearching(false);
        }
      }
    };

    fetchFoodOptions();

    return () => {
      active = false;
    };
  }, [debouncedSearchTerm, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const seed = initialSearchTerm.trim();
    setSearchTerm(seed);
    setDebouncedSearchTerm(seed);
    setFoodOptions([]);
    setSelectedFood(null);
    setServingSize('');
    setServingUnit('grams');
  }, [isOpen, mealType, initialSearchTerm]);

  if (!isOpen) return null;

  const selectExistingFood = (food: any) => {
    setSelectedFood(food);
    setSearchTerm(String(food?.name ?? ''));
    setServingSize(food?.servingSize != null ? String(food.servingSize) : '');
    setServingUnit(normalizeServingUnit(food?.servingUnit));
  };

  const clearSelectedFood = () => {
    setSelectedFood(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFood?.id) {
      return;
    }

    const trimmedName = searchTerm.trim();
    if (!trimmedName) {
      return;
    }

    const parsedServingSize = servingSize ? Number.parseFloat(servingSize) : 1;
    const safeServingSize = Number.isFinite(parsedServingSize) && parsedServingSize > 0 ? parsedServingSize : 1;

    const payload: MealLogData = {
      mealType,
      foodItemId: selectedFood.id,
      foodName: trimmedName,
      servingSize: safeServingSize,
      servingUnit: servingUnit || undefined,
      baseServingSize: selectedFood?.servingSize != null ? Number(selectedFood.servingSize) : undefined,
      baseServingUnit: selectedFood?.servingUnit ?? undefined,
    };

    onConfirm(payload);

    setSearchTerm('');
    setDebouncedSearchTerm('');
    setFoodOptions([]);
    setSelectedFood(null);
    setServingSize('');
    setServingUnit('grams');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white border-4 border-black max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
          <div className="w-10" aria-hidden="true"></div>
          <h2 className="font-heading text-xl uppercase text-center">
            LOG {mealType}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-red-500 font-bold text-xl transition-colors"
            aria-label="Close meal log modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Food Search */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Search Food *
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (selectedFood && e.target.value !== selectedFood.name) {
                  clearSelectedFood();
                }
              }}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="Chicken Breast"
              required
            />

            <div className="mt-2 border-2 border-black bg-white max-h-36 overflow-y-auto">
              {isSearching ? (
                <p className="font-mono text-xs p-2 uppercase text-gray-600">Searching...</p>
              ) : !debouncedSearchTerm ? (
                <p className="font-mono text-xs p-2 uppercase text-gray-600">Type to search foods.</p>
              ) : foodOptions.length > 0 ? (
                foodOptions.map((food) => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => selectExistingFood(food)}
                    className="w-full text-left px-3 py-2 border-b border-black/20 last:border-b-0 hover:bg-kaizen-lightgreen/60"
                  >
                    <span className="font-heading uppercase text-xs">{food.name}</span>
                    <span className="font-mono text-[10px] text-gray-600 ml-2">{Number(food.calories ?? 0)} kcal</span>
                  </button>
                ))
              ) : (
                <p className="font-mono text-xs p-2 uppercase text-gray-600">No matches found.</p>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase text-gray-600">
                {selectedFood ? 'Using existing food item' : 'Select an existing food to continue'}
              </p>
              <button
                type="button"
                onClick={() => onOpenAddFood(searchTerm.trim())}
                className="border-2 border-black bg-kaizen-lightgreen px-2 py-1 font-heading text-[10px] uppercase hover:bg-kaizen-mint"
              >
                + Add New Food
              </button>
            </div>
          </div>

          {/* Serving */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-heading uppercase text-sm mb-2">
                Serving Size
              </label>
              <input
                type="number"
                step="0.1"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="1"
                min="0"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-sm mb-2">
                Unit
              </label>
              <select
                value={servingUnit}
                onChange={(e) => setServingUnit(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
              >
                {servingUnitOptions.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
            <p className="font-mono text-xs text-gray-700">
              Select an existing item or add a new food using the button above.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!selectedFood}
              className="w-full bg-kaizen-green text-black border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint transition-colors"
            >
              ADD ENTRY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
