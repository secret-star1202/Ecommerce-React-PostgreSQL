import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../common/axiosInstance';
import { IAuthState, IUserRegister, User } from '../../types/auth';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const response = await axiosInstance.get('/Users');
  return response.data;
});

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
      const userResponse = await axiosInstance.post('/Users', {
        ...user,
        avatar: url,
      });
      const data = userResponse.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const initialState: IAuthState = {
  loggedIn: false,
  userInfo: null,
  error: false,
  errorMsg: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<User | { error: boolean; errorMsg: string }>
        ) => {
          if (action.payload && 'error' in action.payload) {
            state.error = action.payload.error;
            state.errorMsg = action.payload.errorMsg;
            state.loggedIn = false;
            state.userInfo = null;
          } else if (action.payload && 'id' in action.payload) {
            const { id, email, password, name, avatar } = action.payload;
            const userData = { id, email, password, name, avatar };
            state.error = false;
            state.errorMsg = '';
            state.loggedIn = true;
            state.userInfo = userData;
          }
        }
      )
      .addCase(registerUser.rejected, (state) => {
        console.log('error');
      })
      .addCase(registerUser.pending, (state) => {
        console.log('loading');
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('categories data is fetched');
        if (action.payload && 'message' in action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        console.log('error');
      })
      .addCase(fetchUsers.pending, (state) => {
        console.log('loading');
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
