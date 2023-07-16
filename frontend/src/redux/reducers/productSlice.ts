import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import axiosInstance from '../../common/axiosInstance';

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts ',
  async () => {
    try {
      const res = await axiosInstance.get('/Products');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: Product[] = [];

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    highestPriceFirst: (state: any) => {
      state.sort((a: any, b: any) => (a.price > b.price ? -1 : 1));
    },
    lowestPriceFirst: (state: any) => {
      state.sort((a: any, b: any) => (a.price < b.price ? -1 : 1));
    },
    alphabetical: (state: any) => {
      state.sort((a: any, b: any) => b.name.localeCompare(a.name));
    },
    alphabetical2: (state: any) => {
      state.sort((a: any, b: any) => a.name.localeCompare(b.name));
    },
    searchByName: (state: any, action: any) => {
      const filteredProducts = state.filter((product: any) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredProducts:
          action.payload.length > 0 ? filteredProducts : [...state],
      };
    },
  },

  extraReducers: (build: any) => {
    build.addCase(fetchAllProducts.fulfilled, (state: any, action: any) => {
      console.log('data is fetched');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllProducts.rejected, (state: any, action: any) => {
      console.log('error');
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state: any, action: any) => {
      console.log('loading');
      return state;
    });
  },
});

const productReducer = productSlice.reducer;
export const {
  lowestPriceFirst,
  highestPriceFirst,
  alphabetical,
  alphabetical2,
} = productSlice.actions;
export default productReducer;
