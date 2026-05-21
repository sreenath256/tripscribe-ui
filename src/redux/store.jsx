import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import blogReducer from "./reducers/admin/blogSlice";
import publicBlogReducer from "./reducers/public/blogSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    publicBlogs: publicBlogReducer,
  },
});
