import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { debounce } from '../../utills/utills';
import styles from './Search.module.scss';

function Search() {
  const [displayedText, setDisplayedText] = React.useState('');
  const dispatch = useDispatch();

  const onSearch = React.useCallback(
    debounce((value) => dispatch(setSearchValue(value)), 500),
    [],
  );

  const onChange = (value) => {
    setDisplayedText(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Поиск по названию..."
      value={displayedText}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Search;
