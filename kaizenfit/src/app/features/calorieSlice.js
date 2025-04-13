import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCalories: 0,
    goalCalories: 0,
    status: "idle",
    error: null,
}

const calorieSlice = createSlice({
    name: "calories",
    initialState,
    reducers: {
        setCurrentCalories: (state, action) => {
            state.currentCalories = action.payload;
        },
        setGoalCalories: (state, action) => {
            state.goalCalories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase("fetchCalorieData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentCalories = action.payload.currentCalories;
                state.goalCalories = action.payload.goalCalories;
            })
            .addCase("updateCalorieData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentCalories = action.payload.currentCalories;
                state.goalCalories = action.payload.goalCalories;
            })
            .addCase("updateCalorieData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;                
                console.error("Error updating calorie data:", action.error);
            })
            .addCase("fetchCalorieData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching calorie data:", action.error);
            })
            .addCase("fetchCalorieData/pending", (state) => {
                state.status = "loading";
                console.log("Fetching calorie data...");
            })
            .addCase("updateCalorieData/pending", (state) => {
                state.status = "loading";
                console.log("Updating calorie data...");
            })
    }
})

export const { setCurrentCalories, setGoalCalories } = calorieSlice.actions
export default calorieSlice.reducer