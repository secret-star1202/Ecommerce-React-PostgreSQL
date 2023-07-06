import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/auth';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axios.get(
      'https://ecommerce-postgresql-backend.azurewebsites.net/api/v1/Users'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState: User[] = [];

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log('Fetching users loading');
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('Fetching users success');
        return action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        console.log('Fetching users error');
        return [];
      });
  },
});

export const userReducer = userSlice.reducer;
export default userReducer;
