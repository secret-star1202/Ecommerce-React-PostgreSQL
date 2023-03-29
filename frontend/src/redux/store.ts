import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';
import categoryReducer from './reducers/categorySlice';
import userReducer from './reducers/userSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    categoryReducer,
    userReducer,
    authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
