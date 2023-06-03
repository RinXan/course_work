import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { openPost } from '../../redux/slices/postsSlice';
import { closeNav } from '../../redux/slices/navbarSlice';
import { unactiveHome } from '../../redux/slices/homeSlice';

function OwnPost({ title, publishedAt, likes, comments, reads }) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    window.scrollTo(0, 0);
    dispatch(closeNav());
    dispatch(unactiveHome());
    dispatch(openPost());
  };

  return (
    <article className="ownpost__item">
      <div className="ownpost__info">
        <h4>
          <Link onClick={clickHandler} to="/post">
            {title}
          </Link>
        </h4>
        <p>
          Опубликовано <span>{publishedAt}</span>
        </p>
      </div>
      <div className="ownpost__stat">
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.8334 7.95619H14.9875L16.1573 4.60761C16.3678 4.00293 16.2615 3.33262 15.8709 2.81547C15.4803 2.29831 14.8469 1.98901 14.1792 1.98901H12.5C12.1907 1.98901 11.898 2.12029 11.699 2.34704L6.80317 7.95619H4.16671C3.01775 7.95619 2.08337 8.84828 2.08337 9.94525V18.896C2.08337 19.993 3.01775 20.8851 4.16671 20.8851H18.0282C18.452 20.8837 18.8654 20.7596 19.2138 20.5291C19.5622 20.2986 19.8291 19.9726 19.9792 19.5942L22.8511 12.2834C22.8947 12.1717 22.9169 12.0535 22.9167 11.9343V9.94525C22.9167 8.84828 21.9823 7.95619 20.8334 7.95619ZM4.16671 9.94525H6.25004V18.896H4.16671V9.94525ZM20.8334 11.7543L18.0282 18.896H8.33337V9.31074L12.9875 3.97807H14.1813L12.5542 8.63545C12.5014 8.78494 12.4867 8.9443 12.5112 9.10032C12.5358 9.25634 12.599 9.40451 12.6955 9.53256C12.7921 9.6606 12.9192 9.76483 13.0663 9.8366C13.2135 9.90838 13.3765 9.94562 13.5417 9.94525H20.8334V11.7543Z"
              fill="black"
            />
          </svg>

          <span>{likes}</span>
        </div>
        <div>
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.402 17.6021C18.2993 17.6021 20.2485 17.6021 21.4587 16.4593C22.67 15.3174 22.67 13.4783 22.67 9.80106C22.67 6.12384 22.67 4.28474 21.4587 3.14286C20.2485 2 18.2993 2 14.402 2H10.268C6.37067 2 4.42149 2 3.21126 3.14286C2 4.28474 2 6.12384 2 9.80106C2 13.4783 2 15.3174 3.21126 16.4593C3.88614 17.097 4.79045 17.3788 6.134 17.5027"
              stroke="black"
              strokeWidth="2.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.4021 17.6022C13.1247 17.6022 11.7171 18.0898 10.4324 18.7188C8.3675 19.73 7.33504 20.2361 6.82655 19.9133C6.31807 19.5915 6.41419 18.592 6.60745 16.5939L6.65086 16.1395"
              stroke="black"
              strokeWidth="2.16667"
              strokeLinecap="round"
            />
          </svg>

          <span>{comments}</span>
        </div>
        <div>
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.4423 8.88611C22.9558 9.60221 22.9558 10.5689 22.4423 11.2839C20.8249 13.535 16.9444 18.17 12.4139 18.17C7.88337 18.17 4.00287 13.535 2.38545 11.2839C2.13562 10.941 2 10.5192 2 10.085C2 9.65081 2.13562 9.22899 2.38545 8.88611C4.00287 6.63501 7.88337 2 12.4139 2C16.9444 2 20.8249 6.63501 22.4423 8.88611V8.88611Z"
              stroke="black"
              strokeWidth="2.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4138 13.55C14.2087 13.55 15.6638 11.9987 15.6638 10.085C15.6638 8.17133 14.2087 6.62 12.4138 6.62C10.6189 6.62 9.16382 8.17133 9.16382 10.085C9.16382 11.9987 10.6189 13.55 12.4138 13.55Z"
              stroke="black"
              strokeWidth="2.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>{reads}</span>
        </div>
      </div>
      <div className="menu">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </article>
  );
}

export default OwnPost;
