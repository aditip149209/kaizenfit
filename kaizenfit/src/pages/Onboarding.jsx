import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Onboarding = () => {
    const [data, setData] = useState({height : '', weight: '', goal: '', birthday: '', fitnessLevel: ''});
    const navigate = useNavigate();
    const [step, setStep] = useState(1);


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

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <>
         <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-black">
  <div className="bg-[#2E3A47] p-10 rounded-2xl shadow-2xl w-full max-w-md">
    
    {/* ✅ Progress Bar */}
    <div className="relative mb-8">
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className={`h-2 bg-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_#1E90FF`}
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>
      <div className="absolute top-3 left-0 w-full flex justify-between text-xs text-gray-400 font-medium">
        <span className={`${step >= 1 ? 'text-cyan-400' : ''}`}>Height</span>
        <span className={`${step >= 2 ? 'text-cyan-400' : ''}`}>Weight</span>
        <span className={`${step >= 3 ? 'text-cyan-400' : ''}`}>Goal</span>
        <span className={`${step >= 4 ? 'text-cyan-400' : ''}`}>Birthday</span>
        <span className={`${step >= 5 ? 'text-cyan-400' : ''}`}>Fitness Level</span>
      </div>
    </div>

    {/* ✅ Step 1 - Height */}
    {step === 1 && (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[#00CED1] mb-6 text-center">
          Step 1: Height
        </h2>
        <input 
          type="number"
          name="height"
          placeholder="Enter Height (cm)"
          value={data.height}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition duration-300"
          required 
        />
        <button
          type="button"
          onClick={nextStep}
          className="mt-6 w-full bg-cyan-500 hover:bg-[#00CED1] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all"
        >
          Next
        </button>
      </div>
    )}

    {/* ✅ Step 2 - Weight */}
    {step === 2 && (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[#00CED1] mb-6 text-center">
          Step 2: Weight
        </h2>
        <input 
          type="number"
          name="weight"
          placeholder="Enter Weight (kg)"
          value={data.weight}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition duration-300"
          required 
        />
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-cyan-500 hover:bg-[#00CED1] text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* ✅ Step 3 - Goal */}
    {step === 3 && (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[#00CED1] mb-6 text-center">
          Step 3: Goal
        </h2>
        <select
          name="goal"
          value={data.goal}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition duration-300"
          required
        >
          <option value="" disabled>Select Goal</option>
          <option value="Lose Fat">Lose Fat</option>
          <option value="Build Muscle">Build Muscle</option>
          <option value="Improve Endurance & Performance">Improve Endurance & Performance</option>
          <option value="Enhance Overall Health & Wellness">Enhance Overall Health & Wellness</option>
          <option value="Maintain & Tone">Maintain & Tone</option>
        </select>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-cyan-500 hover:bg-[#00CED1] text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* ✅ Step 4 - Birthday */}
    {step === 4 && (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[#00CED1] mb-6 text-center">
          Step 4: Birthday
        </h2>
        <input 
          type="date"
          name="birthday"
          value={data.birthday}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition duration-300"
          required
        />
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-cyan-500 hover:bg-[#00CED1] text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* ✅ Step 5 - Fitness Level */}
    {step === 5 && (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[#00CED1] mb-6 text-center">
          Step 5: Fitness Level
        </h2>
        <select
          name="fitnessLevel"
          value={data.fitnessLevel}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition duration-300"
          required
        >
          <option value="" disabled>Select fitness level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
          <option value="professional">Professional</option>
        </select>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    )}
  </div>
</div>      
        </>
    );
}

export default Onboarding;

