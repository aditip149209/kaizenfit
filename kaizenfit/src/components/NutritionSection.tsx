import React, { useEffect, useMemo, useState } from "react";
import MealLogModal, { MealLogData } from "./MealLogModal";
import AddFoodItemModal, { NewFoodItemData } from "./AddFoodItemModal";
import WaterModal from "./WaterModal";
import { api } from "../lib/api";
import { showToast } from "../lib/toast";
import { deriveMealQuantity, normalizeServingUnit } from "../lib/measurementConfig";

// --- LOCAL COMPONENTS (For copy-paste ease) ---

const ActionButton = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className="font-heading uppercase text-sm py-3 px-4 bg-black text-white rounded"
    >
      {label}
    </button>
  );
};

const ProgressBar = ({ label, current, target, colorClass }: { label: string; current: number; target: number; colorClass: string }) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between font-mono text-xs font-bold mb-1 uppercase">
        <span>{label}</span>
        <span>{current} / {target}g</span>
      </div>
      <div className="h-6 border-3 border-black bg-white p-0.5 relative">
        {/* The Fill */}
        <div 
          className={`h-full border-r-2 border-black transition-all duration-500 ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
        {/* Striped Pattern Overlay (Optional Aesthetic) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

const MealCard = ({ title, items, calories, onAddEntry }: { title: string; items: string[]; calories: number; onAddEntry: () => void }) => (
  <div className="border-3 border-black bg-white flex flex-col h-full shadow-neo">
    <div className="bg-kaizen-mint text-white p-3 flex justify-between items-center border-b-3 border-black">
      <h3 className="font-heading uppercase tracking-wide text-black font-bold text-lg">{title}</h3>
      <span className="font-mono text-black font-bold">{calories} KCAL</span>
    </div>
    <div className="p-4 flex-1">
      {items.length > 0 ? (
        <ul className="space-y-2 font-mono text-sm">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b-2 border-black pb-1">
              <span>{item}</span>
              <span className="text-gray-500">+</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex items-center text-black justify-center opacity-40 font-heading uppercase text-sm tracking-widest">
          No Data Logged
        </div>
      )}
    </div>
    <div className="p-3 border-t-3 border-black bg-gray-50">
      <ActionButton label="+ ADD ENTRY" onClick={onAddEntry} />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function Nutrition() {
  // Modal state
  const [isMealLogModalOpen, setIsMealLogModalOpen] = useState(false);
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [waterModalMode, setWaterModalMode] = useState<'LOG' | 'GOAL'>('LOG');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [mealLogInitialSearch, setMealLogInitialSearch] = useState('');
  const [newFoodInitialName, setNewFoodInitialName] = useState('');
  const [addFoodOpenedFromLogger, setAddFoodOpenedFromLogger] = useState(false);
  const [mealLogs, setMealLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [calorieTarget, setCalorieTarget] = useState(2500);
  const [waterGoalRecordId, setWaterGoalRecordId] = useState<string | null>(null);
  const [hydrationWeekPage, setHydrationWeekPage] = useState(0);
  const [hydrationReloadToken, setHydrationReloadToken] = useState(0);
  const [weeklyHydration, setWeeklyHydration] = useState<Array<{ date: string; amount: number }>>([]);

  const mealTypeMap: Record<string, 'breakfast' | 'lunch' | 'dinner' | 'snack'> = {
    Breakfast: 'breakfast',
    Lunch: 'lunch',
    Dinner: 'dinner',
    Snacks: 'snack',
  };

  const dateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatShortDate = (dateString: string) => {
    const parsedDate = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) {
      return dateString;
    }

    return parsedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDayLabel = (dateString: string) => {
    const parsedDate = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) {
      return dateString;
    }

    return parsedDate.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
  };

  const getWeekDays = (page: number) => {
    const newest = new Date();
    newest.setHours(0, 0, 0, 0);
    newest.setDate(newest.getDate() - (page * 7));

    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(newest);
      day.setDate(newest.getDate() - index);
      return dateKey(day);
    });
  };

  const loadMealLogs = async () => {
    try {
      const response = await api.get('/nutrition/meals');
      setMealLogs(response.data?.rows ?? []);
    } catch (error) {
      console.error('Failed to load meal logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMealLogs();
  }, []);

  useEffect(() => {
    let active = true;

    const loadHydration = async () => {
      try {
        const weekDays = getWeekDays(hydrationWeekPage);
        const newestDay = weekDays[0];
        const oldestDay = weekDays[weekDays.length - 1];

        const [goalResponse, waterResponse] = await Promise.all([
          api.get('/health/goals/current'),
          api.get('/nutrition/water', { params: { from: oldestDay, to: newestDay, limit: 500, offset: 0 } }),
        ]);

        const goalRecord = goalResponse.data;
        const waterEntries = waterResponse.data?.rows ?? [];
        const totalsByDay = waterEntries.reduce((acc: Record<string, number>, entry: { date?: string; amount?: number }) => {
          const key = String(entry.date ?? '').slice(0, 10);
          if (!key) {
            return acc;
          }

          acc[key] = (acc[key] ?? 0) + Number(entry.amount ?? 0);
          return acc;
        }, {});

        const weekRows = weekDays.map((day) => ({
          date: day,
          amount: Math.max(0, Math.round(totalsByDay[day] ?? 0)),
        }));

        if (!active) {
          return;
        }

        setWeeklyHydration(weekRows);
        setWaterGoal(goalRecord?.waterGoal ?? 3000);
        setCalorieTarget(goalRecord?.calorieGoal ?? 2500);
        setWaterGoalRecordId(goalRecord?.id ?? null);
      } catch (error) {
        console.error('Failed to load hydration data:', error);
      }
    };

    loadHydration();

    return () => {
      active = false;
    };
  }, [hydrationWeekPage, hydrationReloadToken]);

  const stats = useMemo(() => {
    const aggregate = (key: 'calories' | 'protein' | 'carbs' | 'fat') => {
      return mealLogs.reduce((sum, entry) => {
        const quantity = Number(entry.quantity ?? 1);
        const foodItem = entry.FoodItem ?? {};
        return sum + Number(foodItem[key] ?? 0) * quantity;
      }, 0);
    };

    return {
      calories: { current: aggregate('calories'), target: calorieTarget },
      protein: { current: aggregate('protein'), target: 180 },
      carbs: { current: aggregate('carbs'), target: 300 },
      fats: { current: aggregate('fat'), target: 80 },
    };
  }, [mealLogs, calorieTarget]);

  const groupedMeals = useMemo(() => {
    return mealLogs.reduce<Record<string, any[]>>((acc, entry) => {
      const mealType = String(entry.mealType ?? 'snack');
      const bucket = mealType === 'breakfast' ? 'Breakfast' : mealType === 'lunch' ? 'Lunch' : mealType === 'dinner' ? 'Dinner' : 'Snacks';
      if (!acc[bucket]) {
        acc[bucket] = [];
      }
      acc[bucket].push(entry);
      return acc;
    }, {});
  }, [mealLogs]);

  const openMealLog = (mealType: string) => {
    setSelectedMealType(mealType);
    setMealLogInitialSearch('');
    setIsMealLogModalOpen(true);
  };

  const openAddFoodModal = (prefillName: string) => {
    setMealLogInitialSearch(prefillName);
    setNewFoodInitialName(prefillName);
    setAddFoodOpenedFromLogger(true);
    setIsAddFoodModalOpen(true);
  };

  const handleBackToLogger = () => {
    setIsAddFoodModalOpen(false);
    setIsMealLogModalOpen(true);
  };

  const handleCreateFoodItem = async (data: NewFoodItemData) => {
    try {
      const response = await api.post('/nutrition/foods', {
        name: data.name,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        servingUnit: data.servingUnit ? normalizeServingUnit(data.servingUnit) : null,
        servingSize: data.servingSize ?? null,
      });

      const createdFood = response.data?.foodItem ?? response.data;
      const createdName = String(createdFood?.name ?? data.name ?? '').trim();

      setIsAddFoodModalOpen(false);
      setMealLogInitialSearch(createdName);
      setIsMealLogModalOpen(true);
      setAddFoodOpenedFromLogger(false);
      showToast.success(`Food added: ${createdName}`);
    } catch (error) {
      console.error('Failed to create food item:', error);
      showToast.error('Failed to add food item. Try again.');
    }
  };

  const handleMealLog = async (data: MealLogData) => {
    try {
      const normalizedMealType = mealTypeMap[data.mealType] ?? 'snack';
      const foodItemId = data.foodItemId;
      const baseServingSize = data.baseServingSize ?? null;
      const baseServingUnit = data.baseServingUnit ?? null;

      if (!foodItemId) {
        showToast.error('Select an existing food item to log.');
        return;
      }

      const quantity = deriveMealQuantity({
        enteredAmount: data.servingSize ?? 1,
        enteredUnit: data.servingUnit,
        baseAmount: baseServingSize,
        baseUnit: baseServingUnit,
      });

      await api.post('/nutrition/meals', {
        date: new Date().toISOString().slice(0, 10),
        mealType: normalizedMealType,
        quantity,
        foodItemId,
      });

      await loadMealLogs();
      setIsMealLogModalOpen(false);
      setMealLogInitialSearch('');
    } catch (error) {
      console.error('Failed to log meal:', error);
    }
  };

  const openWaterModal = (mode: 'LOG' | 'GOAL') => {
    setWaterModalMode(mode);
    setIsWaterModalOpen(true);
  };

  const handleWaterSubmit = async (value: number) => {
    try {
      if (waterModalMode === 'LOG') {
        if (value === 0) {
          setIsWaterModalOpen(false);
          return;
        }

        await api.post('/nutrition/water', {
          date: dateKey(new Date()),
          amount: value,
        });

        showToast.success(`Hydration logged: +${value}ml`);
      } else {
        const payload = { waterGoal: value, calorieGoal: calorieTarget, date: dateKey(new Date()) };

        if (waterGoalRecordId) {
          await api.patch(`/health/goals/${waterGoalRecordId}`, payload);
          showToast.success(`Water goal updated: ${value}ml`);
        } else {
          const response = await api.post('/health/goals', payload);
          setWaterGoalRecordId(response.data?.goal?.id ?? response.data?.id ?? null);
          showToast.success(`Water goal set: ${value}ml`);
        }

        setWaterGoal(value);
      }

      setHydrationReloadToken((prev) => prev + 1);
      setIsWaterModalOpen(false);
    } catch (error) {
      console.error('Failed to save hydration:', error);
      showToast.error('Failed to save hydration. Try again.');
    }
  };

  const hydrationNewest = weeklyHydration[0]?.date;
  const hydrationOldest = weeklyHydration[weeklyHydration.length - 1]?.date;
  const todayHydration = weeklyHydration.find((row) => row.date === dateKey(new Date()))?.amount ?? 0;

  return (
    <div className="flex flex-col h-full w-full bg-kaizen-gray overflow-y-auto">
      <MealLogModal 
        isOpen={isMealLogModalOpen}
        onClose={() => {
          setIsMealLogModalOpen(false);
          setAddFoodOpenedFromLogger(false);
        }}
        onConfirm={handleMealLog}
        mealType={selectedMealType}
        initialSearchTerm={mealLogInitialSearch}
        onOpenAddFood={openAddFoodModal}
      />
      <AddFoodItemModal
        isOpen={isAddFoodModalOpen}
        onClose={() => {
          setIsAddFoodModalOpen(false);
          setAddFoodOpenedFromLogger(false);
        }}
        onConfirm={handleCreateFoodItem}
        initialName={newFoodInitialName}
        showBackButton={addFoodOpenedFromLogger}
        onBack={handleBackToLogger}
      />
      <WaterModal
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
        mode={waterModalMode}
        currentLevel={todayHydration}
        currentGoal={waterGoal}
        onConfirm={handleWaterSubmit}
      />
      
      {/* 1. Header Section */}
      <header className="bg-kaizen-green border-b-3 border-black p-6 flex justify-between items-end">
        <div>
            <h1 className="font-heading text-3xl text-white uppercase tracking-tighter">Fuel Protocol</h1>
            <p className="font-mono text-sm text-white mt-1 uppercase">
                Daily Intake Log // {new Date().toLocaleDateString()}
            </p>
        </div>
        <div className="hidden md:block">
            <ActionButton label="SCAN BARCODE [BETA]" />
        </div>
      </header>

      {/* 2. Main Grid */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        
        {/* ROW 1: METRICS (Spans 2 columns on large screens) */}
        <section className="lg:col-span-2 space-y-6">
            
            {/* A. Calorie Summary Banner */}
            <div className="border-3 border-black bg-kaizen-green p-6 shadow-neo text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h2 className="font-heading text-4xl mb-1">{stats.calories.current}</h2>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest">Calories Consumed</p>
                </div>
                
                <div className="h-1 w-full md:w-px bg-black md:h-16"></div> {/* Divider */}
                
                <div className="flex-1 w-full space-y-1">
                    <div className="flex justify-between font-mono text-xs font-bold uppercase">
                        <span>Progress</span>
                        <span>{Math.round((stats.calories.current / stats.calories.target) * 100)}%</span>
                    </div>
                    <div className="h-8 border-3 border-black bg-white">
                         <div 
                            className="h-full bg-black" 
                            style={{ width: `${(stats.calories.current / stats.calories.target) * 100}%` }}
                        ></div>
                    </div>
                     <div className="text-right font-mono text-xs font-bold uppercase mt-1">
                        Target: {stats.calories.target} kcal
                    </div>
                </div>
            </div>

            {/* B. Macro Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-3 border-black p-4 shadow-neo">
                    <ProgressBar label="Protein" current={stats.protein.current} target={stats.protein.target} colorClass="bg-blue-400" />
                </div>
                <div className="bg-white border-3 border-black p-4 shadow-neo">
                    <ProgressBar label="Carbs" current={stats.carbs.current} target={stats.carbs.target} colorClass="bg-yellow-400" />
                </div>
                <div className="bg-white border-3 border-black p-4 shadow-neo">
                    <ProgressBar label="Fats" current={stats.fats.current} target={stats.fats.target} colorClass="bg-red-400" />
                </div>
            </div>

            {/* C. Meal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <MealCard 
                    title="Breakfast" 
                    calories={Math.round((groupedMeals.Breakfast ?? []).reduce((sum, entry) => sum + Number(entry.FoodItem?.calories ?? 0) * Number(entry.quantity ?? 1), 0))}
                    items={(groupedMeals.Breakfast ?? []).map((entry) => entry.FoodItem?.name ?? 'Unknown item')}
                    onAddEntry={() => openMealLog('Breakfast')}
                />
                <MealCard 
                    title="Lunch" 
                    calories={Math.round((groupedMeals.Lunch ?? []).reduce((sum, entry) => sum + Number(entry.FoodItem?.calories ?? 0) * Number(entry.quantity ?? 1), 0))}
                    items={(groupedMeals.Lunch ?? []).map((entry) => entry.FoodItem?.name ?? 'Unknown item')}
                    onAddEntry={() => openMealLog('Lunch')}
                />
                <MealCard 
                    title="Dinner" 
                    calories={Math.round((groupedMeals.Dinner ?? []).reduce((sum, entry) => sum + Number(entry.FoodItem?.calories ?? 0) * Number(entry.quantity ?? 1), 0))}
                    items={(groupedMeals.Dinner ?? []).map((entry) => entry.FoodItem?.name ?? 'Unknown item')}
                    onAddEntry={() => openMealLog('Dinner')}
                />
                 <MealCard 
                    title="Snacks" 
                    calories={Math.round((groupedMeals.Snacks ?? []).reduce((sum, entry) => sum + Number(entry.FoodItem?.calories ?? 0) * Number(entry.quantity ?? 1), 0))}
                    items={(groupedMeals.Snacks ?? []).map((entry) => entry.FoodItem?.name ?? 'Unknown item')}
                    onAddEntry={() => openMealLog('Snacks')}
                />
            </div>
        </section>

        {/* ROW 2: SIDEBAR WIDGETS (Right Column) */}
        <aside className="space-y-6">
            
            {/* Water Tracker - 7 Days History */}
            <div className="border-3 border-black bg-kaizen-lightgreen p-6 shadow-neo">
                <h3 className="font-heading text-xl uppercase mb-4 text-center">Hydration</h3>

                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setHydrationWeekPage((prev) => Math.max(0, prev - 1))}
                    disabled={hydrationWeekPage === 0}
                    className="w-8 h-8 border-2 border-black font-heading text-base font-bold disabled:opacity-30 flex items-center justify-center"
                  >
                    ←
                  </button>
                  <p className="font-mono text-[10px] uppercase font-bold text-gray-700 text-center px-2">
                    {hydrationOldest && hydrationNewest ? `${formatShortDate(hydrationOldest)} - ${formatShortDate(hydrationNewest)}` : 'Loading'}
                  </p>
                  <button
                    onClick={() => setHydrationWeekPage((prev) => prev + 1)}
                    className="w-8 h-8 border-2 border-black font-heading text-base font-bold flex items-center justify-center"
                  >
                    →
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  {weeklyHydration.map((entry) => {
                    const ratio = Math.max(0, Math.min(1, entry.amount / Math.max(waterGoal, 1)));
                    const progress = Math.round(ratio * 100);

                    return (
                      <div key={entry.date} className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold w-10">{formatDayLabel(entry.date)}</span>
                          <span className="font-mono text-[10px] text-gray-600 flex-1">{formatShortDate(entry.date)}</span>
                          <span className="font-mono text-[10px] font-bold">{entry.amount}ml</span>
                        </div>
                        <div className="h-4 border-2 border-black bg-white overflow-hidden">
                          <div className="h-full bg-kaizen-green border-r-2 border-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="font-mono text-xs uppercase font-bold text-center mb-4">
                  TODAY: {todayHydration}ml / GOAL: {waterGoal}ml
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openWaterModal('LOG')}
                    className="bg-black text-white py-2 font-heading uppercase text-xs border-2 border-black hover:bg-gray-800 rounded"
                  >
                    Log Water
                  </button>
                  <button
                    onClick={() => openWaterModal('GOAL')}
                    className="bg-white py-2 font-heading uppercase text-xs border-2 border-black hover:bg-gray-100 rounded"
                  >
                    Set Goal
                  </button>
                </div>
            </div>
            
        </aside>

      </main>
    </div>
  );
}