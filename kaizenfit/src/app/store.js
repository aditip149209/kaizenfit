import {configureStore} from '@reduxjs/toolkit';
import waterReducer from './features/waterSlice';



export const store = configureStore({
    reducer: {
        water: waterReducer,
        
    }
})