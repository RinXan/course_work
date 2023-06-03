import React from 'react';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { deletePost, getOnePost, getPostsBySearch, likeOrUnlike } from '../redux/slices/posts';

import Comments from '../components/Comments';
import Tags from '../components/Tags';
import Loader from '../components/Loader';
import PopularPostsList from '../components/PopularPosts';
import NotFoundBlock from '../components//NotFoundBlock';

import { navSvgs, svgs } from '../utils/icons';
import { closeNav, makeUnVis, makeVis, openNav } from '../redux/slices/navbar';

function FullPost() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.data);
  const currentPost = useSelector((state) => state.post.currentPost);
  const recommendations = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const { pathname } = useLocation();

  let isAuthor;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pathname.match('post')) {
      dispatch(makeUnVis());
      dispatch(closeNav());
    }
    dispatch(getOnePost(id));
  }, [id, dispatch, pathname]);

  React.useEffect(() => {
    if (currentPost._id) {
      dispatch(getPostsBySearch({ text: 'none', tag: currentPost.tags?.join(',') }));
    }
  }, [currentPost, dispatch]);

  const deletePostHandler = (id) => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(deletePost(id));
      navigate('/');
      dispatch(makeVis());
      toast('Статья удалена', { autoClose: 2500 });
    }
  };

  const editPostHandler = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  const handleLike = (postId) => {
    if (currentUser?._id && postId) {
      dispatch(likeOrUnlike({ id: postId }));
    } else {
      toast('Нужно авторизоваться чтобы оставить лайк', { autoClose: 2500 });
    }
  };

  const onClickChannel = () => {
    dispatch(makeVis());
    dispatch(openNav());
  };

  isAuthor = currentPost?.author?._id === currentUser?._id;

  if (!currentPost) {
    navigate(-1);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : currentPost ? (
        <section className="content fullpost--cover">
          <div className="fullpost">
            <div className="post__poster">
              {currentPost.imageUrl ? (
                <img src={`http://localhost:3002${currentPost.imageUrl}`} alt={currentPost.title} />
              ) : null}
            </div>

            <div className="post__metainfo">
              <div className="post__left">
                <h1>{currentPost.title}</h1>
                <Tags tagList={currentPost.tags} />
              </div>

              <div className="post__right">
                <Moment format="D MMM YYYY" date={currentPost?.createdAt} withTitle />
                <Link to={`/channel/${currentPost?.author?._id}`} onClick={onClickChannel}>
                  {currentPost?.author?.fullname}
                </Link>
                <div className="post__right__info">
                  <div onClick={() => handleLike(currentPost._id)}>
                    <img src={navSvgs.like} alt="Like it" />
                    <span>
                      {currentPost?.likes?.length === 0 ? null : currentPost?.likes?.length}
                    </span>
                  </div>
                  <div>
                    <svg
                      width="24"
                      height="20"
                      viewBox="0 0 24 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.4423 8.88611C22.9558 9.60221 22.9558 10.5689 22.4423 11.2839C20.8249 13.535 16.9444 18.17 12.4139 18.17C7.88337 18.17 4.00287 13.535 2.38545 11.2839C2.13562 10.941 2 10.5192 2 10.085C2 9.65081 2.13562 9.22899 2.38545 8.88611C4.00287 6.63501 7.88337 2 12.4139 2C16.9444 2 20.8249 6.63501 22.4423 8.88611V8.88611Z"
                        stroke="white"
                        strokeWidth="2.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.4138 13.55C14.2087 13.55 15.6638 11.9987 15.6638 10.085C15.6638 8.17133 14.2087 6.62 12.4138 6.62C10.6189 6.62 9.16382 8.17133 9.16382 10.085C9.16382 11.9987 10.6189 13.55 12.4138 13.55Z"
                        stroke="white"
                        strokeWidth="2.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{currentPost?.views}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="fullpost__text">
              <ReactMarkdown children={currentPost.text} />
            </div>

            <hr />

            <div className="post__comments__block">
              <div className="post__comments__header">
                <h4>Комментарии</h4>
                <div className="post__comments__header__actions">
                  {isAuthor ? (
                    <>
                      <div onClick={() => editPostHandler(currentPost._id)}>
                        <img src={svgs.edit} alt="Edit post" />
                      </div>
                      <div onClick={() => deletePostHandler(currentPost._id)}>
                        <img src={svgs.bucket} alt="Remove post" />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <Comments postId={currentPost._id} />

              <hr />
            </div>
          </div>

          <PopularPostsList posts={recommendations} id={currentPost._id} />
        </section>
      ) : (
        <NotFoundBlock />
      )}
    </>
  );
}

export default FullPost;
