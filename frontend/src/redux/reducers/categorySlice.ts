import { Category } from './../../types/category';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../common/axiosInstance';

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async () => {
    try {
      const res = await axiosInstance.get('/categories');
      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchAByCategories = createAsyncThunk(
  'fetchByCategories',
  async (categoryID: number) => {
    try {
      const res = await axiosInstance.get(`/categories=${categoryID}products/`);
      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const initialState: Category[] = [];

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      console.log('categories data is fetched');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllCategories.rejected, (state, action) => {
      console.log('error');
      return state;
    });
    build.addCase(fetchAllCategories.pending, (state, action) => {
      console.log('loading');
      return state;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
