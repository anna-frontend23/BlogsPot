import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "../initialState"

const loadFromLS = () => {
    let tokenLS = localStorage.getItem('token')
    return tokenLS !== null ? tokenLS : initialState.token
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState: loadFromLS(),
    reducers: {
        setToken(state, action) {
            return state = action.payload
        }
    }
})

export const {setToken} = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer