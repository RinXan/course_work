import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/slices/comments';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import avatar from '../../img/avatar.svg';
import { svgs } from '../../utils/icons.js';

function Comment({ text, author, createdAt, ...rest }) {
  const {data: currentUser} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const handleCommentDelete = () => {
    if (author._id === currentUser?._id) {
      dispatch(deleteComment({postId: rest.postId, commentId: rest._id}));
    } else {
      toast("Вы не можете удалить чужой комментарий.", {autoClose: 2500});
    }
  };

  return (
    <article className="comment">
      <div className="comment__inner">
        <Link to={`/channel/${author?._id}`}>
          <img
            // src={author?.imageUrl ? `http://localhost:3002/uploads/users${author?.imageUrl}` : avatar}
            src={author?.imageUrl ? `http://localhost:3002${author?.imageUrl}` : avatar}
            alt={author?.fullname}
          />
        </Link>

        <div className="comments__author">
          <div className="comments__author__name">
            <Link to={`/channel/${author?._id}`}>{author?.fullname}</Link>
            <Moment fromNow date={createdAt} />
          </div>
          <p>{text}</p>
        </div>
      </div>

      <div className="comment__bucket" onClick={handleCommentDelete}>
        <img src={svgs.bucket} alt="Delete comment" />
      </div>
    </article>
  );
}

export default Comment;
