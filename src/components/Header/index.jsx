import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Search from '../Search';
import UserMenu from '../UserMenu';

import { toggleNav, openNav, makeUnVis, makeVis } from '../../redux/slices/navbar';

function Header({ gridRef }) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.navbar.visible);
  const { pathname } = useLocation();

  const onClickBurger = () => {
    if (pathname.match('post') || pathname.match('login') || pathname.match('register')) {
      if (visible) {
        dispatch(makeUnVis());
        gridRef.current.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else {
        dispatch(makeVis());
        gridRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }
    dispatch(toggleNav());
  };
  
  const onClickLogo = () => {
    if (!visible) {
      dispatch(makeVis());
    }
    dispatch(openNav());
  }

  return (
    <header className="header">
      <div className="header__logo">
        <div onClick={onClickBurger} className="burger">
          <span></span>
        </div>
        <h1 onClick={onClickLogo}>
          <Link to="/">Olympic</Link>
        </h1>
      </div>
      <Search />
      <UserMenu />
    </header>
  );
}

export default Header;
