import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import WaterModal from "./WaterModal";
import ExerciseModal, { ExerciseData } from "./ExerciseModal";
import FuelModal, { FuelData } from "./FuelModal";
import RoutineModal, { RoutineData } from "./RoutineModal";
import DietPlanModal, { DietPlanData } from "./DietPlanModal";
import ReportModal, { ReportData } from "./ReportModal";
import MetricsModal, { MetricsData } from "./MetricsModal";
// Reusable Button Component for consistent style
const NeoButton = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <button onClick={onClick} className={`bg-black text-white font-heading uppercase text-sm py-1 px-6 rounded shadow-neo hover:shadow-none transition-all border-2 border-transparent ${className}`}>
    {children}
  </button>
);

// Reusable Card Component to define the structure and style
const DashboardCard = ({ title, children, className = "", headerClassName = "" }: { title: string; children: React.ReactNode; className?: string; headerClassName?: string }) => (
  <div className={`flex flex-col border-3 border-kaizen-black overflow-hidden ${className}`}>
    <div className={`bg-kaizen-mint py-2 px-4 border-b-3 border-kaizen-black text-center ${headerClassName}`}>
      <h2 className="font-heading uppercase font-bold text-lg tracking-tight">
        {title}
      </h2>
    </div>
    <div className="p-2 flex flex-col items-center bg-white">
      {children}
    </div>
  </div>
);

export default function DashboardMain() {
  const { user } = useAuth();
  // Get the username from the email (e.g., "aditi" from "aditi@gmail.com")
  const username = user?.email?.split('@')[0].toUpperCase() || "USER";

  // --- HYDRATION STATE ---
  const [waterLevel, setWaterLevel] = useState(1500); // Current in ml
  const [waterGoal, setWaterGoal] = useState(3000);   // Goal in ml
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [waterModalMode, setWaterModalMode] = useState<'LOG' | 'GOAL'>('LOG');

  // --- CREATE MODAL STATES ---
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isDietPlanModalOpen, setIsDietPlanModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);

  // Handle Modal Submission
  const handleWaterSubmit = (value: number) => {
    if (waterModalMode === 'LOG') {
      setWaterLevel((prev) => prev + value);
    } else {
      setWaterGoal(value);
    }
    setIsWaterModalOpen(false);
  };

  // Handle create modal confirmations
  const handleExerciseCreate = (exercise: ExerciseData) => {
    console.log('Exercise created:', exercise);
    // TODO: Save to database
  };

  const handleFuelLog = (fuel: FuelData) => {
    console.log('Fuel logged:', fuel);
    // TODO: Save to database
  };

  const handleRoutineCreate = (routine: RoutineData) => {
    console.log('Routine created:', routine);
    // TODO: Save to database
  };

  const handleDietPlanCreate = (plan: DietPlanData) => {
    console.log('Diet plan created:', plan);
    // TODO: Save to database
  };

  const handleReportGenerate = (report: ReportData) => {
    console.log('Report generated:', report);
    // TODO: Generate and save report to database
  };

  const handleMetricsLog = (metrics: MetricsData) => {
    console.log('Metrics logged:', metrics);
    // TODO: Save metrics to database
  };

  const openWaterModal = (mode: 'LOG' | 'GOAL') => {
    setWaterModalMode(mode);
    setIsWaterModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 h-full">
      <WaterModal 
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
        mode={waterModalMode}
        currentLevel={waterLevel}
        currentGoal={waterGoal}
        onConfirm={handleWaterSubmit}
      />
      <ExerciseModal 
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onConfirm={handleExerciseCreate}
      />
      <FuelModal 
        isOpen={isFuelModalOpen}
        onClose={() => setIsFuelModalOpen(false)}
        onConfirm={handleFuelLog}
      />
      <RoutineModal 
        isOpen={isRoutineModalOpen}
        onClose={() => setIsRoutineModalOpen(false)}
        onConfirm={handleRoutineCreate}
      />
      <DietPlanModal 
        isOpen={isDietPlanModalOpen}
        onClose={() => setIsDietPlanModalOpen(false)}
        onConfirm={handleDietPlanCreate}
      />
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onConfirm={handleReportGenerate}
      />
      <MetricsModal 
        isOpen={isMetricsModalOpen}
        onClose={() => setIsMetricsModalOpen(false)}
        onConfirm={handleMetricsLog}
      />
      
      {/* Top Welcome Header */}
      <header className="bg-kaizen-green p-4 border-b-3 border-kaizen-black">
        <h1 className="font-heading text-white text-xl uppercase tracking-wider">
          WELCOME, {username}
        </h1>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full max-w-7xl mx-auto">
          
          {/* ROW 1 */}
          {/* 1. Today's Mission */}
          <DashboardCard title="Today's Mission">
            <div className="text-center space-y-4 mt-4">
              <h3 className="font-heading text-3xl uppercase">UPPER BODY BURN</h3>
              <p className="font-mono text-gray-600">Est Time 45 min</p>
            </div>
            <NeoButton className="mt-6 w-48">START</NeoButton>
          </DashboardCard>

          {/* 2. Fuel Gauge */}
          <DashboardCard title="Fuel Gauge">
            <div className="w-full space-y-4 font-heading uppercase mt-2">
              {/* Placeholder Progress Bars */}
              {[
                { label: "PROTEIN", width: "75%" },
                { label: "FATS", width: "45%" },
                { label: "CARBS", width: "90%" },
              ].map((macro) => (
                <div key={macro.label} className="flex items-center gap-2">
                  <span className="w-20 text-right text-sm">{macro.label}</span>
                  <div className="flex-1 h-4 border-2 border-black rounded-full overflow-hidden bg-white">
                    <div className="h-full bg-black" style={{ width: macro.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <NeoButton className="mt-6">VIEW MORE STATS</NeoButton>
          </DashboardCard>

          {/* 3. Hydration */}
          <DashboardCard title="Hydration">
            {/* Placeholder grid for glasses */}
            <div className="grid grid-cols-8 gap-2 mt-4">
              {Array.from({ length: 24 }).map((_, i) => (
                // First 15 are full (green), rest are empty (light green)
                <div key={i} className={`w-6 h-6 border-2 border-black ${i < 15 ? 'bg-kaizen-green' : 'bg-kaizen-lightgreen'}`}></div>
              ))}
            </div>
            <div className="flex gap-2 mt-6 w-full px-2">
              <NeoButton 
                className="flex-1 text-[10px] px-0 hover:bg-gray-700" 
                onClick={() => openWaterModal('LOG')}
              >
                LOG INTAKE
              </NeoButton>
              <NeoButton 
                className="flex-1 text-[10px] px-0 hover:bg-gray-700"
                onClick={() => openWaterModal('GOAL')}
              >
                EDIT GOAL
              </NeoButton>
            </div>
          </DashboardCard>

          {/* ROW 2 */}
          {/* 4. Intel */}
          <DashboardCard title="Intel">
            <div className="text-center space-y-2 mt-4">
              <h3 className="font-heading text-xl uppercase">PLATEAU DETECTED</h3>
              <p className="font-mono text-sm text-gray-600 px-4">
                YOUR WEIGHT HAS STAYED STAGNANT. RECHECK CALORIE INTAKE_
              </p>
            </div>
            <NeoButton className="mt-6" onClick={() => setIsReportModalOpen(true)}>GENERATE REPORT</NeoButton>
          </DashboardCard>

          {/* 5. Metrics */}
          <DashboardCard title="Metrics" className="bg-kaizen-lightgreen">
            <div className="w-full flex justify-between font-heading uppercase mb-2">
              <span className="text-3xl">72.4 KG</span>
              <span className="text-sm self-end">0.5KG ▼</span>
            </div>
            {/* Placeholder for Chart */}
            <div className="flex-1 w-full border-b-3 border-black relative mt-4">
               <svg viewBox="0 0 100 50" className="w-full h-full absolute bottom-0" preserveAspectRatio="none">
                 <path d="M0,50 L0,30 L20,35 L40,32 L60,38 L80,40 L100,45 L100,50 Z" fill="#00FF94" stroke="black" strokeWidth="1"/>
               </svg>
            </div>
             <div className="flex gap-2 mt-6 w-full px-4">
              <NeoButton className="flex-1 text-xs" onClick={() => setIsMetricsModalOpen(true)}>LOG METRICS</NeoButton>
              <NeoButton className="flex-1 text-xs">VIEW MORE</NeoButton>
            </div>
          </DashboardCard>

          {/* 6. History */}
          <DashboardCard title="History">
            <ul className="w-full space-y-4 font-heading uppercase mt-4 px-4">
              <li className="border-b-2 border-black pb-2">
                <span className="text-gray-600 mr-2">DEC 22 |</span> LOWER BODY BURN
              </li>
               <li className="border-b-2 border-black pb-2">
                <span className="text-gray-600 mr-2">DEC 21 |</span> LONG RUN
              </li>
            </ul>
             <div className="w-full flex justify-end mt-4">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>
          </DashboardCard>

          {/* ROW 3 */}
          {/* 7. Create */}
          <DashboardCard title="Create">
            <div className="grid grid-cols-2 gap-4 w-full mt-4 px-4">
              <NeoButton className="w-full" onClick={() => setIsExerciseModalOpen(true)}>+ EXERCISE</NeoButton>
              <NeoButton className="w-full" onClick={() => setIsFuelModalOpen(true)}>+ FUEL</NeoButton>
              <NeoButton className="w-full" onClick={() => setIsRoutineModalOpen(true)}>+ ROUTINE</NeoButton>
              <NeoButton className="w-full" onClick={() => setIsDietPlanModalOpen(true)}>+ DIET PLAN</NeoButton>
            </div>
          </DashboardCard>

          {/* 8. Records */}
          <DashboardCard title="Records">
             <ul className="w-full space-y-6 font-heading uppercase text-lg mt-4 px-4">
              <li className="flex justify-between border-b border-dashed border-black pb-1">
                <span>DEADLIFT</span><span>100 KG</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-black pb-1">
                <span>GOBLET SQUATS</span><span>60 KG</span>
              </li>
               <li className="flex justify-between border-b border-dashed border-black pb-1">
                <span>5K RUN</span><span>24:00 min</span>
              </li>
            </ul>
          </DashboardCard>

          {/* 9. Mental State */}
          <DashboardCard title="Mental State" className="bg-kaizen-lightgreen">
            <div className="w-full space-y-4 font-heading uppercase text-xs text-center mt-2 px-2">
              {["SLEEP", "ENERGY", "FOCUS"].map(label => (
                <div key={label}>
                  <div className="mb-1">{label}</div>
                  <div className="h-6 border-2 border-black rounded-full flex bg-white overflow-hidden relative font-mono">
                    <div className="flex-1 flex items-center justify-center border-r-2 border-black z-10">LOW</div>
                    <div className="flex-1 flex items-center justify-center bg-kaizen-green z-10">HIGH</div>
                  </div>
                </div>
              ))}
            </div>
             <div className="w-full flex justify-end mt-2">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>
          </DashboardCard>

        </div>
      </main>
    </div>
  );
}