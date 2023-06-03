import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllPosts, getPostsBySearch } from '../redux/slices/posts';
import { getSubs } from '../redux/slices/navbar';

import Post from '../components/Post';
import Categories from '../components/Categories';
import Skeleton from '../components/Post/Skeleton';

function Home() {
  const loading = useSelector((state) => state.post.loading);
  const currentUser = useSelector((state) => state.user.data);
  const posts = useSelector((state) => state.post.posts);
  const categoryList = useSelector((state) => state.filter.list);
  const activeCategory = categoryList.find((item) => item.active);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (activeCategory?.name === 'Все') {
      dispatch(getAllPosts({ authorId: false, myposts: false }));
    } else {
      dispatch(getPostsBySearch({ text: activeCategory.name, tag: activeCategory.name }));
    }
  }, [dispatch, activeCategory]);

  React.useEffect(() => {
    if (currentUser?._id) {
      dispatch(getSubs());
    }
  }, [dispatch, currentUser]);

  return (
    <>
      <Categories />
      <section className="content">
        <div className="home">
          {(loading ? [...new Array(8)] : posts)?.map((post, i) => {
            if (loading) {
              return <Skeleton key={i} />;
            }
            return <Post atHome={true} key={post._id || i} {...post} />;
          })}
        </div>
      </section>
      {!loading && !posts?.length && <h1 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 300 }}>Посты отсутствуют</h1>}
    </>
  );
}

export default Home;
