//frontend/src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const userResponse = await axios.get('/api/users/profile', config);
      console.log('API Response:', userResponse.data); // Check the structure of the response
      setUser(userResponse.data);
      console.log(userResponse.data.user);

      // Fetch stats and workout plans data...
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.Name || 'Guest'}!</h1>
      {/* Add other components like charts and workout plan listings here */}
    </div>
  );
};

export default Dashboard;