import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/slices/posts';

import Post from '../../components/Post';

const WithOutPosts = () => {
  return (
    <div className="cabinet__without__posts">
      <h2>У вас нет постов</h2>
    </div>
  );
};

export default function CabinetPosts({ authorId }) {
  const posts = useSelector((store) => store.post.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllPosts({ authorId }));
  }, [dispatch, authorId]);

  return (
    <div className="cabinet__posts__inner">
      {posts?.length ? (
        posts.map((item, i) => <Post key={item.title} {...item} cab={true} />)
      ) : (
        <WithOutPosts />
      )}
    </div>
  );
}
