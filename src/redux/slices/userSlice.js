import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const userSlice = createSlice({
    name: 'user',
    initialState: initialState.user,
    reducers: {
        getUserInfo(state, action) {
            return state = action.payload
        },
        editUserInfo(state, action) {
            return state = action.payload      
        },
        editAvatar(state, action) {
            state.avatar = action.payload
        }
    } 
    
})

export const { getUserInfo, editUserInfo, editAvatar } = userSlice.actions;
export const userReducer = userSlice.reducer