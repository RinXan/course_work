import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../http/axios.js';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async ({ authorId, myposts }) => {
  try {
    if (authorId && !myposts) {
      const { data } = await axios.get(`/channel/${authorId}`);
      return data;
    } else if (myposts) {
      const { data } = await axios.get(`/posts/${authorId}/own`);
      return data;
    } else {
      const { data } = await axios.get('/posts');
      return data;
    }
  } catch (error) {
    toast('Ошибка при загрузке статей.', { autoClose: 2000 });
    console.log(error);
  }
});

export const getPostsBySearch = createAsyncThunk('posts/getPostsBySearch', async (searchQuery) => {
  try {
    const { data } = await axios.get(
      `/posts/search?text=${searchQuery.text || 'none'}&tag=${searchQuery.tag || 'none'}`,
    );
    return data;
  } catch (error) {
    toast('Ошибка при загрузке статей.', { autoClose: 2000 });
    console.log(error);
  }
});

export const getLikedPosts = createAsyncThunk('posts/getLikedPosts', async () => {
  try {
    const { data } = await axios.get('/posts/liked');
    return data;
  } catch (error) {
    toast(error.response.data.message, { autoClose: 2000 });
    console.log(error);
  }
});

export const getOnePost = createAsyncThunk('posts/getOnePost', async (id) => {
  try {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  } catch (error) {
    toast('Ошибка при получении статьи.', { autoClose: 2000 });
    console.log(error.response.data.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params);
    return data;
  } catch (error) {
    if (error.response.data[0].msg) {
      for (let { msg } of error.response.data) {
        toast(msg, { autoClose: 2000 });
      }
    }
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (params) => {
  try {
    const { data } = await axios.put(`/posts/${params.id}`, params.data);
    return data;
  } catch (error) {
    if (error.response.data[0].msg) {
      for (let { msg } of error.response.data) {
        toast(msg, { autoClose: 2000 });
      }
    }
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, { dispatch }) => {
  try {
    dispatch(removePost(id));
    const { data } = await axios.delete(`/posts/${id}`);
    await axios.delete(`/posts/${id}/deletecomments`); // Comments deleting request
    return data;
  } catch (error) {
    console.log(error);
    toast('Ошибка при удалении статьи.', { autoClose: 2000 });
  }
});

export const likeOrUnlike = createAsyncThunk('posts/likeOrUnlike', async ({ id }) => {
  try {
    const { data } = await axios.put(`/posts/${id}/like`);
    toast(data.message, { autoClose: 2500 });
    return data;
  } catch (error) {
    console.log(error.message);
    toast('Ошибка при like/unlike статьи.', { autoClose: 2000 });
  }
});

const initialState = {
  popularPosts: [],
  posts: [],
  loading: true,
  currentPost: { text: '', tags: [], imageUrl: '', comments: [], author: {}, likes: [] },
  open: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    changePostStatus: (state) => {
      state.open = !state.open;
    },
    openPost: (state) => {
      state.open = true;
    },
    closePost: (state) => {
      state.open = false;
    },
  },
  extraReducers: {
    // Получение постов по поисковому запросу и тегу
    [getPostsBySearch.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
    },

    // Получение всех статьей
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.popularPosts = [];
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.posts;
      state.loading = false;
    },
    [getAllPosts.rejected]: (state) => {
      state.posts = [];
      state.popularPosts = [];
      state.loading = false;
    },

    // Получение понравившихся статьей
    [getLikedPosts.pending]: (state) => {
      state.loading = true;
      state.popularPosts = [];
    },
    [getLikedPosts.fulfilled]: (state, action) => {
      state.popularPosts = action.payload.likedPosts;
      state.loading = false;
    },
    [getLikedPosts.rejected]: (state) => {
      state.popularPosts = [];
      state.loading = false;
    },

    // Получение одной статьи
    [getOnePost.pending]: (state) => {
      state.currentPost = {};
      state.loading = true;
    },
    [getOnePost.fulfilled]: (state, action) => {
      state.currentPost = action.payload.post;
      state.loading = false;
    },
    [getOnePost.rejected]: (state) => {
      state.currentPost = {};
      state.loading = false;
    },

    // Создание статьи
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPost = {};
      state.posts.push(action.payload.post);
      toast(action.payload?.message, { autoClose: 2000 });
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },

    // Обновление статьи
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.currentPost = action.payload.post;
      state.loading = false;
      toast(action.payload.message, { autoClose: 2000 });
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },

    // Удаление статьи
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPost = {};
      state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      toast(action.payload.message, { autoClose: 2000 });
    },

    // Like Unlike Post
    [likeOrUnlike.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload.post;
    },
    [likeOrUnlike.rejected]: (state, action) => {
      state.loading = false;
      toast(action.payload.message, { autoClose: 2000 });
    },
  },
});

export const { removePost, changePostStatus, openPost, closePost, likeUnlikePost } =
  postSlice.actions;

export default postSlice.reducer;
