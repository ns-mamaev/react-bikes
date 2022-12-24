import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../redux/slices/counterSlice';
import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss';

function Header({ onSearch, searchText }) {
  const location = useLocation().pathname;
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <header className={style.root}>
      <h1 className={style.title}>REACT - BIKES</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>

      {location === '/' && (
        <>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
          <Link to="/cart">В корзину</Link>
        </>
      )}
    </header>
  );
}

export default Header;
