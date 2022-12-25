import { Link, useLocation } from 'react-router-dom';
import Search from '../Search';

import style from './Header.module.scss';

function Header() {
  const location = useLocation().pathname;

  return (
    <header className={style.root}>
      <h1 className={style.title}>REACT - BIKES</h1>
      {location === '/' && (
        <>
          <Search />
          <Link to="/cart">В корзину</Link>
        </>
      )}
    </header>
  );
}

export default Header;
