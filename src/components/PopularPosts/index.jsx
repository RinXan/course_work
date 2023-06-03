import React from 'react';
import Post from '../Post';

export default function PopularPostsList({ posts, id, type }) {
  return (
    <div className="post__list">
      {posts
        ?.filter((item) => item._id !== id)
        .map((post, i) => (
          <Post similar={true} key={i} {...post} />
        ))}
    </div>
  );
}
