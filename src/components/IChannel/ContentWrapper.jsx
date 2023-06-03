import React from 'react';
import ContentPosts from './Content';

function ContentWrapper({ posts, popPosts, home = false }) {
  if (home) {
    popPosts = popPosts.sort((a, b) => b.views - a.views);
  }
  
  return (
    <div className="channel__content">
      <ContentPosts home={home} title={'Посты'} posts={posts} />

      {home ? <ContentPosts home={home} title={'Популярное'} posts={popPosts} /> : null}
    </div>
  );
}

export default ContentWrapper;
