import { createSlice } from "@reduxjs/toolkit";
import { getPublicBlogs } from "../../actions/public/blogActions";

const publicBlogSlice = createSlice({
  name: "publicBlogs",
  initialState: {
    loading: true,
    blogs: [],
    pagination: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPublicBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.blogs = payload.blogs || [];
        state.pagination = payload.pagination || null;
      })
      .addCase(getPublicBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.blogs = [];
        state.pagination = null;
        state.error = payload;
      });
  },
});

export default publicBlogSlice.reducer;
