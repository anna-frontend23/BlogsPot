import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer } from "./slices/commentsSlice";
import { likesReducer } from "./slices/likeSlice";
import { postsReducer } from "./slices/postsSlice";
import { tokenReducer } from "./slices/tokenSlice";
import { userReducer } from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        token: tokenReducer,
        posts: postsReducer,
        user: userReducer,
        comments: commentsReducer,
        likes: likesReducer,
    }
})