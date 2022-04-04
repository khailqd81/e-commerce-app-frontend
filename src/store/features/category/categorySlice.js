import { createSlice } from "@reduxjs/toolkit";

export const category = createSlice({
    name:'category',
    initialState: {
        value: "Điện thoại"
    },
    reducers: {
        setCategory: (state, action) => {
            localStorage.setItem("category", action.payload);
            state.value = action.payload
        }
    }
})

export const {setCategory} = category.actions;
export default category.reducer