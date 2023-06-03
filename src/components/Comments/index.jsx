import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../redux/slices/comments';

import Input from './Input';
import Comment from './Comment';

const Comments = ({ postId }) => {
  const comments = useSelector((store) => store.comment.comments);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [dispatch, postId]);

  return (
    <div className="comments">
      <Input postId={postId} />

      <div className="comments__list">
        {comments?.map((comment, i) => <Comment key={i} {...comment} />)}
      </div>
    </div>
  );
};

export default Comments;