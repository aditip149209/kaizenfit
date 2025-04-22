import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';  

function CreateNewDiet({onClose, onUpdate}) {

  const [foodItems, setFoodItems] = useState([
    {id: '', name: '', quantity:''}
  ])

  const [foodList, setFoodList] = useState([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const types = ['non_vegetarian', 'vegetarian', 'vegan', 'eggetarian']
  const goals = ['weight_loss', 'muscle_gain', 'maintenance']

  const [dietName, setDietName] = useState('');
  const [dietGoal, setDietGoal] = useState('')
  const [dietType, setDietType] = useState('')
  const [dietDesc, setDietDesc] = useState('')
  const [dietDay, setDietDay] = useState('')
  const [userId, setUserId] = useState('');

 
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
      getFoodItemList();
    }
  }, [token]);

  const getFoodItemList = async () => {
    const response = await axios.get('http://localhost:3000/api/user/getfooditemlist', {
        headers: {Authorization: `Bearer ${token}`}
    })
    setFoodList(response.data);
  }

  const addFood = () => {
    setFoodItems([...foodItems, { id: '',name : '', quantity: '' }]);
  };
  
  const handleSave = async () => {
    if (
      !dietName ||
      !dietType||
      !dietGoal ||
      !dietDay
    ) {
      toast.warn('Please fill all required diet fields');
      return;
    }
  
    // Check for at least one complete/valid exercise
    const hasAtLeastOneValidFood = foodItems.some(
      foodItem => foodItem.id && foodItem.quantity
    );
  
    if (!hasAtLeastOneValidFood) {
      toast.warn('Workout must have at least one valid exercise');
      return;
    }
  
    const dietData = {
      Name: dietName,
      GoalType: dietGoal,
      Type: dietType,
      Description: dietDesc,
      Day: dietDay,
    };

    
  
    // Only include valid exercises
    const formattedFoodItems = foodItems
      .filter(ex => ex.id && ex.name && ex.quantity)
      .map(ex => ({
        id: ex.id,
        name: ex.name,
        quantity: ex.quantity,
      }));
  
    try {
      const sendDiet = await axios.post('http://localhost:3000/api/user/createnewdiet', {
        dietData,
        foodItems: formattedFoodItems
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log('Saved!', sendDiet.data);
      toast.success('Workout saved successfully!');
  
     
  
      // Close form after delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleFoodChange = (index, field, value) => {
    const updatedFoods = [...foodItems];
    
    if (field === 'name') {
      const selectedFood = foodList.find(food => food.Name === value);
      updatedFoods[index].id = selectedFood ? selectedFood.FoodID : '';
      updatedFoods[index].name = value;
    } else {
      updatedFoods[index][field] = value;
    }
  
    setFoodItems(updatedFoods);
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
        <h2 className="text-center text-[#7ed6c0] text-xl font-medium mb-6">CREATE NEW DIET</h2>

  
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
  <div>
    <label className="block text-lg font-light mb-1">Diet Name</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter diet name"
      value={dietName}
      onChange={(e) => setDietName(e.target.value)}
    />
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Diet Type</label>
    <select
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      value={dietType}
      onChange={(e) => setDietType(e.target.value)}
    >
      <option value="" disabled>Select diet type</option>
      {types.map((type, index) => (
        <option key={index} value={type} className='text-white bg-[#182828]'>{type}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Diet Goal</label>
    <select
    className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
    value={dietGoal}
    onChange={(e) => setDietGoal(e.target.value)}
  >
    <option value="" disabled>Select a goal</option>
    {goals.map((goal, idx) => (
      <option key={idx} value={goal} className="text-white bg-[#182828]">{goal}</option>
    ))}
  </select>
  </div>

  <div>
    <label className="block text-lg font-light mb-1">Diet Day</label>
    <select
    className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
    value={dietDay}
    onChange={(e) => setDietDay(e.target.value)}
  >
    <option value="" disabled>Select a day</option>
    {days.map((day, idx) => (
      <option key={idx} value={day} className="text-white bg-[#182828]">{day}</option>
    ))}
  </select>
  </div>

  <div className="md:col-span-2">
    <label className="block text-lg font-light mb-1">Diet Description</label>
    <input
      type="text"
      className="w-full h-10 px-6 rounded-[31px] bg-transparent border border-white/30 text-white text-lg"
      placeholder="Enter workout target type"
      value={dietDesc}
      onChange={(e) => setDietDesc(e.target.value)}
    />
  </div>
</div>


        {/* Exercises */}
        <div className="text-xl font-light mb-4 flex justify-between max-h overflow-y-auto">
          <p>Add Food Items</p>
        </div>
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-[#4dd0e1]">
          {foodItems.map((foodItem, index) => (
            <div key={index} className="flex items-center space-x-6">
              <select className="w-[45%] h-14 px-4 rounded-[31px] border border-white/20 text-white bg-[#182828]" value={foodItem.name} onChange={(e) => handleFoodChange(index, 'name', e.target.value)}>
                <option value="" disabled>Select food/dish</option>
                    {foodList?.map((foodOption, idx) => (
                    <option key={idx} value={foodOption.Name} className='text-white bg-[#182828]'>
                        {foodOption.Name}
                    </option>
                    ))}
                </select>

                <input
                type="text"
                placeholder="Servings"
                className="w-[25%] h-14 p-5 rounded-[31px] bg-transparent border border-white/20 text-white"
                value={foodItem.quantity}
                onChange={(e) => handleFoodChange(index, 'quantity', e.target.value)}
                />
            </div>
          ))}
        </div>

        {/* Add Exercise */}
        <div className="mt-6">
          <button onClick={addFood} className="text-2xl font-light hover:underline">+ Add Food/Dish</button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-6" />

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="w-96 h-16 bg-teal-700 rounded-[31px] border border-white/20 text-white text-2xl font-normal"
          >
            SAVE DIET
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
    </div>
  )
}

export default CreateNewDiet
