import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../common/axiosInstance';
import {
  AuthCreds,
  IAuthState,
  ReturnedAuthCreds,
  User,
} from '../../types/auth';

export const authenticateCredentials = createAsyncThunk(
  'authenticateCredentials',
  async (access_token: string) => {
    try {
      const response = await axiosInstance.post('/auth/profile', {
        headers: { Authorization: `Bearer${access_token}` },
      });
      const data: ReturnedAuthCreds = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (credentials: AuthCreds) => {
    try {
      const auth = await axiosInstance.post('/auth/login', credentials);
      const authData: ReturnedAuthCreds = auth.data;
      if ('access_token' in authData && authData.access_token.length) {
        const headerConfig = {
          headers: {
            Authorization: `bearer ${authData.access_token}`,
          },
        };
        const response = await axiosInstance.get('/auth/profile', headerConfig);
        const responseData: User = await response.data;
        return responseData;
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

export const logoutUser = (state: IAuthState) => {
  return {
    ...state,
    error: false,
    errorMsg: '',
    userInfo: null,
    loggedIn: false,
  };
};

const initialState: IAuthState = {
  loggedIn: false,
  userInfo: null,
  error: false,
  errorMsg: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload && 'error' in action.payload) {
        state.error = action.payload.error;
        state.errorMsg = action.payload.errorMsg;
        state.loggedIn = false;
        state.userInfo = null;
        return state;
      }
      if (action.payload && 'id' in action.payload) {
        console.log('there is no error');
        const { id, email, password, name, avatar } = action.payload;
        const userData = {
          id,
          email,
          password,
          name,
          avatar,
        };
        state.error = false;
        state.errorMsg = '';
        state.loggedIn = true;
        state.userInfo = userData;
        return state;
      } else {
        return state;
      }
    });
  },
});

const authReducer = authSlice.reducer;
export const { reset } = authSlice.actions;
export default authReducer;
