import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import PostDots from '../PostDots';
import { svgs } from '../../../utils/icons';

function FavPost({ number, ...post }) {
  return (
    <article className="favpost">
      <div className="favpost__inner">
        <span className="favpost__counter">{number + 1}</span>
        <Link to={`/posts/${post._id}`} className="favpost__img">
          <img src={post?.imageUrl ? `http://localhost:3002${post.imageUrl}` : svgs.placeholder} alt={post.title} />
        </Link>
        <div className="favpost__info">
          <Link className="favpost__title" to={`/posts/${post._id}`}>
            {post.title}
          </Link>
          <div className="favpost__info__bottom">
            <Link to={`/channel/${post.authorId}`}>{post.authorName}</Link>
            <div className="post__dot"></div>
            <Moment fromNow date={post?.createdAt} />
            <div className="post__dot"></div>
            <span>{post.views} просмотров</span>
          </div>
        </div>
      </div>

      <PostDots />
    </article>
  );
}

export default FavPost;
