import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { activeNav } from '../../redux/slices/navbar.js';

import { chanSvgs } from '../../utils/icons';

function Navbar() {
  const { open: navOpen, feeds, subs } = useSelector((state) => state.navbar);
  const dispatch = useDispatch();

  let date = new Date();

  return (
    <aside className={`navbar ${navOpen ? 'navbar__scroll' : 'small'}`}>
      <nav className="navbar__nav">
        <ul>
          {feeds.map((item, ind) => {
            if (item.text !== 'Понравившиеся') {
              return (
                <li
                  key={ind}
                  onClick={() => dispatch(activeNav(ind))}
                  className={item.active ? 'active__nav' : ''}>
                  <Link to={item.url}>
                    <img src={item.img} alt={item.text} />
                    {item.text}
                  </Link>
                </li>
              );
            } else if (item.text === 'Понравившиеся' && navOpen) {
              return (
                <li
                  key={ind}
                  onClick={() => dispatch(activeNav(ind))}
                  className={item.active ? 'active__nav' : ''}>
                  <Link to={item.url}>
                    <img src={item.img} alt={item.text} />
                    {item.text}
                  </Link>
                </li>
              );
            } else return null;
          })}
        </ul>
      </nav>
      {navOpen && subs && (
        <>
          <hr />
          <section className="subs">
            <h3 className="subs__title">ПОДПИСКИ</h3>
            {subs?.length ? (
              <ul>
                {subs.map((item, i) => (
                  <li key={i}>
                    <Link to={`/channel/${item.id}`}>
                      <img src={item?.ava ? `http://localhost:3002${item.ava}` : chanSvgs.logo} alt={item.fullname} />
                      <span>{item.fullname}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p>У вас нет подписки</p>}
          </section>
          <hr />

          <div className="navbar__footer">
            <a href="mailto:sefan.wen9.net@mail.ru">sefan.wen9.net@mail.ru</a>
            <span>© {date.getFullYear()} | olimpic</span>
          </div>
        </>
      )}
    </aside>
  );
}

export default Navbar;
