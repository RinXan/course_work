import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addComment } from '../../redux/slices/comments';

const Input = ({ postId }) => {
  const [text, setText] = React.useState('');
  const token = useSelector(store => store.user.token);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast('Введите комментарий', {autoClose: 2500});
    } else if (token) {
      dispatch(addComment({ text, postId }));
    } else {
      toast('Чтобы оставлять комментарии нужно авторизоваться', {autoClose: 2500});
    }
    setText('');
  };

  return (
    <form className="comments__form" method="post">
      <input
        className="form__text"
        type="text"
        name="addComment"
        placeholder="Напишите комментарий..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
      />
      <input type="submit" value="Отправить" onClick={(e) => handleClick(e)} />
      {text && (
        <button onClick={() => setText('')} className="comments__cancel">
          Отмена
        </button>
      )}
    </form>
  );
};

export default Input;
