import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Section1 from './components/Section1';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
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
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
