import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../components/Post';
import Loader from '../components/Loader';
import { getAllPosts } from '../redux/slices/posts';
import { getMe } from '../redux/slices/user';

function MyPosts() {
  const currentUser = useSelector((store) => store.user.data);
  const posts = useSelector((store) => store.post.popularPosts);
  const loading = useSelector((store) => store.post.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!currentUser?._id && localStorage.getItem('token')) {
      dispatch(getMe());
    }
  }, [dispatch, currentUser]);

  React.useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllPosts({ authorId: currentUser?._id, myposts: true }));
    }
  }, [dispatch, currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="content myposts">
          <h1>Опубликованные посты</h1>
          <div className="myposts__inner">
            {currentUser?._id ? (
              posts?.length ? (
                posts.map((post, i) => <Post myposts={true} key={i} {...post} />)
              ) : (
                <div className="myposts__inner__message">
                  <span>У вас нет постов, хотите </span>
                  <Link to={'/addpost'} title="Нажмите чтобы создать пост">
                    создать пост?
                  </Link>
                </div>
              )
            ) : (
              <div className="myposts__inner__message">
                <span>Вы не вошли в аккаунт,</span>
                <Link to={'/login'} title="Нажмите чтобы войти">
                  войти?
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default MyPosts;
