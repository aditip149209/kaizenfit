import React, { useState } from 'react'

function CreateNewDiet({onClose}) {

    const [foodList, setFoodList] = useState([]);  

  

  const [token, setToken] = useState('')
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
           
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setToken(token);
    }
  });
  useEffect(() => {
    if (token) {
      getExerciseList();
    }
  }, [token]);

  const getFoodItemList = async () => {
    const response = await axios.get('http://localhost:3000/api/user/getFoodList', {
        headers: {Authorization: `Bearer ${token}`}
    })
    setExerciseList(response.data);
  }


  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
  
    if (field === 'name') {
      const selected = exerciseList.find(e => e.Name === value);
      if (selected) {
        updated[index] = {
          ExerciseID: selected.ExerciseID,
          name: selected.Name,
          sets: selected.defaultSets,
          reps: selected.defaultReps
        };
      }
    } else {
      updated[index][field] = value;
    }
  
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const handleSave = async () => {
    if (
      !workoutName ||
      !workoutCal ||
      !workoutDur ||
      !workoutTarget ||
      !workoutType
    ) {
      toast.warn('Please fill all required workout fields');
      return;
    }
  
    // Check for at least one complete/valid exercise
    const hasAtLeastOneValidExercise = exercises.some(
      ex => ex.ExerciseID && ex.sets && ex.reps
    );
  
    if (!hasAtLeastOneValidExercise) {
      toast.warn('Workout must have at least one valid exercise');
      return;
    }
  
    const workoutData = {
      Name: workoutName,
      Duration: workoutDur,
      CaloriesBurned: workoutCal,
      Type: workoutType,
      TargetPart: workoutTarget
    };
  
    // Only include valid exercises
    const formattedExercises = exercises
      .filter(ex => ex.ExerciseID && ex.sets && ex.reps)
      .map(ex => ({
        ExerciseID: ex.ExerciseID,
        reps: ex.reps,
        sets: ex.sets
      }));
  
    try {
      const sendExercises = await axios.post('http://localhost:3000/api/user/customworkout', {
        workoutData,
        exercises: formattedExercises
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log('Saved!', sendExercises.data);
      toast.success('Workout saved successfully!');
  
      // Reset form
      setWorkoutName('');
      setWorkoutDur('');
      setWorkoutCal('');
      setWorkoutType('');
      setWorkoutTarget('');
      setExercises([{ id: '', name: '', sets: '', reps: '' }]);
  
      // Close form after delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };
  
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-[885px] bg-[#182828] rounded-[30px] p-8 relative text-white">
        {/* Close Button */}
        
        <button
            className={` absolute top-10 right-10 text-[#e0f7fa] text-xl font-bold transition-colors ${
              hoverClose ? "text-red-500" : ""
            }`}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>


        {/* Title */}
        <h2 className="text-center text-[#7ed6c0] text-xl font-medium mb-6">CREATE/EDIT WORKOUT</h2>

        {/* Workout Name */}
        {/* Workout Details Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
  <div>
    <label className="block text-lg font-light mb-1">Workout Name</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout name"
      value={workoutName}
      onChange={(e) => setWorkoutName(e.target.value)}
    />
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Workout Type</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout type"
      value={workoutType}
      onChange={(e) => setWorkoutType(e.target.value)}
    />
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Workout Duration</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout duration"
      value={workoutDur}
      onChange={(e) => setWorkoutDur(e.target.value)}
    />
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Workout Calories</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout calories"
      value={workoutCal}
      onChange={(e) => setWorkoutCal(e.target.value)}
    />
  </div>

  <div className="md:col-span-2">
    <label className="block text-lg font-light mb-1">Workout Target Type</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout target type"
      value={workoutTarget}
      onChange={(e) => setWorkoutTarget(e.target.value)}
    />
  </div>
</div>


        {/* Exercises */}
        <div className="text-xl font-light mb-4 flex justify-between max-h overflow-y-auto">
          <span>EXERCISE NAME</span>
          <span className="w-[25%] text-center">SETS</span>
          <span className="w-[25%] text-center">REPS</span>
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-[#4dd0e1]">
          {exercises.map((exercise, index) => (
            <div key={index} className="flex items-center space-x-6">
              <select className="w-[45%] h-14 px-4 rounded-[31px] border border-white/20 text-white bg-[#182828]" value={exercise.name} onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}>
                <option value="" disabled>Select exercise</option>
                    {exerciseList?.map((exerciseOption, idx) => (
                    <option key={idx} value={exerciseOption.Name} className='text-white bg-[#182828]'>
                        {exerciseOption.Name}
                    </option>
                    ))}
                </select>


                <input
                type="text"
                placeholder="Sets"
                className="w-[25%] h-14 text-center rounded-[31px] bg-transparent border border-white/20 text-white"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                />
                <input
                type="text"
                placeholder="Reps"
                className="w-[25%] h-14 text-center rounded-[31px] bg-transparent border border-white/20 text-white"
                value={exercise.reps}
                onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                />
            </div>
          ))}
        </div>

        {/* Add Exercise */}
        <div className="mt-6">
          <button onClick={addExercise} className="text-2xl font-light hover:underline">+ Add Exercise</button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-6" />

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="w-96 h-16 bg-teal-700 rounded-[31px] border border-white/20 text-white text-2xl font-normal"
          >
            SAVE WORKOUT
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
    </div>
  )
}

export default CreateNewDiet
