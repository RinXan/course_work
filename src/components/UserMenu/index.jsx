import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeVis, cleanSubs } from '../../redux/slices/navbar';
import { checkIsAuth, logout } from '../../redux/slices/user';

function UserMenu() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
    dispatch(cleanSubs());
    dispatch(makeVis());
    toast('Вы вышли из аккаунта', { autoClose: 3000 });
  };

  return (
    <div className="usermenu">
      {isAuth ? (
        <>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link className='btn' onClick={onClickLogout} to="/">
            Выйти
          </Link>
        </>
      ) : (
        <>
          <Link to="/register">Создать аккаунт</Link>
          <Link className='btn' to="/login">Войти</Link>
        </>
      )}
    </div>
  );
}

export default UserMenu;
