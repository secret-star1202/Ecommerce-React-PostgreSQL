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
    highestPriceFirst: (state) => {
      state.sort((a, b) => (a.price > b.price ? -1 : 1));
    },
    lowestPriceFirst: (state) => {
      state.sort((a, b) => (a.price < b.price ? -1 : 1));
    },
    alphabetical: (state) => {
      state.sort((a, b) => b.name.localeCompare(a.name));
    },
    alphabetical2: (state) => {
      state.sort((a, b) => a.name.localeCompare(b.name));
    },
    searchByName: (state, action) => {
      const filteredProducts = state.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredProducts:
          action.payload.length > 0 ? filteredProducts : [...state],
      };
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log('data is fetched');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log('error');
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state, action) => {
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
