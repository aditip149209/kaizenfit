import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () =>{
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try{
        const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        setSuccess(response.data.message);
        setTimeout(() => navigate('/onboarding'), 2000); 
    }
    catch(err){
        console.log(err);
        setError(err.response?.data?.message || 'Registration Failed');

    }}

    return (
        <div className="flex justify-center items-center h-screen bg-slate-900">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
            </form>
          </div>
        </div>
      );

};

export default Register;
