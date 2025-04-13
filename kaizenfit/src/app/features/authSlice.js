import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunk";

const initialState = {
    userid: null,
    isAuthenticated: false,
    email: null,
    fitnessGoal : null,
    nameUser: null,
    dob: null,
    token: null,
    status: "idle",
    error: null,
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
        updateProfile: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userid = action.payload.userid;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.fitnessGoal = action.payload.fitnessGoal;
                state.nameUser = action.payload.nameUser;
                state.dob = action.payload.dob;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error logging in:", action.error);
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                console.log("Logging in...");
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userid = action.payload.userid;
                state.email = action.payload.email;
                state.nameUser = action.payload.nameUser;
                state.dob = action.payload.dob;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error registering:", action.error);
            })
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                console.log("Registering...");
            })
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

