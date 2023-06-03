import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/ru';

import PostDots from '../PostDots';
import { svgs } from '../../../utils/icons';

function TrendPost(article) {
  return (
    <div className="trends__item">
      <Link to={`/posts/${article.url}`} className="trends__img">
        <img
          src={article?.imageUrl ? `http://localhost:3002${article.imageUrl}` : svgs.placeholder}
          alt={article.title}
        />
      </Link>

      <div className="trends__info">
        <Link to={`/posts/${article.url}`}>{article.title}</Link>
        <div className="trends__metainfo">
          <Link to={`/channel/${article.author.id}`}>{article.author.fullname}</Link>
          <div className="post__dot"></div>
          <span>{article.views} просмотров</span>
          <div className="post__dot"></div>
          <Moment fromNow date={article.createdAt} />
        </div>
        <p>{article.text}</p>
      </div>

      <PostDots />
    </div>
  );
}

export default TrendPost;
