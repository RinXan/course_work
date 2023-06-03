import React from 'react';
import Post from '../Post';
import next from '../../img/right.png';

export default function Content({ home, posts, title }) {
  const sliderLineRef = React.useRef(null);

  const handleSlider = (direction, slider, count) => {
    let offset = Number(slider.current.style.left.slice(0, -2));
    if (direction === 'next' && offset > -280 * (count - 1)) {
      offset -= 290;
      slider.current.style.left = offset + 'px';
    } else if (direction === 'prev' && offset < 0) {
      offset += 290;
      slider.current.style.left = offset + 'px';
    } else {
      slider.current.style.left = 0 + 'px';
    }
  };


  return (
    <section>
      {home ? (
        <>
          <h3>{title}</h3>
        </>
      ) : null}

      
      {posts?.length ? (
        <div className={home ? 'slider' : null}>
        <div ref={sliderLineRef} className={home ? 'slider__line' : 'content__articles'}>
          {posts.map((post, i) => (
            <Post atHome={true} key={post._id || i} {...post} />
          ))}
        </div>
      </div>
      ) : <p>Отсутствуют</p>}
      

      {home && posts?.length ? (
        <>
          <div
            onClick={(e) => handleSlider('prev', sliderLineRef, posts.length)}
            className="slider__btn prev">
            <img src={next} alt="next btn" />
          </div>
          <div
            onClick={(e) => handleSlider('next', sliderLineRef, posts.length)}
            className="slider__btn next">
            <img src={next} alt="next btn" />
          </div>
        </>
      ) : null}

      {home ? <hr /> : null}
    </section>
  );
}
