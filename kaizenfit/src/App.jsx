import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/AuthUser';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Header from './components/Header';
import Section1 from './components/Section1';
import Footer from './components/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  );
}

// Example Landing Page Component
const LandingPage = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      // Copy to clipboard
      navigator.clipboard.writeText(accessToken);
      alert('Token copied to clipboard!');
      console.log('Token:', accessToken);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };
  return (
   
       <>
       <Header />
       <Section1 />
       <Footer />
       
       </>
  );
};

export default App;
