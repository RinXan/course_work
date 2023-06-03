import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { checkIsAuth } from '../redux/slices/user';
import { createPost, updatePost } from '../redux/slices/posts';
import { closeNav, makeUnVis, makeVis } from '../redux/slices/navbar';

import axios from '../http/axios.js';

import 'easymde/dist/easymde.min.css';

function AddPost() {
  const { id } = useParams();
  const isAuth = useSelector(checkIsAuth);
  const [post, setPost] = React.useState({ title: '', tags: '', text: '', imageUrl: '' });

  const inputFileRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '350px',
      autofocus: true,
      placeholder: 'Пишите текст вашего поста здесь...',
      status: false,
      autosave: {
        enable: true,
        delay: 1000,
      },
    }),
    [],
  );

  const imageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const image = e.target.files[0];
      formData.append('image', image);
      const { data } = await axios.post('/upload', formData);
      setPost({ ...post, imageUrl: data.url });
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке изображения!');
    }
  };

  const deleteImage = async (postId, name) => {
    if (postId || name) {
      const { data } = await axios.put(`/upload/update`, { postId, name });

      if (data.success) {
        setPost({ ...post, imageUrl: '' });
      } else {
        alert(data.message);
        setPost({ ...post, imageUrl: '' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let data = {};

      data.title = post.title;
      data.tags = post.tags;
      data.text = post.text;
      data.imageUrl = post.imageUrl;

      if (!post.title.length || !post.text.length)
        return alert('Сликом короткий тест/заголовок статьи.');

      if (id) {
        dispatch(updatePost({ id, data }));
        navigate(`/posts/${id}`);
      } else {
        dispatch(createPost(data));
        navigate('/');
        dispatch(makeVis());
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          data = data.post;
          setPost({
            ...data,
            tags:
              data.tags?.length > 1
                ? data.tags.join(' ')
                : data.tags?.length === 1
                ? data.tags[0]
                : '',
          });
        })
        .catch((err) => {
          alert('Произошла ошибка при добавлении/редакировании поста.');
          console.log(err.message);
        });
    }
    if (pathname.match('post')) {
      dispatch(makeUnVis());
      dispatch(closeNav());
    }
  }, [id, dispatch, pathname]);
  React.useEffect(() => {
    if (!window.localStorage.getItem('token') || !isAuth) {
      toast('Сначала нужно авторизоваться', { autoClose: 2500 });
      navigate('/login');
    }
  }, [isAuth, navigate]);

  const onChange = React.useCallback(
    (text) => {
      setPost({ ...post, text });
    },
    [post],
  );

  const clearFormHandler = () => {
    setPost({ title: '', tags: '', text: '' });
  };

  return (
    <section className="content">
      <div className="addpost">
        <button onClick={(e) => inputFileRef.current.click()} className="addpost__btn">
          Добавить постер
        </button>
        <input ref={inputFileRef} onChange={(e) => imageUpload(e)} type="file" hidden />
        {post.imageUrl ? (
          <>
            <button
              onClick={() => deleteImage(id, post?.imageUrl)}
              className="addpost__btn addpost__btn--delete">
              Удалить
            </button>
            <img
              className="addpost__img"
              src={`http://localhost:3002${post.imageUrl}`}
              alt="Uploaded"
            />
          </>
        ) : null}
        <br />
        <br />
        <div className="addpost__title">
          <input
            className="addpost__title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Заголовок статьи..."
            required
          />
        </div>
        <input
          className="addpost__tags"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          type="text"
          placeholder="теги через пробел..."
        />
        <SimpleMDE
          className="addpost__simpleMDE"
          value={post.text}
          onChange={onChange}
          options={options}
        />
        <div className="addpost__bottom">
          <button onClick={(e) => handleSubmit(e)} type="submit" className="addpost__btn">
            {id ? 'Сохранить' : 'Опубликовать'}
          </button>
          {post.title?.length || post.tags?.length || post.imageUrl || post.text?.length ? (
            <button className="addpost__btn" onClick={clearFormHandler}>
              Очистить форму
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default AddPost;
