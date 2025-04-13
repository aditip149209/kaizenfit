import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workoutData: [],
    status: "idle",
    error: null,
}

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        setWorkoutData: (state, action) => {
            state.workoutData = action.payload;
        },
        createCustomWorkout: (state, action) => {
            state.workoutData.push(action.payload);
        },
        removeWorkout: (state, action) => {
            state.workoutData = state.workoutData.filter(workout => workout.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("fetchWorkoutData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.workoutData = action.payload;
            })
            .addCase("updateWorkoutData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.workoutData = action.payload;
            })
            .addCase("updateWorkoutData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error updating workout data:", action.error);
            })
            .addCase("fetchWorkoutData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching workout data:", action.error);
            })
            .addCase("fetchWorkoutData/pending", (state) => {
                state.status = "loading";
                console.log("Fetching workout data...");
            })
            .addCase("updateWorkoutData/pending", (state) => {
                state.status = "loading";
                console.log("Updating workout data...");
            })
    }   
})

export {setWorkoutData, createCustomWorkout, removeWorkout} from workoutSlice.actions
export default workoutSlice.reducer
