import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { getLikedPosts } from '../redux/slices/posts';

import Post from '../components/Post';
import Loader from '../components/Loader';

import { svgs } from '../utils/icons.js';

function Favorites() {
  const navOpen = useSelector((store) => store.navbar.open);
  const posts = useSelector((store) => store.post.popularPosts);
  const currentUser = useSelector((store) => store.user.data);
  const loading = useSelector((store) => store.post.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLikedPosts());
  }, [dispatch]);

  return (
    <section className="favorites">
      {currentUser?._id ? (
        <>
          <div className={`favorites__sidebar ${navOpen ? 'left-220' : 'left-65'}`}>
            <div className="favorites__readall">
              {posts?.length ? (
                <img
                  src={
                    posts[0]?.imageUrl
                      ? `http://localhost:3002${posts[0].imageUrl}`
                      : svgs.placeholder
                  }
                  alt=""
                />
              ) : null}
              {/* <button>ПРОЧИТАТЬ ВСЕ</button> */}
            </div>
            <h3 className="favorites__title">Понравившиеся</h3>
            <div className="favorites__metainfo">
              <span>{posts?.length} поста</span>
            </div>
          </div>
          <div className="favorites__inner pl-350">
            {loading ? (
              <Loader />
            ) : posts?.length ? (
              posts.map((item, i) => <Post key={item.title} {...item} number={i} favorites={true} />)
            ) : null}
          </div>
        </>
      ) : (
        <div className="myposts__inner__message">
          <span>Вы не вошли в аккаунт,</span>
          <Link to={'/login'} title="Нажмите чтобы войти">
            войти?
          </Link>
        </div>
      )}
    </section>
  );
}

export default Favorites;
