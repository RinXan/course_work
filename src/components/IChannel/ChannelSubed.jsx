import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subscription } from '../../redux/slices/user';

export default function ChannelSubed(channel) {
  const dispatch = useDispatch();

  return (
    <div className="subs__item">
      <Link to={`/channel/${channel.id}`} className="subs__logo">
        <img src={`http://localhost:3002${channel.ava}`} alt={channel.fullname} />
      </Link>

      <div className="subs__info">
        <div className="subs__info__text">
          <Link to={`/channel/${channel.id}`}>
            <h3>{channel.fullname}</h3>
          </Link>
          <div className="subs__metainfo">
            <span>{channel.followers} подписчиков</span>
            <div className="post__dot"></div>
            <span>{channel.postsCount} постов</span>
          </div>
          <p>{channel.description}</p>
        </div>
        <button onClick={() => dispatch(subscription(channel.id))}>Отписаться</button>
      </div>
    </div>
  );
}
