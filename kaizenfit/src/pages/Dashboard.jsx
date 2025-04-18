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
import DashboardProfileCard from '../components/DashboardProfileCard';


const Dashboard = () => {
  const waterGoal = 8; 
  const calGoal = 2000;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleFitnessPlan = (e) => {
    e.preventDefault();
    navigate('/fitnessplans');
  }

  const handleProgress = (e) => {
    e.preventDefault();
    navigate('/progress');
  }

  const handleQuickStats = (e) => {
    e.preventDefault();
    navigate('/stats');
  }

  const handleSettings = (e) => {
    e.preventDefault();
    navigate('/settings');
  }

  const handleView = (e) => {
    e.preventDefault();
    navigate('/view')

  }

  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/editprofile');
  }

  const handleYourPlan = (e) => {
    e.preventDefault();
    navigate('/yourplan');
  }

  const handleHelp = (e) => {
    e.preventDefault();
    navigate('/help');
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
      <div className="w-64 bg-slate-800 border-r border-slate-800 p-4 text-center justify-center">
      
      <div className="flex flex-col items-center pb-6">
         <img src='/KaizenLogo.png' alt="KaizenFit Logo" className="h-24 w-24 object-contain mb-2" />
         <h2 className="text-3xl font-semibold text-gray-400">KaizenFit</h2>
      </div>
        <ul className="space-y-2">
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            <button className='cursor-pointer' onClick={handleQuickStats}>Quick Stats</button>
          </li>
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            <button className='cursor-pointer' onClick={handleProgress}>Progress Overview</button>
          </li>
          <li className="text-center p-3 bg-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer text-white">
            <button className='cursor-pointer' onClick={handleFitnessPlan}>Fitness Plans</button>
          </li>
          
        </ul>
        <div className="mt-8 absolute bottom-6 left-7 ">
          <button onClick = {handleView} className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer">
            View Events
          </button>
          <button onClick={handleSettings} className="w-full mt-2 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
            Settings
          </button>
          <button onClick={handleSignOut} className="w-full mt-2 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-200 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-300 bg-slate-500">
        <h1 className="text-2xl font-bold mb-6 text-gray-200">Dashboard</h1>
        <div className="flex flex-col gap-4">
          <Card userName={user.Name} />
          
          <NutritionSection />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8">
          <WaterIntakeCard waterConsumed={6} waterGoal={waterGoal} />
          <CaloriesConsumed calGoal={calGoal}/>
          <ConnectTrackerCard />
          </div>
          <WeightSection/>     
          <WorkoutSection />
          </div>
        
        {/* Add other components like charts and workout plan listings here */}
      </div>
      <div className="w-104 bg-slate-800 border-l border-slate-800 p-4 flex justify-center items-center h-full">
        {/* Second sidebar */}
        <div className='items-center flex flex-col'>
        <DashboardProfileCard />
        <div className="mt-4 space-y-2 flex flex-col">
                    <button onClick = {handleEdit} className="w-64 bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Edit Profile</button>
                    <button onClick = {handleYourPlan} className="w-64 bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Your Plan</button>
                    <button onClick = {handleHelp} className="w-64 bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Help</button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;