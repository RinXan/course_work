import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import PostDots from '../PostDots';

import {svgs} from '../../../utils/icons.js';

function SimPost({ favorites, ...post }) {
  return (
    <article className={`${favorites ? 'favorites' : 'similar'}`}>
      <div className="post__poster">
        <Link to={`/posts/${post._id}`}>
          <img src={post.imageUrl ? `http://localhost:3002${post.imageUrl}` : svgs.placeholder} alt="" />
        </Link>
      </div>

      <div className="post__info">
        <Link to={`/posts/${post._id}`}>
          <h3>{post.title}</h3>
        </Link>
        <div>
          <Link to={`/channel/${post.author?._id}`}>
            <span>{post.author?.fullname}</span>
          </Link>
          <div>
            <p>{post.views} просмотров</p>
            <div className="post__dot"></div>
            <Moment date={post.createdAt} fromNow/>
          </div>
        </div>
        {favorites && <p>{post.text}</p>}
      </div>

      <PostDots />
    </article>
  );
}

export default SimPost;
