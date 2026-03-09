import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface OnboardingData {
  gender: 'male' | 'female' | 'non-binary' | 'prefer_not_to_say' | '';
  height: string;
  heightType: 'cm' | 'inch';
  weight: string;
  weightType: 'kg' | 'lb';
  goal: 'lose_weight' | 'gain_muscle' | 'maintain_weight' | 'improve_fitness' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | '';
  injuries: string;
}

const STEPS = [
  { id: 1, title: 'IDENTITY', fields: ['gender'] },
  { id: 2, title: 'METRICS', fields: ['height', 'heightType', 'weight', 'weightType'] },
  { id: 3, title: 'OBJECTIVES', fields: ['goal', 'activityLevel'] },
  { id: 4, title: 'INTEL', fields: ['injuries'] },
];

// Shared styling classes
const INPUT_CLASS = "w-full bg-white border-3 border-black p-3 font-mono focus:outline-none focus:bg-kaizen-mint/30 transition-colors placeholder:text-gray-400";
const LABEL_CLASS = "block font-heading uppercase text-sm mb-2 font-bold";
const SELECT_CLASS = "w-full bg-white border-3 border-black p-3 font-mono focus:outline-none focus:bg-kaizen-mint/30 transition-colors appearance-none";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<OnboardingData>({
    gender: '',
    height: '',
    heightType: 'cm',
    weight: '',
    weightType: 'kg',
    goal: '',
    activityLevel: '',
    injuries: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = (step: number): boolean => {
    const currentStepFields = STEPS[step - 1].fields;
    
    for (const field of currentStepFields) {
      if (field === 'injuries') continue; // Injuries is optional
      if (!formData[field as keyof OnboardingData]) {
        setError(`ERROR: MISSING REQUIRED DATA FIELDS`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const token = await user?.getIdToken();
      
      // 1. Submit Profile Data
      await axios.post(
        `http://localhost:3000/api/user/profile`,
        {
          gender: formData.gender,
          height: parseFloat(formData.height),
          heightType: formData.heightType,
          weight: parseFloat(formData.weight),
          weightType: formData.weightType,
          goal: formData.goal,
          activityLevel: formData.activityLevel,
          injuries: formData.injuries || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. Update Onboarding Status
      await axios.patch(
        `http://localhost:3000/api/user/onboard`,
        { isOnboarded: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Onboarding error:', err);
      setError('SYSTEM FAILURE: COULD NOT SAVE PROFILE.');
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-kaizen-gray flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black w-full max-w-2xl shadow-neo">
        
        {/* Header */}
        <div className="bg-black border-b-3 border-black p-6 text-center">
          <h1 className="text-2xl font-heading text-kaizen-green tracking-widest uppercase">
            Initialize Profile_
          </h1>
          <p className="text-white font-mono text-xs mt-2 uppercase tracking-wide">
             Sequence {currentStep}/{STEPS.length}: {STEPS[currentStep - 1].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="border-b-3 border-black bg-white p-4">
            <div className="flex justify-between font-mono text-xs font-bold mb-1">
                <span>UPLOAD PROGRESS</span>
                <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-4 border-2 border-black p-0.5">
                <div
                    className="bg-kaizen-green h-full transition-all duration-300 ease-in-out border-r-2 border-black"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* Error Banner */}
          {error && (
            <div className="mb-6 bg-red-100 border-2 border-red-600 p-3 text-red-700 font-mono text-sm font-bold flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className={LABEL_CLASS}>Biological Gender</label>
                <div className="relative">
                    <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={SELECT_CLASS}
                    required
                    >
                    <option value="" disabled>SELECT OPTION</option>
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="non-binary">NON-BINARY</option>
                    <option value="prefer_not_to_say">PREFER NOT TO SAY</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">▼</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Body Metrics */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className={LABEL_CLASS}>Height Configuration</label>
                <div className="flex gap-0">
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="000"
                    step="0.1"
                    className={`${INPUT_CLASS} border-r-0`} // Remove right border so they merge
                    required
                  />
                  <div className="relative w-32">
                    <select
                        name="heightType"
                        value={formData.heightType}
                        onChange={handleInputChange}
                        className={`${SELECT_CLASS} h-full`}
                    >
                        <option value="cm">CM</option>
                        <option value="inch">INCH</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS}>Weight Configuration</label>
                <div className="flex gap-0">
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="00.0"
                    step="0.1"
                    className={`${INPUT_CLASS} border-r-0`}
                    required
                  />
                   <div className="relative w-32">
                        <select
                            name="weightType"
                            value={formData.weightType}
                            onChange={handleInputChange}
                            className={`${SELECT_CLASS} h-full`}
                        >
                            <option value="kg">KG</option>
                            <option value="lb">LB</option>
                        </select>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className={LABEL_CLASS}>Primary Objective</label>
                <div className="relative">
                    <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className={SELECT_CLASS}
                    required
                    >
                    <option value="" disabled>SELECT OBJECTIVE</option>
                    <option value="lose_weight">LOSE WEIGHT</option>
                    <option value="gain_muscle">GAIN MUSCLE</option>
                    <option value="maintain_weight">MAINTAIN WEIGHT</option>
                    <option value="improve_fitness">IMPROVE FITNESS</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">▼</div>
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS}>Current Activity Level</label>
                <div className="relative">
                    <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className={SELECT_CLASS}
                    required
                    >
                    <option value="" disabled>SELECT LEVEL</option>
                    <option value="sedentary">SEDENTARY (Little to no exercise)</option>
                    <option value="light">LIGHT (1-3 days/week)</option>
                    <option value="moderate">MODERATE (3-5 days/week)</option>
                    <option value="active">ACTIVE (6-7 days/week)</option>
                    <option value="very_active">VERY ACTIVE (2x daily)</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">▼</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Health Info */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className={LABEL_CLASS}>
                  System Constraints / Injuries
                </label>
                <p className="text-xs font-mono text-gray-500 mb-2 uppercase">
                  (Optional) List conditions that limit performance
                </p>
                <textarea
                  name="injuries"
                  value={formData.injuries}
                  onChange={handleInputChange}
                  placeholder="e.g. Lower back pain, left shoulder injury..."
                  rows={5}
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t-3 border-black">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-4 border-3 border-black bg-white text-black font-heading uppercase text-sm hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                &lt; Previous
              </button>
            )}
            
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-4 bg-black text-kaizen-green border-3 border-black font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Next Phase &gt;
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-kaizen-green text-black border-3 border-black font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'PROCESSING...' : 'EXECUTE SETUP'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;