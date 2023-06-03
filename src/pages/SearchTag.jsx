import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useParams, useSearchParams } from 'react-router-dom';

import Post from '../components/Post';
import Loader from '../components/Loader';
import { getPostsBySearch } from '../redux/slices/posts';

export default function SearchTag() {
  const [searchParams] = useSearchParams();
  const { tag } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (tag) {
      dispatch(getPostsBySearch({ tag }));
    } else if (searchParams.get('text')) {
      dispatch(getPostsBySearch({ text: searchParams.get('text') }));
    }
  }, [tag, searchParams, dispatch]);
  
  const posts = useSelector((store) => store.post.posts);
  const loading = useSelector((store) => store.post.loading);

  return (
    <section className="tags">
      {tag ? <h1>#{tag}</h1> : null}
      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : posts?.length ? (
          posts.map((post) => <Post atHome={true} key={post._id} {...post} />)
        ) : (
          <h2>Нет подходящей статьи</h2>
        )}
      </div>
    </section>
  );
}
