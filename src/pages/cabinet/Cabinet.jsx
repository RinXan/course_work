import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import CabinetPosts from './CabinetPosts';
import CabinetInfo from './CabinetInfo';
import { toast } from 'react-toastify';

function Cabinet() {
  const currentUser = useSelector((store) => store.user.data);
  const [opened, setOpened] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser._id) {
      toast('Сначала нужно войти в профиль', { autoClose: 2000 });
      return navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div className="content cabinet">
      <div className="cabinet__inner">
        <div className="cabinet__header">
          <div className={opened ? "cabinet__header__item cabinet__item__active" : "cabinet__header__item"}>
            <Link onClick={() => setOpened(!opened)} to="">Профиль</Link>
          </div>
          <div className={!opened ? "cabinet__header__item cabinet__item__active" : "cabinet__header__item"}>
            <Link onClick={() => setOpened(!opened)} to="psts">Посты</Link>
          </div>
        </div>

        <Routes>
          <Route path="" element={<CabinetInfo currentUser={currentUser} />} />
          <Route path="psts" element={<CabinetPosts authorId={currentUser._id} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Cabinet;
