import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortTypes } from '../utills/constants';
import { setSortType } from '../redux/slices/filterSlice';

function Sort() {
  const [popupOpened, setPopupOpened] = React.useState(false);
  const selected = useSelector((state) => state.filter.sortTypeId);
  const selectedName = sortTypes[selected].title;
  const dispatch = useDispatch();
  const popupRef = useRef();

  const onSelectType = (i) => {
    dispatch(setSortType(i));
    setPopupOpened(false);
  };

  useEffect(() => {
    const onEscClose = (e) => {
      if (e.key === 'Escape') {
        setPopupOpened(false);
      }
    };

    const onClickAround = (e) => {
      if (!e.path.includes(popupRef.current)) {
        setPopupOpened(!popupOpened);
      }
    };

    if (popupOpened) {
      window.addEventListener('keydown', onEscClose);
      document.body.addEventListener('click', onClickAround);
    }
    return () => {
      window.removeEventListener('keydown', onEscClose);
      document.body.removeEventListener('click', onClickAround);
    };
  }, [popupOpened]);

  return (
    <div className='sort' ref={popupRef}>
      <div className='sort__label'>
        <span className='sort__label-static'>Сортировать по:</span>
        <span className='sort__selected-type' onClick={() => setPopupOpened(!popupOpened)}>
          {selectedName}
        </span>
      </div>
      {popupOpened && (
        <ul className='sort__popup'>
          {sortTypes.map(({ title }, i) => (
            <li
              key={title}
              className={`sort__type-item ${i === selected ? 'sort__type-item_selected' : ''}`}
              onClick={() => onSelectType(i)}>
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sort;
