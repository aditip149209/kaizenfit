import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-y-0 left-0 z-40 w-56 bg-kaizen-green border-r-3 border-black overflow-y-auto`}>
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
