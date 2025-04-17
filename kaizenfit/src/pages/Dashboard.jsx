import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // State to store data for the dashboard sections
  const [profile, setProfile] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [todayDiet, setTodayDiet] = useState([]);
  const [calories, setCalories] = useState({});
  const [waterIntake, setWaterIntake] = useState({});
  const [weightProgress, setWeightProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch the dashboard data from the API
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch user profile data
      const profileResponse = await axios.get('http://localhost:3000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(profileResponse.data);

      // Fetch workouts for the day
      const workoutsResponse = await axios.get('http://localhost:3000/api/user/workoutoftheday', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(workoutsResponse.data);

      // Fetch custom workouts
      const customWorkoutsResponse = await axios.get('http://localhost:3000/api/user/customworkouts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomWorkouts(customWorkoutsResponse.data);

      // Fetch diet plan for the day
      const dietResponse = await axios.get('http://localhost:3000/api/user/dietplan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodayDiet(dietResponse.data);

      // Fetch calorie tracker data
      const calorieResponse = await axios.get('http://localhost:3000/api/user/calories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCalories(calorieResponse.data);

      // Fetch water intake data
      const waterResponse = await axios.get('http://localhost:3000/api/user/water', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWaterIntake(waterResponse.data);

      // Fetch weight progress data
      const weightResponse = await axios.get('http://localhost:3000/api/user/weightprogress', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeightProgress(weightResponse.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [navigate]); // Fetch data when the component mounts or the navigate function changes

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  // Function to calculate the percentage for progress bars
  const calculateProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100); // Ensure it's capped at 100%
  };

const SidebarItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition">
    <div>{icon}</div>
    <div>
      <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

  return (
    <div className="flex  min-h-screen bg-[#101c1c] font-montserrat text-[#e7f6f2]">
      {/* Sidebar */}
      <div className="bg-[#142626] w-[80px] flex flex-col items-center py-[30px] gap-[30px] rounded-tl-[20px] rounded-bl-[20px]">
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/KaizenLogo.png" alt="Logo" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/home.png" alt="Home" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/diet')}>
          <img src="icons/meal.png" alt="Diet" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/settings')}>
          <img src="icons/settings.png" alt="Settings" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/logout')}>
          <img src="icons/logout.png" alt="Logout" className="w-[22px] h-[22px] object-contain block" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-[40px_0_40px_40px] gap-[30px] flex-wrap mr-10">
        {/* Dashboard */}
        <div className="flex-3 flex flex-col gap-[25px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-[10px]">
            <h2 className="text-[1.2rem] font-semibold m-0">Welcome, {profile.name || 'Guest'}</h2>
            <div className="text-[#a0c7c7] text-[1rem] font-normal mr-10">Fitness Goal: <b>{profile.fitnessGoal || 'Maintain'}</b></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-[25px]">
            {/* Workout of the Day Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">WORKOUT OF THE DAY</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {workouts.map((workout, index) => (
                  <li key={index}>{workout}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">View Details</button>
            </div>

            {/* Custom Workouts Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">CUSTOM WORKOUTS</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {customWorkouts.map((workout, index) => (
                  <li key={index}>{workout}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">Create New</button>
            </div>

            {/* Diet Plan Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">DIET PLAN</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {todayDiet.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">View Diet Plan</button>
            </div>

            {/* Water Intake Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">WATER INTAKE</div>
              <div className="text-[1.1rem] mb-[8px]">Water: {waterIntake.current}/{waterIntake.goal}ml</div>
              <div className="relative pt-[5px]">
                <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
                <div
                  className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full"
                  style={{ width: `${calculateProgressPercentage(waterIntake.current, waterIntake.goal)}%` }}
                ></div>
              </div>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">Edit Water Goal</button>
            </div>

            {/* Weight Progress Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">WEIGHT PROGRESS</div>
              <div className="text-[1.1rem] mb-[8px]">Weight: {weightProgress.current}kg</div>
              <div className="text-[#b2dfdb] text-[0.95rem]">Goal: {weightProgress.goal}kg</div>
              <div className="relative pt-[5px]">
                <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
                <div
                  className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full"
                  style={{ width: `${calculateProgressPercentage(weightProgress.current, weightProgress.goal)}%` }}
                ></div>
              </div>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">Edit Weight Goal</button>
            </div>

            {/* Calorie Tracker Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">CALORIE TRACKER</div>
              <div className="text-[1.1rem] mb-[8px]">Calories Consumed: {calories.consumed}/{calories.goal} kcal</div>
              <div className="relative pt-[5px]">
                <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
                <div
                  className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full"
                  style={{ width: `${calculateProgressPercentage(calories.consumed, calories.goal)}%` }}
                ></div>
              </div>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors">Track Calories</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[280px] h-screen bg-[#182828] shadow-md p-4 z-50">
  <div className="m-6">
    <h2 className="text-xl font-semibold text-gray-200">Quick Access</h2>
  </div>

{/* right sidebar */}
  <div className="flex bg-[#182828] shadow-md p-4 h-screen ">
  <div className="space-y-4">
   

    <div className="flex items-start gap-3 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition">
   
      <div>
        <h4 className="text-sm font-medium text-gray-200">View Profile</h4>
        <p className="text-xs text-gray-500">Profile & preferences</p>
      </div>
    </div>  
    

   
  </div>
  </div>
  </div>
    </div>
  );  
};
