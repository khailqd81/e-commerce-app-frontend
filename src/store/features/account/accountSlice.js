import { createSlice } from "@reduxjs/toolkit";

export const account = createSlice({
    name: 'account',
    initialState: {
        isLogin: false,
        role: ""
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        }
    }
})

export const { setLogin, setRole } = account.actions;
export default account.reducer
