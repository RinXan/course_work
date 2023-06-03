import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  atHome: true,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    activeHome: state => {
      window.scrollTo(0, 0);
      state.atHome = true;
    },
    unactiveHome: state => {
      state.atHome = false;
    },
  },
});

export const { activeHome, unactiveHome } = homeSlice.actions;

export default homeSlice.reducer;
