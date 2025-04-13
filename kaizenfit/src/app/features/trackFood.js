import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fooditems: [],
    type: "",
    status: "idle",
    error: null,
}

export const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        setFoodItems: (state, action) => {
            state.fooditems = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase("fetchFoodData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.fooditems = action.payload.fooditems;
                state.type = action.payload.type;
            })
            .addCase("updateFoodData/fulfilled", (state, action) => {
                state.status = "succeeded";
                state.fooditems = action.payload.fooditems;
                state.type = action.payload.type;
            })
            .addCase("updateFoodData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error updating food data:", action.error);
            })
            .addCase("fetchFoodData/rejected", (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("Error fetching food data:", action.error);
            })
            .addCase("fetchFoodData/pending", (state) => {
                state.status = "loading";
                console.log("Fetching food data...");
            })
            .addCase("updateFoodData/pending", (state) => {
                state.status = "loading";
                console.log("Updating food data...");
            })
    }
})

export const { setFoodItems, setType } = foodSlice.actions
export default foodSlice.reducer


