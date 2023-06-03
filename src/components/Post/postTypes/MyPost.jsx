import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import PostDots from '../PostDots';
import { mypostSvgs } from '../../../utils/icons';

function MyPost({ ...post }) {
  return (
    <article className="mypost">
      <div className="mypost__info">
        <Link to={`/posts/${post._id}`}>
          {post.title}
        </Link>
        <p>
          Дата: <Moment format="D MMM YYYY" date={post?.createdAt} withTitle />
        </p>
      </div>

      <div className="mypost__stats">
        <div>
          <img className='makeBlack' src={mypostSvgs.like} alt="likes" />
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
      </div>

      <PostDots />
    </article>
  );
}

export default MyPost;
