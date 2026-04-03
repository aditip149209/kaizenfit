import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

// --- REUSABLE COMPONENTS ---
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6 border-b-2 border-black pb-2">
    <h2 className="font-heading text-xl uppercase tracking-wider">{title}</h2>
    {subtitle && <p className="font-mono text-xs text-gray-500 uppercase mt-1">{subtitle}</p>}
  </div>
);

const InputGroup = ({ label, value, disabled = false, type = "text" }: any) => (
  <div className="space-y-1">
    <label className="block font-mono text-xs font-bold uppercase">{label}</label>
    <input 
      type={type}
      value={value}
      disabled={disabled}
      className={`w-full border-3 border-black p-3 font-mono text-sm focus:bg-kaizen-lightgreen focus:outline-none transition-colors ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
      onChange={() => {}} // Dummy handler
    />
  </div>
);

const ToggleSwitch = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <div className="flex items-center justify-between border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer" onClick={onClick}>
    <span className="font-heading uppercase text-sm">{label}</span>
    <div className={`w-12 h-6 border-2 border-black rounded-full relative transition-colors ${active ? 'bg-kaizen-green' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-black rounded-full transition-all border border-white ${active ? 'left-6' : 'left-1'}`}></div>
    </div>
  </div>
);

export default function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyReport: true
  });

  const [units, setUnits] = useState("METRIC"); // METRIC or IMPERIAL

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const response = await api.get('/me');
        if (active) {
          setProfile(response.data?.profile ?? null);
        }
      } catch (error) {
        console.error('Failed to load settings profile:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-kaizen-gray overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b-3 border-black p-6">
        <h1 className="font-heading text-3xl uppercase tracking-tighter">System Config</h1>
        <p className="font-mono text-sm text-gray-600 mt-1 uppercase">
          Operator: {user?.email} // ID: {user?.uid.slice(0, 8)}...
        </p>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
        
        {/* 1. OPERATOR PROFILE */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
          <SectionHeader title="Operator Profile" subtitle="Personal Identification Data" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Display Name" value="ADITI_FIT" />
            <InputGroup label="Goal" value={profile?.goal ?? '—'} disabled />
            <InputGroup label="Email Address" value={user?.email} disabled />
            <InputGroup label="Location" value={loading ? 'Loading...' : 'BENGALURU, IN'} />
            
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase">Avatar</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full border-2 border-black"></div>
                <button className="text-xs font-heading uppercase underline hover:text-kaizen-green rounded">Change Image</button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. BIOMETRICS & UNITS */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
           <SectionHeader title="Biometrics" subtitle="Physical Parameters & Unit Preferences" />
           
           <div className="mb-6 flex gap-4">
              <button 
                onClick={() => setUnits("METRIC")}
                className={`flex-1 py-3 font-heading uppercase text-sm transition-all rounded ${units === "METRIC" ? 'bg-black text-kaizen-green' : 'bg-white hover:bg-gray-100'}`}
              >
                Metric (KG/CM)
              </button>
              <button 
                onClick={() => setUnits("IMPERIAL")}
                className={`flex-1 py-3 font-heading uppercase text-sm transition-all rounded ${units === "IMPERIAL" ? 'bg-black text-kaizen-green' : 'bg-white hover:bg-gray-100'}`}
              >
                Imperial (LBS/FT)
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <InputGroup label="Current Weight" value={profile?.weight ?? '—'} />
             <InputGroup label="Height" value={profile?.height ?? '—'} />
             <InputGroup label="Daily Calorie Target" value={profile?.calorieGoal ?? '—'} />
           </div>
        </section>

        {/* 3. NOTIFICATIONS */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
          <SectionHeader title="Alert Protocols" subtitle="Communication Frequencies" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleSwitch 
              label="Mission Reminders (Push)" 
              active={notifications.push} 
              onClick={() => setNotifications({...notifications, push: !notifications.push})} 
            />
            <ToggleSwitch 
              label="Weekly Intel Report (Email)" 
              active={notifications.weeklyReport} 
              onClick={() => setNotifications({...notifications, weeklyReport: !notifications.weeklyReport})} 
            />
          </div>
        </section>

        {/* 4. DANGER ZONE */}
        <section className="border-3 border-red-600 bg-red-50 p-8">
          <h2 className="font-heading text-red-600 text-xl uppercase mb-2">Danger Zone</h2>
          <p className="font-mono text-xs mb-6 text-red-800">
            DELETING YOUR ACCOUNT IS IRREVERSIBLE. ALL LOGGED DATA WILL BE PURGED.
          </p>
          
          <div className="flex gap-4">
             <button className="bg-white text-red-600 font-heading uppercase text-sm px-6 py-3 hover:bg-red-600 hover:text-white transition-colors rounded">
               Reset Data
             </button>
             <button className="bg-red-600 text-white font-heading uppercase text-sm px-6 py-3 hover:bg-red-700 transition-colors shadow-neo rounded">
               Delete Account
             </button>
          </div>
        </section>

        {/* SAVE BUTTON FLOATING OR BOTTOM */}
        <div className="pb-8">
          <button className="w-full bg-kaizen-green text-white font-heading uppercase text-lg py-4 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded">
            Save Configuration Changes
          </button>
        </div>

      </main>
    </div>
  );
}