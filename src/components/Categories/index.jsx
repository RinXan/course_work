import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../../redux/slices/filter';

function Categories() {
  const catList = useSelector((state) => state.filter.list);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <div className="categories__list">
        <ul>
          {catList.map((item, index) => (
            <li
              key={index}
              title={item.name}
              onClick={() => dispatch(changeCategory(index))}
              className={item.active ? 'active' : ''}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
