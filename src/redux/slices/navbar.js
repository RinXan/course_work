import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../http/axios.js';
import { navSvgs } from '../../utils/icons';

export const getSubs = createAsyncThunk('navbar/getSubs', async () => {
  try {
    const {data} = await axios.get('/user/subs');
    return data;
  } catch (error) {
    console.error(error.message);
  }
})

const initialState = {
  open: true,
  loading: false,
  visible: true,
  feeds: [
    { text: 'Главная', url: '/', active: true, img: navSvgs.home },
    { text: 'В тренде', url: '/pops', active: false, img: navSvgs.nav },
    { text: 'Подписки', url: '/subs', active: false, img: navSvgs.subs },
    { text: 'Понравившиеся', url: '/favs', active: false, img: navSvgs.like },
    { text: 'Мои посты', url: '/ownpsts', active: false, img: navSvgs.posts },
  ],
  subs: [],
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    cleanSubs: (state) => {
      state.subs = [];
    },
    activeNav: (state, action) => {
      state.feeds = state.feeds.map((item, ind) => {
        if (ind !== action.payload) {
          item.active = false;
        } else {
          item.active = true;
        }
        return item;
      });
    },
    unactiveNav: (state) => {
      state.feeds = state.feeds.map((item) => (item.active = false));
    },
    toggleNav: (state) => {
      state.open = !state.open;
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    makeVis: (state) => {
      state.visible = true;
    },
    makeUnVis: (state) => {
      state.visible = false;
    },
    openNav: (state) => {
      state.open = true;
    },
    closeNav: (state) => {
      state.open = false;
    },
  },
  extraReducers: {
    [getSubs.pending]: state => {
      state.loading = true;
      state.subs = [];
    },
    [getSubs.fulfilled]: (state, action) => {
      state.subs = action.payload.subs;
      state.loading = false;
    },
    [getSubs.rejected]: state => {
      state.loading = false;
      state.subs = [];
    },
  }
});

export const { makeUnVis, makeVis, cleanSubs, toggleVisible, toggleNav, openNav, closeNav, activeNav, unactiveNav } = navbarSlice.actions;

export default navbarSlice.reducer;
