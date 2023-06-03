import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../http/axios.js';
import { toast } from 'react-toastify';

export const getComments = createAsyncThunk('comments/getComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/${postId}/comments`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addComment = createAsyncThunk('comments/addComment', async (params) => {
  try {
    const { data } = await axios.post(`/posts/${params.postId}/comments`, {text: params.text});
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (params) => {
  try {
    const { data } = await axios.delete(`/posts/${params.postId}/comments/${params.commentId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  comments: [],
  loading: true,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // Get comments
    [getComments.pending]: state => {
      state.loading = true;
      state.comments = [];
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    [getComments.rejected]: state => {
      state.loading = false;
      state.comments = [];
    },
    // Add comment
    [addComment.pending]: state => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.unshift(action.payload.newComment);
      state.loading = false;
    },
    [addComment.rejected]: state => {
      state.loading = false;
    },
    // Delete comment
    [deleteComment.pending]: state => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(c => c._id !== action.payload.comment._id);
      toast(action.payload.message, { autoClose: 2000 });
      state.loading = false;
    },
    [deleteComment.rejected]: state => {
      state.loading = false;
    },
  }
});

// export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
