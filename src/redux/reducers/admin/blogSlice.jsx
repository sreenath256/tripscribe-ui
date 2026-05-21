import { createSlice } from "@reduxjs/toolkit";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../actions/admin/blogActions";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    blogs: [],
    error: null,
    totalAvailableBlogs: null,
  },
  extraReducers: (builder) => {
    builder
      // Getting Blog details
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.blogs = payload.blogs;
        state.totalAvailableBlogs = payload.totalAvailableBlogs;
      })
      .addCase(getBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.blogs = null;
        state.error = payload;
      })

      // Creating new Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.blogs = [...(state.blogs || []), payload];
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.blogs = null;
        state.error = payload;
        state.totalAvailableBlogs = state.totalAvailableBlogs + 1;
      })

      // Updating a blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.blogs) {
          const index = state.blogs.findIndex(
            (blog) => blog._id === payload._id
          );

          if (index !== -1) {
            state.blogs[index] = payload;
          }
        }
      })
      .addCase(updateBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.blogs = null;
        state.error = payload;
      })

      // Deleting a blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Use action.meta.arg (the original ID passed to the thunk)
        if (state.blogs) {
          state.blogs = state.blogs.filter(
            (blog) => blog._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default blogSlice.reducer;
