import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../http/axios.js';

import avatar from '../../img/avatar.svg';
import { updateInfo } from '../../redux/slices/user.js';

function Cabinet() {
  const inputFileRef = React.useRef(null);
  const currentUser = useSelector((store) => store.user.data);
  const [user, setUser] = React.useState({
    fullname: '',
    email: '',
    description: '',
    imageUrl: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!currentUser._id) return navigate('/login');
    setUser({ ...currentUser });
  }, [currentUser, navigate]);

  const imageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const image = e.target.files[0];
      formData.append('image', image);
      const { data } = await axios.post('/upload', formData);
      if (data.url) setUser({ ...user, imageUrl: data.url });
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке изображения!');
    }
  };

  const deleteImage = async (userId, name) => {
    if (userId || name) {
      const { data } = await axios.put(`/upload/update`, { postId: false, name, userId });

      if (!data.success) {
        alert(data.message);
      }
      setUser({ ...user, imageUrl: '' });
    }
  };

  const handleUserUpadate = async () => {
    if (!user.fullname || !user.email || !user.description) {
      return toast('Заполните все поля', { autoClose: 2000 });
    }
    dispatch(updateInfo(user));
    navigate(-1);
  };

  return (
    <div className="content cabinet">
      <div className="cabinet__inner">
        <h1>Редактирование профиля</h1>

        <div className="cabinet__info">
          <div className="cabinet__info__data">
            <div className="cabinet__info__left">
              <p>Имя пользователя</p>
              <p>Почта</p>
              <p>О себе</p>
            </div>

            <div className="cabinet__info__right">
              <form>
                <input
                  type="text"
                  value={user.fullname}
                  onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <textarea
                  type="text"
                  value={user.description}
                  onChange={(e) => setUser({ ...user, description: e.target.value })}></textarea>
              </form>
            </div>
          </div>

          <div className="cabinet__info__image">
            {user?.imageUrl ? (
              <>
                <img
                  className="cabinet__info__image__border"
                  src={`http://localhost:3002${user.imageUrl}`}
                  alt={user.fullname}
                />
                <button
                  onClick={() => deleteImage(user._id, user.imageUrl)}
                  className="addpost__btn addpost__btn--delete cabinet__edit__delbutton">
                  Удалить
                </button>
              </>
            ) : (
              <img src={avatar} alt="avatar" />
            )}
            <button onClick={(e) => inputFileRef.current.click()} className="addpost__btn">
              Изменить картинку
            </button>
            <input ref={inputFileRef} onChange={(e) => imageUpload(e)} type="file" hidden />
          </div>
        </div>

        <div className="cabinet__btn">
          <Link className="btn" to={`/cabinet`}>
            Отмена
          </Link>
          <Link onClick={() => handleUserUpadate()} className="btn" to={`/cabinet/edit`}>
            Сохранить
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
