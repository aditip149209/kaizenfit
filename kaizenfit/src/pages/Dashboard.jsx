import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CreateEditWorkoutModal } from '../components/CreateEditWorkoutModal';
import CreateCustomExercise from '../components/CreateCustomExercise';
import { ViewWorkout } from './ViewWorkout';
import TrackCalories from './TrackCalories';
import LogWeightModal from './LogWeight';
import EditWeightGoal from './EditWeightGoal';
import { ViewDiet } from './ViewDiet';
import AddFoodItem from './AddFoodItem';
import WaterGoalModal from './WaterGoal';
import CreateNewDiet from '../components/CreateNewDiet';


export const Dashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // State to store data for the dashboard sections
  const [profile, setProfile] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [todayDiet, setTodayDiet] = useState([]);
  const [calories, setCalories] = useState({});
  const [waterIntake, setWaterIntake] = useState({current : 0, goal : 8});
  const [weightProgress, setWeightProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([])


  //states to toggle between modal popups
  const [showTodayWorkout, setShowTodayWorkout] = useState(false);
  const [showCreateEditWorkout, setShowCreateWorkout] = useState(false);
  const [createExercise, setCreateExercise] = useState('');
  const [showEditWaterGoal, setShowEditWaterGoal] = useState(false);
  const [showDietPlan, setShowDietPlan] = useState(false);
  const [showTodayCalories, setShowTodayCalories] = useState(false);
  const [weightGoal, setWeightGoal] = useState(false)
  const [logWeight, setLogWeight] = useState(false);
  const [addFoodItem, setAddFoodItem] = useState(false);
  const [addNewDiet, setAddNewDiet] = useState(false);

 

 

  // Function to calculate the percentage for progress bars
  const calculateProgressPercentage = (current, goal) => {
    if(!goal) return 0;
    return Math.min((current / goal) * 100, 100); // Ensure it's capped at 100%
  };

  
  const incrementWater = () => {
    setWaterIntake(prev => ({
      ...prev,
      current: prev.current + 1 // cap at goal
    }));
  };

  const decrementWater = () => {
    setWaterIntake(prev => ({
      ...prev,
      current: Math.max(0, prev.current - 1), // no negative values
    }));
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
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">Workout of the Day</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {workouts.map((workout, index) => (
                  <li key={index}>{workout}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
              onClick={() => setShowTodayWorkout(true)}>View Details</button>
              {showTodayWorkout && <ViewWorkout onClose={() => setShowTodayWorkout(false)} /> }
            </div>

            {/* Custom Workouts Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">My Workouts</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {customWorkouts.map((workout, index) => (
                  <li key={index}>{workout}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
              onClick={() => setCreateExercise(true)}>Create New Exercise</button>
              {createExercise && <CreateCustomExercise onClose={() => setCreateExercise(false)} token={token}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
              onClick={() => setShowCreateWorkout(true)}>Create New Workout</button>
              {showCreateEditWorkout && <CreateEditWorkoutModal onClose={() => setShowCreateWorkout(false)} exerciseList={exerciseList} setExerciseList={setExerciseList}/>}
            </div>

            {/* Diet Plan Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">Diet Plan</div>
              <ul className="ml-[20px] text-[#b2dfdb] text-[0.95rem]">
                {todayDiet.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setAddFoodItem(true)}>Add Food Item</button>
              {addFoodItem && <AddFoodItem onClose={() => setAddFoodItem(false)}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setShowDietPlan(true)}>View Diet Plan</button>
              {showDietPlan && <ViewDiet onClose={() => setShowDietPlan(false)}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setAddNewDiet(true)}>Create New Diet</button>
              {addNewDiet && <CreateNewDiet onClose={() => setAddNewDiet(false)}/>}
            </div>

            {/* Water Intake Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
      <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">Water Intake</div>
      <div className="text-[1.1rem] mb-[8px]">Water: {waterIntake.current}/{waterIntake.goal}glasses</div>
      
      {/* Progress Bar */}
      <div className="relative pt-[5px] mb-3">
        <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
        <div
          className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full transition-all duration-300"
          style={{ width: `${calculateProgressPercentage(waterIntake.current, waterIntake.goal)}%` }}
        ></div>
      </div>

      {/* Plus & Minus Buttons */}
      <div className="flex items-center justify-between mt-2 gap-5">
        <button
          onClick={decrementWater}
          className="w-10 h-10 rounded-full bg-[#1e5a5a] hover:bg-[#3f8b8b] text-white text-xl flex items-center justify-center transition-colors"
        >−</button>
        <button
          onClick={incrementWater}
          className="w-10 h-10 rounded-full bg-[#1e5a5a] hover:bg-[#3f8b8b] text-white text-xl flex items-center justify-center transition-colors"
        >+</button>
        <button
          className="ml-auto bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors text-sm"
          onClick={() => setShowEditWaterGoal(true)}>
          Edit Water Goal
        </button>
        {showEditWaterGoal && <WaterGoalModal onClose={() => setShowEditWaterGoal(false)}/>}
      </div>
    </div>

            {/* Weight Progress Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">Weight Progress</div>
              <div className="text-[1.1rem] mb-[6px]">Weight: {weightProgress.current}kg</div>
              <div className="text-[#b2dfdb] text-[0.95rem] mb-5">Goal: {weightProgress.goal}kg</div>
              <div className="relative pt-[5px]">
                <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
                <div
                  className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full"
                  style={{ width: `${calculateProgressPercentage(weightProgress.current, weightProgress.goal)}%` }}
                ></div>
              </div>
              <button className="mt-6 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setLogWeight(true)}>Log Weight</button>
              {logWeight && <LogWeightModal onClose={() => setLogWeight(false)}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setWeightGoal(true)}>Edit Weight Goal</button>
              {weightGoal && <EditWeightGoal onClose={() => setWeightGoal(false)}/>}
              
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
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setShowTodayCalories(true)}>Track Calories</button>
              {showTodayCalories && <TrackCalories onClose={() => setShowTodayCalories(false)}/>}
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
   


<Link to="/profilesettings">
  <div className="cursor-pointer">
    <h4 className="text-sm font-medium text-gray-200">View Profile</h4>
    <p className="text-xs text-gray-500">Profile & preferences</p>
  </div>
</Link>

    </div>     
  </div>
  </div>
  </div>
    </div>
  );  
};
