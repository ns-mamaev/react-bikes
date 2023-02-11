import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortTypes } from '../../utills/constants';
import { setSortType } from '../../redux/slices/filterSlice';
import styles from './Sort.module.scss';

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
      if (e.target.closest(`.${styles.sort}`) !== popupRef.current) {
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
    <div className={styles.sort} ref={popupRef}>
      <div className={styles.label}>
        <span className={styles.labelStatic}>Сортировать по:</span>
        <span className={styles.selectedType} onClick={() => setPopupOpened(!popupOpened)}>
          {selectedName}
        </span>
      </div>
      <ul className={styles.popup + ' ' + (popupOpened ? '' : styles.popupHidden)}>
        {sortTypes.map(({ title }, i) => (
          <li
            key={title}
            className={styles.typeItem + ' ' + (i === selected ? styles.typeItemSelected : '')}
            onClick={() => onSelectType(i)}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sort;
