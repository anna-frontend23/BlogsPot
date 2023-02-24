import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState.posts,
    reducers: {
        getPosts(state, action) {
            return state = action.payload
        },
        addPost(state, action) {
            state.push(action.payload)
        },
        editPost(state, action) {
            return state.map((post) => {
            if (post.id !== action.payload.id) {
                return post
            } else {
                return {
                    ...post,
                    ...action.payload
                }
            }
           })
        },
        deletePost(state, action) {
            return state.filter((post) => post.id !== action.payload)
        },
    }
})

export const {getPosts, addPost, editPost, deletePost} = postsSlice.actions
export const postsReducer = postsSlice.reducer