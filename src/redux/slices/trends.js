import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../http/axios.js';

export const getPopPosts = createAsyncThunk('trends/getPopPosts', async () => {
  try {
    const { data } = await axios.get('/posts/popular');
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const initialState = {
  posts: [],
  loading: false,
};

export const trendsSlice = createSlice({
  name: 'trends',
  initialState,
  reducers: {},
  extraReducers: {
    [getPopPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPopPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.result;
      state.loading = false;
    },
    [getPopPosts.rejected]: (state) => (state.loading = false),
  },
});

// export const { } = trendsSlice.actions;

export default trendsSlice.reducer;
