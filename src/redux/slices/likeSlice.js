import { createSlice } from "@reduxjs/toolkit"
import { initialState } from '../initialState'

const likesSlice = createSlice({
    name: 'likes',
    initialState: initialState.likes,
    reducers: {
        getLikes(state, action) {
            return state = action.payload
        },
        setLike(state, action) {
            state.push(action.payload)
        },
        deleteLike(state, action) {
            return state.filter((product) => product._id !== action.payload._id)
        }
    }
})

export const {setLike, deleteLike, getLikes} = likesSlice.actions
export const likesReducer = likesSlice.reducer