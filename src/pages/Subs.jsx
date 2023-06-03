import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubs } from '../redux/slices/navbar';

import ChannelSubed from '../components/IChannel/ChannelSubed';
import Loader from '../components/Loader';

function Subs() {
  const currentUser = useSelector((store) => store.user.data);
  const subsList = useSelector((store) => store.navbar.subs);
  const loading = useSelector((store) => store.navbar.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentUser?._id) {
      dispatch(getSubs());
    }
  }, [dispatch, currentUser]);

  return (
    <section className="content subs">
      <div className="subs__inner">
        {currentUser?._id ? (
          loading ? (
            <Loader />
          ) : subsList.length ? (
            subsList.map((item, i) => <ChannelSubed key={i} {...item} />)
          ) : (
            <div className="subs__message">
              <h3>У вас нет подписок</h3>
            </div>
          )
        ) : (
          <div className="myposts__inner__message">
            <span>Вы не вошли в аккаунт,</span>
            <Link to={'/login'} title="Нажмите чтобы войти">
              войти?
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Subs;
