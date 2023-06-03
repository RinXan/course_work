import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { svgs } from '../../../utils/icons.js';
import { deletePost } from '../../../redux/slices/posts';

function CabPost({ ...post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletePostHandler = (id) => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(deletePost(id));
      toast('Статья удалена', { autoClose: 2500 });
    }
  };

  const editPostHandler = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  return (
    <article className="cabPost">
      <div className="cabPost__title">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </div>

      {/* <div className="cabPost__stats">
        <div>
          <img className="makeBlack" src={mypostSvgs.like} alt="likes" />
          <span>{post.likes?.length}</span>
        </div>

        <div>
          <img src={mypostSvgs.comment} alt="comments" />
          <span>{post.comments?.length}</span>
        </div>

        <div>
          <img src={mypostSvgs.read} alt="views" />
          <span>{post.views}</span>
        </div>
      </div> */}

      <div className="cabPost__actions">
        <div onClick={() => editPostHandler(post._id)}>
          <img src={svgs.edit} alt="Edit post" />
        </div>
        <div onClick={() => deletePostHandler(post._id)}>
          <img src={svgs.bucket} alt="Remove post" />
        </div>
      </div>
    </article>
  );
}

export default CabPost;
