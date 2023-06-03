import React from 'react';

import HomePost from './postTypes/HomePost';
import MyPost from './postTypes/MyPost';
import TrendPost from './postTypes/TrendPost';
import SimPost from './postTypes/SimPost';
import FavPost from './postTypes/FavPost';
import CabPost from './postTypes/CabPost';

function Post({
  atHome = false,
  myposts = false,
  similar = false,
  favorites = false,
  trends = false,
  cab = false,
  ...info
}) {
  return (
    <>
      {atHome && <HomePost {...info} />}
      {myposts && <MyPost {...info} />}
      {similar && <SimPost {...info} />}
      {favorites && <FavPost {...info} />}
      {trends && <TrendPost {...info} />}
      {cab && <CabPost {...info} />}
    </>
  );
}

export default Post;
