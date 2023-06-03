import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filter';
import trendsSlice from './slices/trends';
import homeSlice from './slices/home';
import navbarSlice from './slices/navbar';
import postsReducer from './slices/posts';
import userReducer from './slices/user';
import commentsSlice from './slices/comments';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    trends: trendsSlice,
    navbar: navbarSlice,
    home: homeSlice,
    post: postsReducer,
    comment: commentsSlice,
    user: userReducer,
  },
});

export default store;
