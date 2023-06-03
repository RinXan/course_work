import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../img/avatar.svg';

export default function CabinetInfo({currentUser}) {

  return (
    <>
      <div className="cabinet__info">
        <div className="cabinet__info__data">
          <div className="cabinet__info__left">
            <p>Имя пользователя</p>
            <p>Почта</p>
            <p>О себе</p>
          </div>

          <div className="cabinet__info__right">
            <p>{currentUser.fullname}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.description}</p>
          </div>
        </div>

        <div className="cabinet__info__image">
          {currentUser?.imageUrl ? (
            <img
              className="cabinet__info__image__border"
              src={`http://localhost:3002${currentUser.imageUrl}`}
              alt={currentUser.fullname}
            />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
        </div>
      </div>

      <div className="cabinet__btn">
        <Link className="btn" to={`/cabinet/edit`}>
          Изменить
        </Link>
      </div>
    </>
  );
}
