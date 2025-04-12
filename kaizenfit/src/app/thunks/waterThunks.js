import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import axios from "axios";

const token = localStorage.getItem('token');


export const fetchWaterDate = createAsyncThunk(
    'user/fetchWaterData',
    async(token) => {
        const response = await axios.get(
            'https://kaizenfit-backend.onrender.com/api/water', // need to replace this
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    }
)

export const updateWaterData = createAsyncThunk(
    'user/updateWaterData',
    async({currentIntake, goalIntake}) => {
        const response = await axios.put(
            'https://kaizenfit-backend.onrender.com/api/water',
            {
                currentIntake,
                goalIntake
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    }
)

