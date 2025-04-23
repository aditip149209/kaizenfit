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
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




export const Dashboard = () => {
  const token = localStorage.getItem('token');
  const id = jwtDecode(token).id
  const navigate = useNavigate();

  // State to store data for the dashboard sections
  const [profile, setProfile] = useState({});
  const [workouts, setWorkouts] = useState([]); //all the workouts created by the system
  const [customWorkouts, setCustomWorkouts] = useState([]); //all the workouts created by the user for themselves
  const [todayDiet, setTodayDiet] = useState([]);
  const [calories, setCalories] = useState({});
  const [weightProgress, setWeightProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([])
  const [glasses, setGlasses] = useState(0)
  const [volume, setVolume] = useState(0)
  const [goalGlasses, setGoalGlasses] = useState(0)
  const [goalVolume, setGoalVolume] = useState(250)
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [fitnessGoal, setFitnessGoal] = useState(''); // New state for fitness goal


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


  const handleGlassChange = (delta) => {
      setGlasses(prev => Math.max(1, Math.min(prev + delta, 20)));
    };

  const updateCurrentStatus = async () => {
    try {
      console.log(id, glasses, volume, goalVolume)
      const resposne = await axios.post('http://localhost:3000/api/user/logwater', {
        userId: id,
        quantity: glasses,
        volume: volume
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Water intake updated!");
      console.log("toast fired")
      return resposne
    } catch (err) {
      console.error(err);
      toast.error("Failed to update water intake");
    }
  };

  const getCurrentGoal = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/getcurrentgoal', {
        userId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoalGlasses(response.data.WaterIntakeGoalGlasses);
      setGoalVolume(response.data.WaterIntakeGoalVolume);
      setVolume(response.data.WaterIntakeGoalVolume);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentStatus = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/currentwaterintake', {
        userId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const data = response?.data?.data?.totalWaterIntake;
      const Quantity = data?.Quantity;
      const Volume = data?.Volume;
  
      // Fallback values: if undefined or not a number, fallback to 0 or default
      setGlasses(Number.isFinite(Quantity) ? Quantity : 0);
      setVolume(Number.isFinite(Volume) && Volume > 0 ? Volume : 250);
    } catch (err) {
      console.error("Error fetching current water intake:", err);
      // Fallback in case of error
      setGlasses(0);
      setVolume(250);
    }
  };

  //function to get all workouts that were created by the user and the system 
  const getWorkouts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/getWorkoutList?UserId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)
      const systemWorkouts = response.data.filter(workout => workout.createdByUserId === null);
      const userWorkouts = response.data.filter(workout => workout.createdByUserId === id);
  
      // Set the state with filtered workouts
      setWorkouts(systemWorkouts);
      setCustomWorkouts(userWorkouts);

      // console.log(workouts)
      
    } catch (err) {
      console.error(err);
    }
  }

  const getUserDetails = async (userId) => {
    try{
      const response = await axios.get(`http://localhost:3000/api/user/getuserdetails?UserID=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log("User details:", response.data);
      setProfile(response.data);
    }
    catch(error){
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  }



  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).id;

    getUserDetails(userId);
    getCurrentGoal();
    getCurrentStatus();
    getWorkouts()

    
    console.log(workouts)

  }, [weightGoal, logWeight, showTodayWorkout, showDietPlan, addFoodItem, addNewDiet, showEditWaterGoal, showTodayCalories, createExercise, showCreateEditWorkout]);

  // Function to calculate the percentage for progress bars
  const calculateProgressPercentage = (current, goal) => {
    if(!goal) return 0;
    return Math.min((current / goal) * 100, 100); // Ensure it's capped at 100%
  };
  
  const handleLogout = () => { 
    localStorage.removeItem('token');
    navigate('/');
  }
 

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
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar/>
      {/* Sidebar */}
      <div className="bg-[#142626] w-[80px] flex flex-col items-center py-[30px] gap-[30px] rounded-tl-[20px] rounded-bl-[20px]">
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/KaizenLogo.png" alt="Logo" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/home.png" alt="Home" className="w-[22px] h-[22px] object-contain block" />
        </div>
        
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/profilesettings')}>
          <img src="icons/settings.png" alt="Settings" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={handleLogout}>
          <img src="icons/logout.png" alt="Logout" className="w-[22px] h-[22px] object-contain block" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-[40px_0_40px_40px] gap-[30px] flex-wrap mr-10">
        {/* Dashboard */}
        <div className="flex-3 flex flex-col gap-[25px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-[10px]">
            <h2 className="text-[1.2rem] font-semibold m-0">Welcome, {profile.FirstName || 'Guest'}</h2>
            <div className="text-[#a0c7c7] text-[1rem] font-normal mr-10">Fitness Goal: <b>{profile.FitnessGoal || 'Maintain'}</b></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-[25px]">
            {/* Workout of the Day Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] h-[300px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col">
  <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[10px]">
    Workouts By KaizenFit
  </div>

  {/* Scrollable Workout List */}
  <ul className="flex-1 overflow-y-auto scrollbar-thin pr-2 text-[#b2dfdb] text-[0.95rem]">
    {workouts.map((workout, index) => (
      <li key={index} className="mb-3">
        <button
          className="w-full text-left bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
          onClick={() => {
            setSelectedWorkout(workout);
            setShowTodayWorkout(true);
          }}
        >
          {workout.Name}
        </button>
      </li>
    ))}
  </ul>  
</div>            

            {/* Custom Workouts Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
            <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[10px]">
    My Workouts
  </div>

  {/* Scrollable Workout List */}
  <ul className="flex-1 overflow-y-auto scrollbar-thin pr-2 text-[#b2dfdb] text-[0.95rem] ml-[10px] max-h-[200px]">
    {customWorkouts.map((workout, index) => (
      <li key={index} className="mb-3">
        <button
          className="w-full text-left bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
          onClick={() => {
            setSelectedWorkout(workout);
            setShowTodayWorkout(true);
          }}
        >
          {workout.Name}
        </button>
      </li>
    ))}
  </ul>

  {/* ViewWorkout Modal */}
  {showTodayWorkout && selectedWorkout && (
    <ViewWorkout
      onClose={() => setShowTodayWorkout(false)}
      workout={selectedWorkout}
    />
  )}           

              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
              onClick={() => setCreateExercise(true)}>Create New Exercise</button>
              {createExercise && <CreateCustomExercise onClose={() => setCreateExercise(false)} token={token}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
              onClick={() => setShowCreateWorkout(true)}>Create New Workout</button>
              {showCreateEditWorkout && <CreateEditWorkoutModal onClose={() => setShowCreateWorkout(false)} exerciseList={exerciseList} setExerciseList={setExerciseList} onUpdate={getWorkouts}/>}
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
               onClick={() => setShowDietPlan(true)}>View Diet Plans</button>
              {showDietPlan && <ViewDiet onClose={() => setShowDietPlan(false)}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setAddNewDiet(true)}>Create New Diet</button>
              {addNewDiet && <CreateNewDiet onClose={() => setAddNewDiet(false)}/>}
            </div>

            {/* Water Intake Card */}
            <div className="bg-[#182828] rounded-[18px] p-5 min-h-[140px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between font-montserrat">
  {/* Header */}
  <div className="flex justify-between items-center mb-3">
    <div className="text-[#7ed6c0] text-base font-semibold">Water Intake</div>
    <button
      className="bg-[#1e5a5a] text-white py-1.5 px-4 rounded-full hover:bg-[#3f8b8b] text-xs font-medium transition-colors"
      onClick={() => setShowEditWaterGoal(true)}
    >
      Edit Goal
    </button>
    {showEditWaterGoal && <WaterGoalModal onClose={() => setShowEditWaterGoal(false)} goalGlasses={goalGlasses} setGoalGlasses={setGoalGlasses} onUpdate={getCurrentGoal}/>}
  </div>

  {/* Current Intake Info */}
  <div className="text-[1.05rem] mb-3">
    Water: <span className="font-semibold">{glasses}/{goalGlasses}</span> glasses
  </div>

  {/* Progress Bar */}
  <div className="relative mb-4">
    <div className="w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
    <div
      className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full transition-all duration-300"
      style={{ width: `${calculateProgressPercentage(glasses, goalGlasses)}%` }}
    ></div>
  </div>

  {/* Plus / Minus Buttons */}
  <div className="flex items-center justify-center gap-10">
    <button
      onClick={() => {handleGlassChange(-1)}}
      className="w-10 h-10 rounded-full bg-[#1e5a5a] hover:bg-[#3f8b8b] text-white text-xl flex items-center justify-center transition-colors"
    >
      −
    </button>
    <button
      onClick={() => {handleGlassChange(1)}}
      className="w-10 h-10 rounded-full bg-[#1e5a5a] hover:bg-[#3f8b8b] text-white text-xl flex items-center justify-center transition-colors"
    >
      +
    </button>
    <button
      onClick={() => {updateCurrentStatus()}} 
      className="w-20 h-10 rounded-lg bg-[#1e5a5a] hover:bg-[#3f8b8b] text-white text-xl flex items-center justify-center transition-colors"
      >
        Save
    </button>
  </div>
</div>

            {/* Weight Progress Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col justify-between">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">Weight Progress</div>
              <div className="text-[1.1rem] mb-[6px]">Weight: {profile.WeightGoal}kg</div>
              <div className="text-[#b2dfdb] text-[0.95rem] mb-5">Goal: {profile.GoalWeight}kg</div>
              <div className="relative pt-[5px]">
                <div className="absolute top-0 left-0 w-full bg-[#2e6c6c] h-[10px] rounded-full"></div>
                <div
                  className="absolute top-0 left-0 bg-[#7ed6c0] h-[10px] rounded-full"
                  style={{ width: `${calculateProgressPercentage(profile.WeightGoal, profile.GoalWeight)}%` }}
                ></div>
              </div>
              <button className="mt-6 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setLogWeight(true)}>Log Weight</button>
              {logWeight && <LogWeightModal onClose={() => setLogWeight(false)} token={token} userId={id}/>}
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setWeightGoal(true)}>Edit Weight Goal</button>
              {weightGoal && <EditWeightGoal onClose={() => setWeightGoal(false)} token={token} userId={id}/>}
              
            </div>

            {/* Calorie Tracker Card */}
            <div className="bg-[#182828] rounded-[18px] p-[20px_22px] min-h-[130px] shadow-[0_2px_8px_rgba(20,_40,_40,_0.05)] flex flex-col">
              <div className="text-[#7ed6c0] text-[0.95rem] font-semibold mb-[6px]">CALORIE TRACKER</div>
       
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setShowTodayCalories(true)}>Track Calories</button>
              {showTodayCalories && <TrackCalories onClose={() => setShowTodayCalories(false)} token={token} id={id}/>}
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
