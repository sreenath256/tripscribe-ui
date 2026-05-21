import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "../../../Common/api";
import { appJson, multiForm } from "../../../Common/configurations";

// Function to create new blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/admin/blogs`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

// Function to get the blog details
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/blogs${queries ? `?${queries}` : ''}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);



export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/blogs/${id}`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

// Function to delete a blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/admin/blogs/${id}`,
      null,
      null,
      rejectWithValue
    );
  }
);
