import React, { useState, useEffect, use } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'; // Don’t forget this if it’s not imported already

function CreateCustomExercise({ onClose, token }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultSets, setDefaultSets] = useState('');
  const [defaultReps, setDefaultReps] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseTarget, setExerciseTarget] = useState('');
  const [exerciseCal, setExerciseCal] = useState('');

  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);

  


  const handleSave = async () => {
    if (
      !name ||
      !defaultReps ||
      !defaultSets ||
      !exerciseDuration ||
      !exerciseType ||
      !exerciseTarget
    ) {
      toast.warn('Please fill all required fields');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/user/customExercise',
        {
          Name: name,
          Description: description,
          Duration: Number(exerciseDuration),
          CaloriesBurned: Number(exerciseCal),
          Type: exerciseType,
          TargetPart: exerciseTarget,
          defaultReps: Number(defaultReps),
          defaultSets: Number(defaultSets),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Exercise created!');
      setName('');
      setExerciseCal('');
      setDefaultReps('');
      setDefaultSets('');
      setExerciseDuration('');
      setExerciseTarget('');
      setExerciseType('');
      setDescription('');

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-[700px] bg-[#182828] rounded-[30px] p-8 relative text-white">
        <button
          className={`absolute top-10 right-10 text-[#e0f7fa] text-xl font-bold transition-colors  ${
            hoverClose ? 'text-red-500' : ''
          }`}
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-center text-[#7ed6c0] text-xl font-medium mb-6">
          CREATE CUSTOM EXERCISE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Exercise Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Exercise Type *"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
          />
          <input
            type="text"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Target Muscle *"
            value={exerciseTarget}
            onChange={(e) => setExerciseTarget(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Duration (sec) *"
            value={exerciseDuration}
            onChange={(e) => setExerciseDuration(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Default Sets *"
            value={defaultSets}
            onChange={(e) => setDefaultSets(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Default Reps *"
            value={defaultReps}
            onChange={(e) => setDefaultReps(e.target.value)}
          />
          <input
            type="number"
            className="h-10 px-4 rounded-[31px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Calories Burned (kcal)"
            value={exerciseCal}
            onChange={(e) => setExerciseCal(e.target.value)}
          />
          <textarea
            rows={3}
            className="col-span-full resize-none px-4 py-2 rounded-[20px] bg-transparent border border-white/30 text-white text-sm"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="w-64 h-12 bg-teal-700 rounded-[31px] border border-white/20 text-white text-xl font-normal"
          >
            SAVE EXERCISE
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default CreateCustomExercise;
