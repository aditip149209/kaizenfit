import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentWeight: 0,
    goalWeight: 0,
    status: "idle",
    error: null,    
}

const weightSlice = createSlice({
    name: "weight",
    initialState,
    reducers: {
        setCurrentWeight: (state, action) => {
            state.currentWeight = action.payload;
        },
        setGoalWeight: (state, action) => {
            state.goalWeight = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase("fetchWeightData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentWeight = action.payload.currentWeight;
                state.goalWeight = action.payload.goalWeight;
            })
            .addCase("updateWeightData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.currentWeight = action.payload.currentWeight;
                state.goalWeight = action.payload.goalWeight;
            })
            .addCase("updateWeightData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;                
                console.error("Error updating weight data:", action.error);
            })
            .addCase("fetchWeightData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching weight data:", action.error);
            })
            .addCase("fetchWeightData/pending", (state) => {
                state.status = "loading";
                console.log("Fetching weight data...");
            })
            .addCase("updateWeightData/pending", (state) => {
                state.status = "loading";
                console.log("Updating weight data...");
            })
    }
})

export const { setCurrentWeight, setGoalWeight } = weightSlice.actions
export default weightSlice.reducer