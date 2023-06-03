import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, checkIsAuth } from '../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Register() {
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { status } = useSelector((state) => state.user);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status) {
      toast(status, { autoClose: 3000 });
    } 
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      dispatch(register({ fullname, email, password }));
      setEmail('');
      setFullname('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="content">
      <div className="auth">
        <h1 className="auth__title">Регистрация</h1>
        <form onSubmit={(e) => e.preventDefault()} className="auth__form" method="post">
          <div className="auth__form__info">
            <div className="auth__form__label">
              <label htmlFor="fullname">Имя пользователя</label>
              <label htmlFor="email">Ваша почта</label>
              <label htmlFor="password">Ваша пароль</label>
            </div>
            <div className="auth__form__input">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                name="fullname"
                placeholder="Введите имя пользователя"
                id="fullname"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Введите E-mail"
                id="email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Введите пароль"
                id="password"
              />
            </div>
          </div>
          <div className="form__controllers">
            <Link to="/login">Войти</Link>
            <input type="submit" onClick={handleSubmit} value="Создать аккаунт" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
