import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/LoginUser';
import Register from './pages/RegisterUser';
import Onboarding from './pages/Onboarding';
import About from './pages/About';
import Contact from './pages/Contact'
import Analytics from './pages/Analytics';
import SettingsAccount from './pages/SettingsAccount';






function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  }
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About /> } />
        <Route path="/contact" element={<Contact /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profilesettings" element={<PrivateRoute><SettingsAccount /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />   
      </Routes>
    </Router>
  );
}

export default App;
