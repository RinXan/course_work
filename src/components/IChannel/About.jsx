import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

function About({ author }) {
  const [views, setViews] = React.useState(0);
  const posts = useSelector((store) => store.post.posts);

  React.useEffect(() => {
    setViews(posts.reduce((acc, curr) => acc + curr.views, 0));
  }, [posts]);

  return (
    <div className="channel__about">
      <section className="channel__about__info">
        <h3>Описание</h3>
        <p>{author?.description || 'Отсутствует'}</p>
      </section>
      <article className="channel__about__stats">
        <h3>Статистика</h3>
        <p>
          Дата регистрации: <Moment format="D MMM YYYY" date={author?.createdAt} withTitle />
          г.
        </p>
        <p>{views} просмотров</p>
      </article>
    </div>
  );
}

export default About;
