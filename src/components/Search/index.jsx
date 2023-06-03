import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import search from '../../img/search.svg';
import close from '../../img/close.svg';
import add from '../../img/add.svg';

function Search() {
  const [text, setText] = React.useState('');

  const navigate = useNavigate();

  const searchPosts = () => {
    if (text.trim()) {
      navigate(`/results?text=${text}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  }

  return (
    <>
      <div className="search">
        <div className="search__inner">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={e => handleKeyPress(e)}
            type="text"
            placeholder="название статьи..."
          />
          <button onClick={searchPosts}>
            <img src={search} alt="search" />
          </button>
          {text ? (
            <img onClick={() => setText('')} className="close__icon" src={close} alt="clean" />
          ) : null}
        </div>
        <Link to="/addpost" title="Написать пост">
          <img src={add} alt="add post" />
        </Link>
      </div>
    </>
  );
}

export default Search;
