import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  AuthCreds,
  IAuthState,
  IUserRegister,
  ReturnedAuthCreds,
  User,
} from '../../types/auth';
import { RootState } from '../../redux/store';
import axiosInstance from '../../common/axiosInstance';
export const registerUser = createAsyncThunk(
  'registerUser',
  async (user: IUserRegister) => {
    try {
      // Generate initials from the user's name
      const initials = user.name
        .split(' ')
        .map((name) => name[0].toUpperCase())
        .join('');

      const UserResponse = await axiosInstance.post('/Users', {
        ...user,
        initials: initials,
      });

      const data = UserResponse.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: AuthCreds) => {
    try {
      const response = await axiosInstance.post('/Auths', credentials);
      const authData: ReturnedAuthCreds = response.data;
      if ('access_token' in authData && authData.access_token.length) {
        const headerConfig = {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        };
        const userResponse = await axiosInstance.get('/Users', headerConfig);
        const userData: User = userResponse.data;
        return userData;
      } else {
        throw new Error('Authentication failed'); // Change: Throw an error if authentication fails or access token is missing
      }
    } catch (e) {
      const error = e as AxiosError;
      let errorMsg = 'Something went wrong.';
      if (error.response?.status === 401) {
        errorMsg = 'Email or Password are incorrect';
      }
      return {
        error: true,
        errorMsg,
      };
    }
  }
);

const initialState: IAuthState = {
  loggedIn: false,
  userInfo: null,
  error: false,
  errorMsg: '',
  isRegistered: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setRegistered: (state) => {
      state.isRegistered = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const userData = action.payload as User;
      state.loggedIn = true;
      state.userInfo = userData;
      state.isRegistered = true;
      state.error = false;
      state.errorMsg = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loggedIn = false;
      state.userInfo = null;
      state.isRegistered = false;
      state.error = true;
      state.errorMsg = action.error.message || 'Login failed';
    });
  },
});

export const { reset, setRegistered } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

export const selectAuthError = (state: RootState) => state.auth.error;
