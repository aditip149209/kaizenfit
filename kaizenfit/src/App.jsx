import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/AuthUser';
import Dashboard from './pages/DashBoard';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

// Example Landing Page Component
const LandingPage = () => {
  return (
    <>
    <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">KaizenFit</h1>
        {/* Login Button */}
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
        </Link>
      </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold">Welcome to KaizenFit</h2>
    </div>
    </>
  );
};

export default App;
