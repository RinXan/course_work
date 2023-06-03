import AddPost from '../pages/AddPost';
import FullPost from '../pages/FullPost';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import SearchTag from '../pages/SearchTag';
import Channel from '../pages/Channel';
import MyPosts from '../pages/MyPosts';
import Favorites from '../pages/Favorites';
import Subs from '../pages/Subs';
import Trends from '../pages/Trends';
import Cabinet from '../pages/cabinet/Cabinet';
import CabinetEdit from '../pages/cabinet/CabinetEdit';

export const routes = [
  { path: '/', component: <Home />, exact: true },
  { path: 'addpost', component: <AddPost />, exact: true },
  { path: 'login', component: <Login />, exact: true },
  { path: 'register', component: <Register />, exact: true },
  { path: 'posts/:id', component: <FullPost />, exact: true },
  { path: 'posts/:id/edit', component: <AddPost />, exact: true },
  { path: 'ownpsts', component: <MyPosts />, exact: true },
  { path: 'cabinet/edit', component: <CabinetEdit />, exact: true },
  { path: 'cabinet/*', component: <Cabinet />, exact: true },
  { path: 'favs', component: <Favorites />, exact: true },
  { path: 'pops', component: <Trends />, exact: true },
  { path: 'subs', component: <Subs />, exact: true },
  { path: 'channel/:authorId/*', component: <Channel />, exact: true },
  { path: 'tags/:tag', component: <SearchTag />, exact: true },
  { path: 'results', component: <SearchTag />, exact: true },
  { path: '*', component: <NotFound />, exact: false },
];