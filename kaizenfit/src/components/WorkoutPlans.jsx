// frontend/src/pages/Dashboard/WorkoutPlans.jsx
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const WorkoutPlans = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {headers: {Authorization: `Bearer ${token}`}};
                const response = await axios.get('/api/workouts', config);
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div>
            <h1>Your Workout Plans</h1>
            {workouts.map(workout => (
                <div key={workout.planId}>
                    <h2>{workout.name}</h2>
                    <p>{workout.description}</p>
                </div>
            ))}
        </div>
    );
};

export default WorkoutPlans;

