import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { showToast } from "../lib/toast";

// --- REUSABLE COMPONENTS ---
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6 border-b-2 border-black pb-2">
    <h2 className="font-heading text-xl uppercase tracking-wider">{title}</h2>
    {subtitle && <p className="font-mono text-xs text-gray-500 uppercase mt-1">{subtitle}</p>}
  </div>
);

interface InputGroupProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  type?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
}

const InputGroup = ({ label, value, disabled = false, type = "text", onChange, placeholder }: InputGroupProps) => (
  <div className="space-y-1">
    <label className="block font-mono text-xs font-bold uppercase">{label}</label>
    <input 
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(type === "number" ? parseFloat(e.target.value) : e.target.value)}
      className={`w-full border-3 border-black p-3 font-mono text-sm focus:bg-kaizen-lightgreen focus:outline-none transition-colors ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
    />
  </div>
);

interface SelectGroupProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const SelectGroup = ({ label, value, options, disabled = false, onChange }: SelectGroupProps) => (
  <div className="space-y-1">
    <label className="block font-mono text-xs font-bold uppercase">{label}</label>
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full border-3 border-black p-3 font-mono text-sm focus:bg-kaizen-lightgreen focus:outline-none transition-colors ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ToggleSwitch = ({ label, active, onClick, disabled = false }: { label: string; active: boolean; onClick: () => void; disabled?: boolean }) => (
  <div className={`flex items-center justify-between border-2 border-black p-4 bg-white transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`} onClick={() => !disabled && onClick()}>
    <span className="font-heading uppercase text-sm">{label}</span>
    <div className={`w-12 h-6 border-2 border-black rounded-full relative transition-colors ${active ? 'bg-kaizen-green' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-black rounded-full transition-all border border-white ${active ? 'left-6' : 'left-1'}`}></div>
    </div>
  </div>
);

export default function SettingsMain() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Editable state
  const [editedProfile, setEditedProfile] = useState<any>(null);
  const [editedPreferences, setEditedPreferences] = useState<any>(null);
  const [units, setUnits] = useState("METRIC");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/settings');
      setProfile(response.data?.profile);
      setPreferences(response.data?.preferences);
      setEditedProfile(response.data?.profile);
      setEditedPreferences(response.data?.preferences);
    } catch (err: any) {
      console.error('Failed to load settings:', err);
      showToast.error(err.response?.data?.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveProfileChanges = async () => {
    try {
      setSaving(true);

      const updates = {
        username: editedProfile.username,
        address: editedProfile.address,
        height: editedProfile.height,
        heightType: editedProfile.heightType,
        goal: editedProfile.goal,
      };

      await api.patch('/user/settings', updates);
      
      // Reload fresh data to ensure everything is synced (including calculated fields)
      const response = await api.get('/user/settings');
      setProfile(response.data?.profile);
      setEditedProfile(response.data?.profile);
      showToast.success('Account settings updated successfully!');
    } catch (err: any) {
      console.error('Error saving changes:', err);
      showToast.error(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const savePreferencesChanges = async () => {
    try {
      setSaving(true);

      await api.patch('/user/preferences', editedPreferences);
      
      // Reload fresh preferences
      const response = await api.get('/user/preferences');
      setPreferences(response.data);
      setEditedPreferences(response.data);
      showToast.success('Preferences updated successfully!');
    } catch (err: any) {
      console.error('Error saving preferences:', err);
      showToast.error(err.response?.data?.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);

      // Convert to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        
        try {
          const response = await api.post('/user/profile-picture', {
            profilePictureUrl: base64String,
          });
          setProfile(response.data.profile);
          setEditedProfile(response.data.profile);
          showToast.success('Profile picture updated successfully!');
        } catch (err: any) {
          showToast.error(err.response?.data?.message || 'Failed to upload picture');
        } finally {
          setSaving(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('Error uploading picture:', err);
      showToast.error('Failed to upload picture');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-kaizen-gray overflow-y-auto p-6 flex items-center justify-center">
        <p className="font-mono text-lg">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-kaizen-gray overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b-3 border-black p-6 sticky top-0 z-10">
        <h1 className="font-heading text-3xl uppercase tracking-tighter">Account Settings</h1>
        <p className="font-mono text-sm text-gray-600 mt-1 uppercase">
          Operator: {user?.email} // ID: {user?.uid?.slice(0, 8)}...
        </p>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
        
        {/* 1. OPERATOR PROFILE */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
          <SectionHeader title="Operator Profile" subtitle="Personal Identification Data" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputGroup 
              label="Display Name (Username)" 
              value={editedProfile?.username || ""} 
              onChange={(val) => setEditedProfile({ ...editedProfile, username: val })}
              placeholder="Enter your username"
            />
            <SelectGroup
              label="Goal"
              value={editedProfile?.goal || ""}
              options={[
                { value: "lose_weight", label: "Lose Weight" },
                { value: "gain_muscle", label: "Gain Muscle" },
                { value: "maintain_weight", label: "Maintain Weight" },
                { value: "improve_fitness", label: "Improve Fitness" },
              ]}
              onChange={(val) => setEditedProfile({ ...editedProfile, goal: val })}
            />
            <InputGroup 
              label="Email Address (Read-Only)" 
              value={user?.email || ""} 
              disabled
            />
            <InputGroup 
              label="Location / Address" 
              value={editedProfile?.address || ""} 
              onChange={(val) => setEditedProfile({ ...editedProfile, address: val })}
              placeholder="Enter your address"
            />
            
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase">Avatar</label>
              <div className="flex items-center gap-4">
                {editedProfile?.profilePictureUrl ? (
                  <img 
                    src={editedProfile.profilePictureUrl} 
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-black object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-kaizen-lightgreen rounded-full border-2 border-black flex items-center justify-center text-lg font-heading">
                    {editedProfile?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <label className="text-xs font-heading uppercase underline hover:text-kaizen-green rounded cursor-pointer transition-colors">
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePictureUpload}
                    disabled={saving}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase">Gender (Read-Only)</label>
              <input 
                type="text"
                value={editedProfile?.gender ? editedProfile.gender.replace(/_/g, ' ').toUpperCase() : 'N/A'}
                disabled
                className="w-full border-3 border-black p-3 font-mono text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <button 
            onClick={saveProfileChanges}
            disabled={saving}
            className="w-full bg-kaizen-green text-white font-heading uppercase text-sm py-3 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded"
          >
            {saving ? "Saving..." : "Save Profile Changes"}
          </button>
        </section>

        {/* 2. BIOMETRICS & UNITS */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
           <SectionHeader title="Biometrics" subtitle="Physical Parameters & Unit Preferences" />
           
           <div className="mb-6 flex gap-4">
              <button 
                onClick={() => setUnits("METRIC")}
                className={`flex-1 py-3 font-heading uppercase text-sm transition-all rounded border-2 border-black ${units === "METRIC" ? 'bg-black text-kaizen-green' : 'bg-white hover:bg-gray-100'}`}
              >
                Metric (KG/CM)
              </button>
              <button 
                onClick={() => setUnits("IMPERIAL")}
                className={`flex-1 py-3 font-heading uppercase text-sm transition-all rounded border-2 border-black ${units === "IMPERIAL" ? 'bg-black text-kaizen-green' : 'bg-white hover:bg-gray-100'}`}
              >
                Imperial (LBS/FT)
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <InputGroup 
               label="Current Weight" 
               type="number"
               value={editedProfile?.weight || ""} 
               placeholder="Weight"
             />
             <InputGroup 
               label="Height" 
               type="number"
               value={editedProfile?.height || ""} 
               onChange={(val) => setEditedProfile({ ...editedProfile, height: val })}
               placeholder="Height"
             />
             <InputGroup 
               label="Daily Calorie Target (Auto-Calculated)" 
               value={editedProfile?.dailyCalorieIntake || "—"} 
               disabled
               placeholder="Calculated from formula"
             />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <SelectGroup
               label="Height Unit"
               value={editedProfile?.heightType || ""}
               options={[
                { value: "cm", label: "Centimeters (cm)" },
                { value: "inch", label: "Inches (in)" },
              ]}
              onChange={(val) => setEditedProfile({ ...editedProfile, heightType: val })}
             />
             <InputGroup 
               label="Age" 
               type="number"
               value={editedProfile?.age || ""} 
               placeholder="Your age"
             />
           </div>

           <button 
            onClick={saveProfileChanges}
            disabled={saving}
            className="w-full bg-kaizen-green text-white font-heading uppercase text-sm py-3 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded mt-6"
          >
            {saving ? "Saving..." : "Save Biometric Changes"}
          </button>
        </section>

        {/* 3. NOTIFICATIONS */}
        <section className="bg-white border-3 border-black p-8 shadow-neo">
          <SectionHeader title="Alert Protocols" subtitle="Communication Frequencies" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ToggleSwitch 
              label="Push Notifications" 
              active={editedPreferences?.pushNotifications ?? false} 
              onClick={() => setEditedPreferences({...editedPreferences, pushNotifications: !editedPreferences?.pushNotifications})} 
            />
            <ToggleSwitch 
              label="Mission Reminders" 
              active={editedPreferences?.missionReminders ?? true} 
              onClick={() => setEditedPreferences({...editedPreferences, missionReminders: !editedPreferences?.missionReminders})} 
            />
            <ToggleSwitch 
              label="Weekly Intel Report" 
              active={editedPreferences?.weeklyIntelReport ?? true} 
              onClick={() => setEditedPreferences({...editedPreferences, weeklyIntelReport: !editedPreferences?.weeklyIntelReport})} 
            />
            <ToggleSwitch 
              label="Email Notifications" 
              active={editedPreferences?.emailNotifications ?? true} 
              onClick={() => setEditedPreferences({...editedPreferences, emailNotifications: !editedPreferences?.emailNotifications})} 
            />
          </div>

          <button 
            onClick={savePreferencesChanges}
            disabled={saving}
            className="w-full bg-kaizen-green text-white font-heading uppercase text-sm py-3 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </section>

        {/* 4. WEEKLY INTEL REPORT INFO */}
        <section className="bg-kaizen-lightgreen border-3 border-black p-8 shadow-neo">
          <SectionHeader title="Weekly Intel Reports" subtitle="Automated Transformation Tracking" />
          <div className="font-mono text-sm space-y-3">
            <p>
              <strong>✓ Automatic Generation:</strong> Your weekly report is automatically generated every Sunday at 09:00 AM (UTC)
            </p>
            <p>
              <strong>✓ What's Included:</strong> Workouts logged, nutrition data, progress metrics, and personalized recommendations
            </p>
            <p>
              <strong>✓ Notification:</strong> Receive a notification when your report is ready (if push notifications are enabled)
            </p>
            <p>
              <strong>✓ Access:</strong> View all your historical reports in the Dashboard's Intel section
            </p>
          </div>
        </section>

        {/* 5. DANGER ZONE */}
        <section className="border-3 border-red-600 bg-red-50 p-8">
          <h2 className="font-heading text-red-600 text-xl uppercase mb-2">Danger Zone</h2>
          <p className="font-mono text-xs mb-6 text-red-800">
            DELETING YOUR ACCOUNT IS IRREVERSIBLE. ALL LOGGED DATA WILL BE PURGED.
          </p>
          
          <div className="flex gap-4">
             <button className="bg-white text-red-600 font-heading uppercase text-sm px-6 py-3 hover:bg-red-600 hover:text-white transition-colors rounded border-2 border-red-600">
               Reset Data
             </button>
             <button className="bg-red-600 text-white font-heading uppercase text-sm px-6 py-3 hover:bg-red-700 transition-colors shadow-neo rounded border-2 border-red-600">
               Delete Account
             </button>
          </div>
        </section>

        <div className="pb-8"></div>

      </main>
    </div>
  );
}