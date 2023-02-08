import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { debounce } from '../../utills/utills';
import styles from './Search.module.scss';

function Search() {
  const [displayedText, setDisplayedText] = React.useState('');
  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const onChange = (value) => {
    setDisplayedText(value);
    onSearch(value);
  };

  const onClear = () => {
    setDisplayedText('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  const onSearch = React.useCallback(
    debounce((value) => dispatch(setSearchValue(value)), 500),
    [],
  );

  return (
    <div className={styles.root}>
      <div className={`${styles.icon} ${styles.iconSearch}`}></div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск по названию..."
        value={displayedText}
        onChange={(e) => onChange(e.target.value)}
      />
      {displayedText && (
        <button onClick={onClear} className={`${styles.icon} ${styles.iconClear}`} />
      )}
    </div>
  );
}

export default Search;
