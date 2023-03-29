import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../common/axiosInstance';
import { IUserRegister, User } from '../../types/auth';

export const fetchUsers = createAsyncThunk(
  'fetchUsers',

  async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (user: IUserRegister) => {
    try {
      const response = await axiosInstance.post(
        'files/upload',
        {
          file: user.avatar[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const url: string = response.data.location;
      const UserResponse = await axiosInstance.post('users', {
        ...user,
        avatar: url,
      });
      const data = UserResponse.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const initialState: User[] = [];

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log('categories data is fetched');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchUsers.rejected, (state, action) => {
      console.log('error');
      return state;
    });
    build.addCase(fetchUsers.pending, (state, action) => {
      console.log('loading');
      return state;
    });
    build.addCase(registerUser.fulfilled, (state, action) => {
      console.log('User is registered');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(registerUser.rejected, (state, action) => {
      console.log('error');
      return state;
    });
    build.addCase(registerUser.pending, (state, action) => {
      console.log('loading');
      return state;
    });
  },
});

// export const {} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
