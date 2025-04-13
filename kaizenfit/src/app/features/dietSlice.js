import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentDietPlan : [],
    dietList : [],
    status: "idle",
    error: null,
}

const dietSlice = createSlice({
    name: "diet",
    initialState,
    reducers: {
        setCurrentDiet: (state, action) => {
            state.currentDietPlan = action.payload;
        },
        addCustomDiet: (state, action) => {
            state.dietList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("fetchDietPlanAndList/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentDietPlan = action.payload.currentDietPlan;
                state.dietList = action.payload.dietList;
            })
            .addCase("updateDietList/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentCalories = action.payload.currentDietPlan;
                state.goalCalories = action.payload.dietList;
            })
            .addCase("updateDietList/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;                
                console.error("Error updating calorie data:", action.error);
            })
            .addCase("fetchDietPlanAndList/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching calorie data:", action.error);
            })
            .addCase("fetchDietPlanAndList/pending", (state) => {
                state.status = "loading";
                console.log("Fetching calorie data...");
            })
            .addCase("updateDietList/pending", (state) => {
                state.status = "loading";
                console.log("Updating calorie data...");
            })
    }
})

export const { setCurrentDiet, addCustomDiet } = dietSlice.actions
export default dietSlice.reducer