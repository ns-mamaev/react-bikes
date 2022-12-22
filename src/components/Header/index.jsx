import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss';

function Header() {
  const location = useLocation().pathname;

  return (
    <header className={style.root}>
      <h1 className={style.title}>REACT - BIKES</h1>
      {location === '/' && (
        <>
          <input type="text" placeholder="Поиск по названию..." />
          <Link to="/cart">В корзину</Link>
        </>
      )}
    </header>
  );
}

export default Header;
