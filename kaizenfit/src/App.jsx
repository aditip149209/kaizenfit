import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/LoginUser';
import Register from './pages/RegisterUser';
import Onboarding from './pages/Onboarding';
import TrackCalories from './pages/TrackCalories';
import WaterGoalModal from './pages/WaterGoal';
import SettingsAccount from './pages/SettingsAccount';
import LogWeightModal from './pages/LogWeight';
import { ViewWorkout } from './pages/ViewWorkout';


function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/trackcalories" element={<TrackCalories/>} />
        <Route path="/waterGoal" element={<WaterGoalModal />} />
        <Route path="/settings" element={<SettingsAccount />} />
        <Route path="/logweight" element={<LogWeightModal/>} />
        <Route path="/myworkout" element={<ViewWorkout/>} />
      </Routes>
    </Router>
  );
}


// Example Landing Page Component


export default App;
