//frontend/src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import WaterIntakeCard from '../components/WaterIntakeCard';
import CaloriesConsumed from '../components/CaloriesConsumed';
import ConnectTrackerCard from '../components/connectTrackerCard';
import WeightSection from '../components/WeightSection';
import NutritionSection from '../components/NutritionSection';
import WorkoutSection from '../components/WorkoutSection';

import WeightLossProgress from '../components/WeightChart';
import Trends from '../components/TrendWeight';
import WeightGoal from '../components/WeightGoal';


const Dashboard = () => {
  const waterGoal = 8; 
  const calGoal = 2000;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentWeight = 148; // Replace with dynamic data
  const goalWeight = 135;
  const startingWeight = 154;

  const trendsData = [
    { label: 'Last 7 Days', value: '-2' },
    { label: 'Last 30 Days', value: '-4' },
    { label: 'All Time', value: '-6' },
  ];

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');

  }
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const userResponse = await axios.get('http://localhost:5000/api/users/profile', config);
        console.log('API Response:', userResponse.data);
        setUser(userResponse.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to fetch user data');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);
  
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-gray-300 p-4 text-center justify-center">
      
      <div className="flex flex-col items-center pb-6">
         <img src='/KaizenLogo.png' alt="KaizenFit Logo" className="h-24 w-24 object-contain mb-2" />
         <h2 className="text-3xl font-semibold text-gray-400">KaizenFit</h2>
      </div>
        <ul className="space-y-2">
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            Quick Stats
          </li>
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            Progress Overview
          </li>
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            Fitness Plans
          </li>
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            Activity Reminders
          </li>
        </ul>
        <div className="mt-8 absolute bottom-6 left-7 ">
          <button className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer">
            View Events
          </button>
          <button className="w-full mt-2 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
            Settings
          </button>
          <button onClick={handleSignOut} className="w-full mt-2 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-200 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-gray-300">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="flex flex-col gap-4">
          <Card userName={user.Name} />
          
          
          <NutritionSection />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8">
          <WaterIntakeCard waterConsumed={6} waterGoal={waterGoal} />
          <CaloriesConsumed calGoal={calGoal}/>
          <ConnectTrackerCard />
          </div>
          <WeightSection/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8">
          
          

          </div>
          <WorkoutSection />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8">
         
          <WaterIntakeCard waterConsumed={6} waterGoal={waterGoal} />
          <CaloriesConsumed calGoal={calGoal}/>
          <ConnectTrackerCard />
          </div>
          </div>
        
        {/* Add other components like charts and workout plan listings here */}
      </div>
      <div className="w-128 bg-gray-100 border-l border-gray-300 p-4">
        {/* Second sidebar */}


      </div>
    </div>
  );
};

export default Dashboard;