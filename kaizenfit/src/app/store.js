import {configureStore} from '@reduxjs/toolkit';
import waterReducer from './features/waterSlice';
import calorieReducer from './features/calorieSlice';
import foodReducer from './features/trackFood';
import weightReducer from './features/weightSlice';
import dietReducer from './features/dietSlice';
import authReducer from './features/authSlice';
import workoutReducer from './features/workoutSlice';

export const store = configureStore({
    reducer: {
        water: waterReducer,
        calories: calorieReducer,
        food: foodReducer,   
        weight: weightReducer,
        diet : dietReducer, 
        user: authReducer, 
        workout : workoutReducer,  
    }
})

export default store;