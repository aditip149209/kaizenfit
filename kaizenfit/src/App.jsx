import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
const LandingPage = () => {
  return (
   
       <>
       <div className="relative h-screen w-full bg-gradient-to-bl from-cyan-900 via-slate-900 to-black">
       <div className="absolute top-4 left-4">
          <img src="/KaizenLogo.png" alt="KaizenFit Logo" className="h-18 w-18 object-contain" />
        </div>
           
       <div className="absolute top-4 right-4 flex space-x-4">
       <Link to="/login">
         <button className="px-6 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-500 transition duration-300 ease-in-out transform hover:scale-105">
           Sign In
         </button>
         </Link>
         <Link to="/register">
         <button className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-cyan-500 transition duration-200 ease-in-out transform hover:scale-105">
           Register
         </button>
         
         </Link>
       </div>
       
       
       <section className="h-200 flex flex-col justify-center items-center text-white text-center">
         <h1 className="text-4xl md:text-6xl font-bold">
         Optimize Every Move  <br /> With   
           <span className="italic text-cyan-400"> Data-Driven Workouts</span>
         </h1>
         <p className="mt-4 text-gray-300 text-lg max-w-2xl">
         Your Smartest Workout Companion - Track, Improve, Repeat
         </p>
       </section>
       </div>
       
       <section className="relative h-screen py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
       <div className="max-w-6xl mx-auto px-6 text-center">
       <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400">
       Why Choose Our Fitness Tracker?
       </h2>
       <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
       Elevate your fitness journey with AI-driven analytics, real-time tracking, and personalized workout plans.
       </p>
       
       
       <div className="mt-12 grid md:grid-cols-3 gap-10">
       
       <div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
         <div className="text-5xl text-cyan-400">🔥</div>
         <h3 className="mt-4 text-xl font-bold">AI-Powered Workouts</h3>
         <p className="mt-2 text-gray-400">
           Get personalized routines with AI-driven recommendations based on your performance.
         </p>
       </div>
       
       
       <div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
         <div className="text-5xl text-cyan-400">📊</div>
         <h3 className="mt-4 text-xl font-bold">Real-Time Performance Tracking</h3>
         <p className="mt-2 text-gray-400">
           Monitor your heart rate, calories burned, and progress in real-time.
         </p>
       </div>
       
       
       <div className="p-6 bg-gray-900 rounded-xl shadow-lg shadow-cyan-500/50 hover:scale-105 transition duration-300">
         <div className="text-5xl text-cyan-400">🌍</div>
         <h3 className="mt-4 text-xl font-bold">Seamless Wearable Integration</h3>
         <p className="mt-2 text-gray-400">
         Set personalized fitness goals and track your progress with AI-driven insights
         </p>
       </div>
       </div>
       </div>
       </section>

       <section className="bg-gradient-to-tl from-black to-slate-800 relative h-screen py-12 text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-4 flex">Ready to Get Started?</h2>
        <Link to="/register">
          <button className="flex px-8 py-4 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
            Join Now
          </button>
        </Link>
      </section>


       <footer className="bg-slate-900 text-gray-300 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} KaizenFit. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400">Contact Us</a>
          </div>
        </div>
      </footer>
       </>
  );
};

export default App;
