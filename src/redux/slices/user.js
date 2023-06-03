import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../http/axios.js';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  try {
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const { data } = await axios.post('/auth/login', { email: emailTrim, password: passwordTrim });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
    for (let errObaj of error.response.data) {
      toast(`${errObj.msg}`, {autoClose: 2000});
    }
  }
});

export const getMe = createAsyncThunk('user/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const register = createAsyncThunk('user/register', async ({ fullname, email, password }) => {
  try {
    const fullnameTrim = fullname.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const { data } = await axios.post('/auth/register', {
      fullname: fullnameTrim,
      email: emailTrim,
      password: passwordTrim,
    });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
    for (let errObj of error.response.data) {
      toast(`${errObj.msg}`, {autoClose: 2000});
    }
  }
});

export const subscription = createAsyncThunk('user/subscription', async (authorId) => {
  try {
    const { data } = await axios.put(`/channel/${authorId}`);
    toast(data.message, { autoClose: 2500 });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateInfo = createAsyncThunk('user/updateInfo', async (params) => {
  try {
    const { data } = await axios.put('/user', params);
    toast(data.message, { autoClose: 2000 });
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: {},
  token: null,
  status: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.token = null;
      state.status = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: {
    // Authorization
    [login.pending]: (state) => {
      state.status = null;
    },
    [login.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.data = action.payload.user;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.data = null;
    },
    // Registration
    [register.pending]: (state) => {
      state.status = null;
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload.user;
      state.token = action.payload.token;
    },
    [register.rejected]: (state, action) => {
      console.log(action.response.data[0].msg);
      state.status = action.payload?.message;
    },
    // Checking for authorizated user
    [getMe.pending]: (state) => {
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.status = null;
      state.data = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      toast(action.payload.message, { autoClose: 2500 });
    },
    // Updating user info
    [updateInfo.pending]: (state) => {
      state.status = null;
    },
    [updateInfo.fulfilled]: (state, action) => {
      state.status = null;
      state.data = action.payload?.user;
    },
    [updateInfo.rejected]: (state, action) => {
      toast(action.payload.message, { autoClose: 2000 });
    },
    // Subscription
    [subscription.fulfilled]: (state, action) => {
      state.data.subscriptions = action.payload.subs;
    },
    [subscription.rejected]: (state, action) => {
      toast(action.payload.message, { autoClose: 2500 });
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.user.token);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
