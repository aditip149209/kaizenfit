import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async({ email, password }) => {
        const response = await axios.post(
            'https://kaizenfit-backend.onrender.com/api/auth/login',
            { email, password }
        )
        return response.data;
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async({ name, email, password }) => {
        const response = await axios.post(
            'https://kaizenfit-backend.onrender.com/api/auth/register',
            { name, email, password }
        )
        return response.data;
    }
)

export {loginUser, registerUser}

