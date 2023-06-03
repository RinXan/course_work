import { Link } from 'react-router-dom';

function TagItem({ text }) {
  return <Link to={`/tags/${text}`}>#{text}</Link>;
}

export default TagItem;
