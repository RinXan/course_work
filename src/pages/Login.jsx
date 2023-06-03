import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, login } from '../redux/slices/user';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { status } = useSelector((state) => state.user);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status) toast(status, { autoClose: 3000 });
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const submitHandler = () => {
    try {
      dispatch(login({ email, password }));
    } catch (error) {
      setPassword(''); 
    }
  };

  return (
    <section className="content">
      <div className="auth">
        <h1 className="auth__title">Авторизация</h1>
        <form onSubmit={(e) => e.preventDefault()} className="auth__form" action="#" method="post">
          <div className="auth__form__info">
            <div className="auth__form__label">
              <label htmlFor="email">Ваша почта</label>
              <label htmlFor="password">Ваша пароль</label>
            </div>
            <div className="auth__form__input">
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
            <Link to="/register">Создать аккаунт</Link>
            <input className='btn' type="submit" onClick={submitHandler} value="Войти" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
