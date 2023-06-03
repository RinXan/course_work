import Moment from 'react-moment';
import 'moment/locale/ru';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';

import PostDosts from '../PostDots';

import { closeNav, makeVis, openNav } from '../../../redux/slices/navbar';
import { openPost } from '../../../redux/slices/posts';

import { svgs } from '../../../utils/icons';

function HomePost({ _id, imageUrl, author, title, views, createdAt }) {
  const dispatch = useDispatch();

  const openArticle = () => {
    dispatch(openPost());
    dispatch(closeNav());
  };

  const openChannel = () => {
    dispatch(makeVis());
    dispatch(openNav());
  };

  return (
    <article className="post post--home">
      <Link to={`/posts/${_id}`} onClick={openArticle}>
        <img src={imageUrl ? `http://localhost:3002${imageUrl}` : svgs.placeholder} alt={title} />
      </Link>
      <div>
        <div className="post__info">
          <Link to={`/channel/${author?._id}`} onClick={openChannel}>
            <img src={author?.imageUrl ? `http://localhost:3002${author.imageUrl}` : svgs.authorImage} alt={author?.fullname} />
          </Link>
          <div>
            <Link to={`/posts/${_id}`} onClick={openArticle}>
              <h4>{title}</h4>
            </Link>
            <Link to={`/channel/${author?._id}`} onClick={openChannel}>
              <span>{author?.fullname}</span>
            </Link>
            <div>
              <span>{views} просмотров</span>
              <div className="post__dot"></div>
              <Moment fromNow date={createdAt} />
            </div>
          </div>
        </div>

        <PostDosts />
      </div>
    </article>
  );
}

export default HomePost;
