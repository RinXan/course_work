import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ChannelMenu from '../components/IChannel/Menu';
import ContentWrapper from '../components/IChannel/ContentWrapper';
import ChannelAbout from '../components/IChannel/About';
import Loader from '../components/Loader';

import avatar from '../img/avatar.svg';

import { getAllPosts } from '../redux/slices/posts';
import { subscription } from '../redux/slices/user';

function Channel() {
  const { authorId } = useParams();
  const posts = useSelector((store) => store.post.posts);
  const loading = useSelector((store) => store.post.loading);
  const currentUser = useSelector((store) => store.user.data);

  const author = posts[0]?.author;
  let followed = currentUser?.subscriptions?.includes(authorId);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllPosts({authorId, myposts: false}));
  }, [authorId, dispatch]);

  const handleSubscription = (userId) => {
    if (!userId) {
      return toast('Сначала нужно авторизоваться.', { autoClose: 2500 });
    } else if (authorId === userId) {
      return toast('Нельзя подписаться на свой блог.', { autoClose: 2500 });
    }
    dispatch(subscription(authorId));
    followed = !followed;
  };

  if (!author) return <p style={{fontSize: "22px", paddingTop: "100px", textAlign: "center", fontWeight: 300}}>У данного автора нет постов</p>

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="content channel">
          <div className="channel__top">
            {author?.imageUrl ? (
              <div className="channel__top__poster">
                <img src={`http://localhost:3002${author.imageUrl}`} alt="Poster" />
              </div>
            ) : null}
            <div className="channel__panel">
              <div className="channel__panel__metainfo">
                <img src={author?.imageUrl ? `http://localhost:3002${author.imageUrl}` : avatar} alt="" />
                <div>
                  <span>{author?.fullname}</span>
                  <span>{author?.followers || 0} подписчиков</span>
                </div>
              </div>
              <button
                onClick={() => handleSubscription(currentUser?._id)}
                className="btn"
                type="submit">
                {followed ? 'ОТПИСАТЬСЯ' : 'ПОДПИСАТЬСЯ'}
              </button>
            </div>
          </div>

          <ChannelMenu />

          <Routes>
            <Route
              path="*"
              element={
                <ContentWrapper
                  posts={posts.slice(0, 10)}
                  popPosts={posts.slice(0, 10)}
                  home={true}
                />
              }
            />
            <Route path="articles" element={<ContentWrapper posts={posts} />} />
            <Route path="about" element={<ChannelAbout author={author} />} />
          </Routes>
        </section>
      )}
    </>
  );
}

export default Channel;
