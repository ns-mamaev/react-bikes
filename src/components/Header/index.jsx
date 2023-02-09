import { Link, useLocation } from 'react-router-dom';
import CartWidget from '../CartWidget';
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
          <CartWidget />
        </>
      )}
    </header>
  );
}

export default Header;
