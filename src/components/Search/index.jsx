import React, { useCallback } from 'react';
import SearchContext from '../../contexts/searchContext';
import { debounce } from '../../utills/utills';
import styles from './Search.module.scss';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);

  const onSearch = useCallback(
    debounce((value) => setSearchValue(value), 500),
    [],
  );

  const onChange = (value) => {
    setValue(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Поиск по названию..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Search;
