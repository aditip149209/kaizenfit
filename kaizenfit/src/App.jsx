import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';


function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={} /> */}
        {/* <Route path="/register" element={} /> */}
        {/* <Route path="/onboarding" element={} /> */}
        {/* <Route path="/dashboard" element={<Dashboard /> } /> */}
      </Routes>
    </Router>
  );
}

// Example Landing Page Component


export default App;
