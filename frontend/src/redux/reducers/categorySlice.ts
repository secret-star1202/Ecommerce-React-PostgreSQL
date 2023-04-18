import { Category } from './../../types/category';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async () => {
    try {
      const res = await axios.get('http://localhost:5113/api/v1/categories');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAByCategories = createAsyncThunk(
  'fetchByCategories',
  async (categoryID: number) => {
    try {
      const res = await axios.get(
        `http://localhost:5113/api/v1/categories=${categoryID}products/`
      );
      return res.data;
    } catch (error) {
      console.log(error);
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
