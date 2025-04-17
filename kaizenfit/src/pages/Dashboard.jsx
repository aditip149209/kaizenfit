import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const token = localStorage.getItem('token');
  // Styles for various elements
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
    },
    sidebar: {
      background: '#142626',
      width: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 0',
      gap: '30px',
      borderTopLeftRadius: '20px',
      borderBottomLeftRadius: '20px',
    },
    icon: {
      width: '40px',
      height: '40px',
      background: '#1d3434',
      borderRadius: '12px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s',
    },
    iconImg: {
      width: '22px',
      height: '22px',
      objectFit: 'contain',
      display: 'block',
    },
    mainContent: {
      flex: 1,
      padding: '40px 0 40px 40px',
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
    },
    dashboard: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
    },
    dashboardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    dashboardHeaderH2: {
      fontSize: '1.2rem',
      fontWeight: 600,
      margin: 0,
    },
    goal: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#a0c7c7',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '25px',
    },
    card: {
      background: '#182828',
      borderRadius: '18px',
      padding: '20px 22px',
      minHeight: '130px',
      boxShadow: '0 2px 8px rgba(20, 40, 40, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: '0.95rem',
      color: '#7ed6c0',
      marginBottom: '6px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
    },
    veganBadge: {
      background: '#1dbd6b',
      color: '#fff',
      borderRadius: '14px',
      padding: '2px 13px',
      fontSize: '0.85rem',
      fontWeight: 600,
      marginLeft: '10px',
    },
    ul: {
      margin: '6px 0 0 0',
      padding: 0,
      paddingLeft: '20px',
      fontSize: '0.95rem',
      color: '#b2dfdb',
    },
    calorieBars: {
      marginTop: '13px',
    },
    bar: {
      background: '#233c3c',
      borderRadius: '8px',
      height: '8px',
      marginBottom: '7px',
      overflow: 'hidden',
      width: '100%',
    },
    barInner: {
      height: '100%',
      borderRadius: '8px',
    },
    carbsBar: { background: '#7ed6c0', width: '70%' },
    proteinBar: { background: '#1dbd6b', width: '45%' },
    fatsBar: { background: '#e67e22', width: '20%' },
    btn: {
      background: '#1dbd6b',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '7px 18px',
      fontSize: '0.95rem',
      fontWeight: 600,
      marginTop: '10px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    waterProgress: {
      width: '100%',
      background: '#233c3c',
      borderRadius: '8px',
      height: '8px',
      margin: '10px 0',
    },
    waterProgressInner: {
      background: '#7ed6c0',
      height: '8px',
      borderRadius: '8px',
      width: '75%',
    },
    weightProgress: {
      fontSize: '1.1rem',
      marginBottom: '8px',
      fontWeight: 600,
    },
    weightChange: {
      color: '#7ed6c0',
      fontSize: '0.98rem',
      marginBottom: '8px',
    },
    weightGraph: {
      height: '40px',
      margin: '10px 0',
      position: 'relative',
    },
    sleepChart: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '40px',
      gap: '4px',
      margin: '10px 0',
    },
    sleepBarContainer: {
      flex: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    sleepBar: {
      background: '#7ed6c0',
      borderRadius: '4px',
    },
    sleepBars: [
      { height: '60%' },
      { height: '80%' },
      { height: '70%' },
      { height: '90%' },
      { height: '75%' },
      { height: '85%' },
      { height: '65%' },
    ],
    editGoalBtn: {
      background: '#233c3c',
      color: '#7ed6c0',
      border: 'none',
      borderRadius: '8px',
      padding: '3px 10px',
      fontSize: '0.85rem',
      cursor: 'pointer',
      marginTop: '3px',
    },
    // Responsive styles can be handled via media queries in CSS, or inline styles with window width checks
  };
  
  const navigate = useNavigate();
  

    // State to store data from the backend
    const [profile, setProfile] = useState({});
    const [workouts, setWorkouts] = useState([]);
    const [todayWorkout, setTodayWorkout] = useState([]);
    const [todayDiet, setTodayDiet] = useState([]);
    const [calories, setCalories] = useState({});
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage

        // Fetch user profile
        const profileResponse = await axios.get('http://localhost:3000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileResponse.data);

        // Fetch workouts
        const Response = await axios.get('http://localhost:3000/api/user/workoutoftheday', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(workoutsResponse.data);

        

        setLoading(false); // Data loaded
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchData();
  }, [navigate]);
 

  const addWorkout = async () => {
    const response = await axios.post('http://localhost:3000/api/user/customworkout', { name: newWorkout, duration: 30 });
    setWorkouts([...workouts, response.data]);
  };
  
  return (


    <div style={{ display: 'flex', minHeight: '100vh', background: '#101c1c', fontFamily: "'Montserrat', sans-serif", color: '#e7f6f2', margin: 0 }}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.icon} onClick={() => navigate('/dashboard')}>
          <img src="icons/KaizenLogo.png" alt="Logo" style={styles.iconImg} />
        </div>
        <div style={styles.icon} onClick={() => navigate('/dashboard')}>
          <img src="icons/home.png" alt="Home" style={styles.iconImg} />
        </div>
        <div style={styles.icon} onClick={() => navigate('/diet')}>
          <img src="icons/meal.png" alt="Diet" style={styles.iconImg} />
        </div>
        <div style={styles.icon} onClick={() => navigate('/settings')}>
          <img src="icons/settings.png" alt="Settings" style={styles.iconImg} />
        </div>
        <div style={styles.icon} onClick={() => navigate('/logout')}>
          <img src="icons/logout.png" alt="Logout" style={styles.iconImg} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px 0 40px 40px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {/* Dashboard */}
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Header */}
          <div style={styles.dashboardHeader}>
            <h2 style={styles.dashboardHeaderH2}>Welcome, Aditi</h2>
            <div style={styles.goal}>Fitness Goal: <b>Build Muscle</b></div>
          </div>

          {/* Cards Grid */}
          <div style={styles.cardsGrid}>
            {/* Diet Plan Card */}
            <div style={styles.card}>
              <div style={styles.label}>
                DIET PLAN
               
              </div>
              <ul style={styles.ul}>
                <li>Breakfast: Oats with almond milk</li>
                <li>Lunch: Grilled Tofu with Pickle</li>
                <li>Evening Snacks: Walnuts and dates</li>
                <li>Dinner: Quinoa with Masala sprouts</li>
              </ul>
              <div style={{ fontSize: '0.95rem', color: '#b2dfdb', marginTop: 8 }}>Calories: 1200/1800</div>
            </div>

            {/* Calorie Tracker Card */}
            <div style={styles.card}>
              <div style={styles.label}>CALORIE TRACKER</div>
              <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>Calories: 1100/1800</div>
              <div style={styles.calorieBars}>
                <div style={{ fontSize: '0.93rem' }}>Carbs</div>
                <div style={styles.bar}><div style={{ ...styles.barInner, ...styles.carbsBar }}></div></div>
                <div style={{ fontSize: '0.93rem' }}>Proteins</div>
                <div style={styles.bar}><div style={{ ...styles.barInner, ...styles.proteinBar }}></div></div>
                <div style={{ fontSize: '0.93rem' }}>Fats</div>
                <div style={styles.bar}><div style={{ ...styles.barInner, ...styles.fatsBar }}></div></div>
              </div>
              <button style={styles.btn} onClick={() => navigate('/trackcalories')}>Track Calories</button>
            </div>

            {/* Water Tracker Card */}
            <div style={styles.card}>
              <div style={styles.label}>WATER TRACKER</div>
              <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>6 glasses</div>
              <div style={styles.waterProgress}>
                <div style={{ ...styles.waterProgressInner }}></div>
              </div>
              <div style={{ fontSize: '0.93rem', color: '#b2dfdb' }}>Goal: 8 Glasses</div>
              <button style={styles.editGoalBtn} onClick={() => navigate('/waterGoal')}>Edit Goal</button>
            </div>

            {/* Weight Progress Card */}
            <div style={styles.card}>
              <div style={styles.label}>WEIGHT PROGRESS</div>
              <div style={styles.weightProgress}>67 kg → 60 kg</div>
              <div style={styles.weightChange}>1.8 kg down in 2 weeks</div>
              <div style={styles.weightGraph}></div>
              <button style={styles.btn} onClick={() => navigate('/logweight')}>Log Weight</button>
            </div>

            {/* Today's Workout */}
            <div style={styles.card}>
              <div style={styles.label}>TODAY'S WORKOUT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                FULL BODY HIIT
                <span style={styles.workoutStatus}>PENDING</span>
              </div>
              <div style={{ fontSize: '0.98rem', margin: '6px 0' }}>30 MINS<br />250 KCAL</div>
              <button style={{ ...styles.btn, marginBottom: 7 }} onClick={() => navigate('/myworkout')}>VIEW WORKOUT</button>
              <button style={{ ...styles.btn, background: '#7ed6c0', color: '#182828' }} onClick={() => navigate('/myworkout')}>MARK AS COMPLETED</button>
            </div>

            {/* My Workouts */}
            <div style={styles.card}>
              <div style={styles.label}>MY WORKOUTS</div>
              <div style={styles.myWorkoutsList}>
                <div style={styles.workoutRow}>
                  <span>Leg Day</span>
                  <span>
                    45 min
                  </span>
                </div>
                <div style={styles.workoutRow}>
                  <span>Back</span>
                  <span>
                    35 min
                  </span>
                </div>
                <div style={styles.workoutRow}>
                  <span>Upper Body</span>
                  <span>
                    25 min 
                  </span>
                </div>
                <div style={styles.workoutRow}>
                  <span>Glutes</span>
                  <span>
                  </span>
                </div>
              </div>
              <button style={{ ...styles.btn, marginTop: 12, background: '#345c3c' }} onClick={() => navigate("/myworkout")}>Add Workout</button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div style={styles.sidePanel}>
          {/* Profile Section */}
          <div style={styles.profileSection}>
            <div style={styles.profilePic}></div>
            <button style={styles.viewProfileBtn} onClick={() => navigate('/logout')}>View Profile</button>
          </div>
          {/* Heart Rate */}
          
          {/* Steps */}
          <div style={styles.stepsSection}>
            <div style={styles.stepsLabel}>Steps</div>
            <div style={styles.stepsCount}>Today: 8001 steps</div>
            <div style={{ fontSize: '0.94rem', color: '#b2dfdb' }}>Goal: 8 Hours</div>
          </div>
          {/* Sleep */}
          <div style={styles.sleepSection}>
            <div style={{ ...styles.sleepLabel, color: '#b2dfdb' }}>Sleep</div>
            <div style={styles.sleepHours}>7 Hr 45 Min</div>
            <div style={styles.sleepChart}>
              {['sleep-bar-1', 'sleep-bar-2', 'sleep-bar-3', 'sleep-bar-4', 'sleep-bar-5', 'sleep-bar-6', 'sleep-bar-7'].map((cls, index) => (
                <div key={index} style={styles.sleepBarContainer}>
                  <div style={{ ...styles.sleepBar, ...styles[cls] }}></div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.94rem', color: '#b2dfdb' }}>Goal: 8 Hours</div>
            <button style={styles.editGoalBtn} onClick={() => navigate('/logout')}>Edit Goal</button>
          </div>
        </div>
      </div>
    </div>
  );
};


