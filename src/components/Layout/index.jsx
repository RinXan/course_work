import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeNav, makeUnVis, makeVis } from '../../redux/slices/navbar';

import Header from '../Header';
import Navbar from '../Navbar';

const Layout = ({ children }) => {
  const navOpen = useSelector((state) => state.navbar.open);
  const visible = useSelector((state) => state.navbar.visible);
  const gridRef = React.useRef('');
  
  let paddingAllowed = true;
  
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    gridRef.current.style.display = 'none';
  }, [pathname]);

  if (pathname.match('post') || pathname.match('login') || pathname.match('register')) {
    paddingAllowed = false;
  } else {
    paddingAllowed = true;
    dispatch(makeVis());
    document.body.style.overflow = 'auto';
  }

  const handleGreyGrid = () => {
    gridRef.current.style.display = 'none';
    document.body.style.overflow = 'auto';
    dispatch(closeNav());
    dispatch(makeUnVis());
  }

  return (
    <>
      <Header gridRef={gridRef} />
      {visible ? <Navbar /> : null}
      <main 
        className={`container ${
          visible ? (paddingAllowed ? (navOpen ? 'pl-200' : 'pl-50') : '') : ''
        }`}>
        {children}
        <div onClick={handleGreyGrid} ref={gridRef} className="grey_grid"></div>
      </main>
    </>
  );
};

export default Layout;
