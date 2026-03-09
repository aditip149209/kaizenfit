import React, { useState } from "react";
import MealLogModal, { MealLogData } from "./MealLogModal";

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
  const [selectedMealType, setSelectedMealType] = useState('');

  // Mock Data (Replace with Firebase/API data later)
  const [stats] = useState({
    calories: { current: 1800, target: 2500 },
    protein: { current: 120, target: 180 },
    carbs: { current: 210, target: 300 },
    fats: { current: 55, target: 80 },
  });

  const openMealLog = (mealType: string) => {
    setSelectedMealType(mealType);
    setIsMealLogModalOpen(true);
  };

  const handleMealLog = (data: MealLogData) => {
    console.log('Meal logged:', data);
    // TODO: Save to database
    setIsMealLogModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-kaizen-gray overflow-y-auto">
      <MealLogModal 
        isOpen={isMealLogModalOpen}
        onClose={() => setIsMealLogModalOpen(false)}
        onConfirm={handleMealLog}
        mealType={selectedMealType}
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
                    calories={450}
                    items={["Oatmeal (100g)", "Whey Protein (1 Scoop)", "Almonds (10g)"]}
                    onAddEntry={() => openMealLog('Breakfast')}
                />
                <MealCard 
                    title="Lunch" 
                    calories={820}
                    items={["Chicken Breast (200g)", "White Rice (150g)", "Broccoli"]}
                    onAddEntry={() => openMealLog('Lunch')}
                />
                <MealCard 
                    title="Dinner" 
                    calories={0}
                    items={[]}
                    onAddEntry={() => openMealLog('Dinner')}
                />
                 <MealCard 
                    title="Snacks" 
                    calories={200}
                    items={["Greek Yogurt", "Apple"]}
                    onAddEntry={() => openMealLog('Snacks')}
                />
            </div>
        </section>

        {/* ROW 2: SIDEBAR WIDGETS (Right Column) */}
        <aside className="space-y-6">
            
            {/* Water Tracker - 7 Days History */}
            <div className="border-3 border-black bg-kaizen-lightgreen p-6 shadow-neo">
                <h3 className="font-heading text-xl uppercase mb-4 text-center">Hydration</h3>
                <div className="space-y-3 mb-6">
                    {/* Each row represents one day */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                        <div key={day} className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold w-8">{day}</span>
                            <div className="flex gap-1 flex-1">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-6 h-6 border-2 border-black ${
                                            dayIndex === 6 ? (i < 6 ? 'bg-blue-400' : 'bg-white') : 
                                            (i < Math.floor(Math.random() * 8) ? 'bg-blue-400' : 'bg-white')
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 bg-white py-2 font-heading uppercase text-xs hover:bg-blue-100 rounded">-</button>
                    <button className="flex-[3] bg-black text-white py-2 font-heading uppercase text-xs hover:bg-gray-800 rounded">+ 250ML</button>
                </div>
            </div>
            
        </aside>

      </main>
    </div>
  );
}