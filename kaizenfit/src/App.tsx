import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';
import Header from './components/Header';
import Section1 from './components/Section1';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { Community } from './pages/Community';
import { Program } from './pages/Program';
import Onboarding from './pages/Onboarding';
import Nutrition from './components/NutritionSection';
import SideBar from './components/SideBar';
import DashboardMain from './components/DashboardMain';
import CommSection from './components/CommSection';
import Settings from './components/SettingsMain';
import ProgramsMain from './components/ProgramsMain';
import { useAuth } from './context/AuthContext';
import { api } from './lib/api';

const ProfileAside = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<{ waterGoal: number | null; calorieGoal: number | null }>({
    waterGoal: null,
    calorieGoal: null,
  });

  useEffect(() => {
    let active = true;

    const loadGoals = async () => {
      try {
        const response = await api.get('/health/goals/current');

        if (!active) {
          return;
        }

        setGoals({
          waterGoal: response.data?.waterGoal ?? null,
          calorieGoal: response.data?.calorieGoal ?? null,
        });
      } catch {
        if (!active) {
          return;
        }

        setGoals({ waterGoal: null, calorieGoal: null });
      }
    };

    loadGoals();

    return () => {
      active = false;
    };
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Kaizen Member';
  const initials = useMemo(() => {
    const words = displayName.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return 'KM';
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
  }, [displayName]);

  return (
    <aside className="hidden 2xl:block 2xl:w-80 bg-kaizen-lightgreen border-l-3 border-kaizen-black overflow-y-auto">
      <div className="p-5 space-y-4">
        <h2 className="font-heading text-3xl uppercase tracking-wide">Profile</h2>

        <div className="border-3 border-kaizen-black bg-white p-4">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-black object-cover bg-kaizen-mint"
              />
            ) : (
              <div className="w-14 h-14 rounded-full border-2 border-black bg-kaizen-mint flex items-center justify-center font-heading text-lg uppercase">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-heading text-xl uppercase leading-tight truncate">{displayName}</p>
              <p className="font-mono text-xs text-gray-700 truncate">{user?.email ?? 'No email found'}</p>
            </div>
          </div>
        </div>

        <div className="border-3 border-kaizen-black bg-white p-4 space-y-3">
          <p className="font-heading text-sm uppercase tracking-widest">Daily Goals</p>
          <div className="flex items-center justify-between border-2 border-black px-3 py-2">
            <span className="font-mono text-xs uppercase">Water</span>
            <span className="font-heading text-sm uppercase">
              {goals.waterGoal != null ? `${goals.waterGoal} ml` : 'Not Set'}
            </span>
          </div>
          <div className="flex items-center justify-between border-2 border-black px-3 py-2">
            <span className="font-mono text-xs uppercase">Calories</span>
            <span className="font-heading text-sm uppercase">
              {goals.calorieGoal != null ? `${goals.calorieGoal} kcal` : 'Not Set'}
            </span>
          </div>
        </div>

        <div className="border-3 border-kaizen-black bg-white p-4 space-y-3">
          <p className="font-heading text-sm uppercase tracking-widest">Quick Actions</p>
          <button
            type="button"
            className="w-full bg-black text-white border-2 border-black font-heading uppercase py-2 hover:bg-white hover:text-black transition-colors"
            onClick={() => navigate('/settings')}
          >
            Edit Profile
          </button>
          <button
            type="button"
            className="w-full bg-kaizen-mint text-black border-2 border-black font-heading uppercase py-2 hover:bg-white transition-colors"
            onClick={() => navigate('/programs')}
          >
            View Subscription
          </button>
        </div>
      </div>
    </aside>
  );
};

// Layout wrapper for authenticated pages
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-kaizen-green border-2 border-black flex flex-col justify-center items-center gap-1"
      >
        <span className={`w-5 h-0.5 bg-black transition-transform ${sidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-black transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-black transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Sidebar - hidden on mobile by default, visible on lg */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-y-0 left-0 z-40 w-72 xl:w-80 bg-kaizen-green border-r-3 border-black overflow-y-auto`}>
        <SideBar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:pt-0 pt-14 overflow-hidden">
        {children}
      </div>

      <ProfileAside />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<AppLayout><DashboardMain /></AppLayout>} />
        <Route path="/nutrition" element={<AppLayout><Nutrition /></AppLayout>} />
        <Route path="/community" element={<AppLayout><CommSection /></AppLayout>} />
        <Route path="/programs" element={<AppLayout><ProgramsMain /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
      </Routes>
    </Router>
  );
}

// Example Landing Page Component
const LandingPage = () => {
  return (
       <>
       <Header />
       <Section1 />
       <Footer />
       </>
  );
};

export default App;
