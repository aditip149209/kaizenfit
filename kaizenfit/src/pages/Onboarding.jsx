import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Onboarding = () => {
    const [data, setData] = useState({height : '', weight: '', goal: ''});
    const navigate = useNavigate();


    const handleChange = (e) => {
        setData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/users/onboarding', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <>
        <form onSubmit={handleSubmit}>
        <input 
        type="number" 
        name="height" 
        placeholder="Height (cm)" 
        value={data.height} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="number" 
        name="weight" 
        placeholder="Weight (kg)" 
        value={data.weight} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="text" 
        name="goal" 
        placeholder="Goal (e.g., Fat Loss)" 
        value={data.goal} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Complete Onboarding</button>
        </form>
        </>
    );
}

export default Onboarding;

