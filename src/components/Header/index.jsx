import { Link, useLocation } from 'react-router-dom';
import CartWidget from '../CartWidget';
import Search from '../Search';

import styles from './Header.module.scss';

function Header() {
  const location = useLocation().pathname;

  return (
    <header className={styles.root}>
      {location !== '/' && <Link to='/' className={styles.backLink}></Link>}
      <h1 className={styles.title}>REACT - BIKES</h1>
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
