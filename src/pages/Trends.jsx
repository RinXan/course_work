import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopPosts } from '../redux/slices/trends';

import Post from '../components/Post';
import Loader from '../components/Loader';

function Trends() {
  const loading = useSelector((store) => store.trends.loading);
  const trends = useSelector((store) => store.trends.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPopPosts());
  }, [dispatch]);
  return (
    <section className="trends content">
      <h3>Популярные статьи</h3>
      <div className="trends__inner">
        {loading ? (
          <Loader />
        ) : (
          trends?.map((item, index) => <Post key={item.url} {...item} trends={true} />)
        )}
      </div>
    </section>
  );
}

export default Trends;
