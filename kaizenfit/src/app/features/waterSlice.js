import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterDate, updateWaterData } from "../thunks/waterThunks";

const initialState = {
    currentIntake: 0,
    goalIntake: 8,
    status: "idle",
    error: null,
}

export const waterSlice = createSlice({
    name: "water",
    initialState,
    reducers: {
        setCurrentIntake: (state, action) => {
            state.currentIntake = action.payload;
        },
        setGoalIntake: (state, action) => {
            state.goalIntake = action.payload;
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaterDate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentIntake = action.payload.currentIntake;
                state.goalIntake = action.payload.goalIntake;
            })
            .addCase(updateWaterData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentIntake = action.payload.currentIntake;
                state.goalIntake = action.payload.goalIntake;
            })
            .addCase(updateWaterData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;                
                console.error("Error updating water data:", action.error);
            })
            .addCase(fetchWaterDate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching water data:", action.error);
            })
            .addCase(fetchWaterDate.pending, (state) => {
                state.status = "loading";
                console.log("Fetching water data...");
            })
            .addCase(updateWaterData.pending, (state) => {
                state.status = "loading";
                console.log("Updating water data...");
            })
    }
});

export const { setCurrentIntake, setGoalIntake } = waterSlice.actions
export default waterSlice.reducer





