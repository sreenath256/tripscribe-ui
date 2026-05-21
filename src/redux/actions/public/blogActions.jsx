import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";

export const getPublicBlogs = createAsyncThunk(
  "publicBlogs/getBlogs",
  async ({ page = 1, limit = 8 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/public/blogs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
