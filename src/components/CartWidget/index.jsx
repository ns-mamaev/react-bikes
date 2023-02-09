import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CartWidget.module.scss';

function CartWidget() {
  const navigate = useNavigate();
  const [popupOpened, setPopupOpened] = useState(false);
  const timerRef = useRef(null);

  const onShowPopup = () => {
    if (timerRef.current !== null) {
      // если повторно навели на попап - отменяем запланированное закрытие
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!popupOpened) {
      setPopupOpened(true);
    }
  };

  const onHidePopup = () => {
    timerRef.current = setTimeout(() => setPopupOpened(false), 500);
  };

  return (
    <div className={styles.cartWidget} onMouseEnter={onShowPopup} onMouseLeave={onHidePopup}>
      <Link title='В корзину' className={styles.cartLink} to='/cart'>
        Корзина
        <div className={styles.cartIcon}></div>
        <span className={styles.itemsQty}>2</span>
      </Link>
      <div className={styles.popup + ' ' + (popupOpened ? '' : styles.popupHidden)}>
        <ul className={styles.cartItems}>
          <li className={styles.cartItem}>
            <p className={styles.itemTitle}>SCULTURA RIM 400 / красный / XS</p>
            <img
              className={styles.itemImage}
              src='https://d2lljesbicak00.cloudfront.net/merida-v2/crud-card//master/bikes/2021/SCULTURA_RIM_400_redslv_MY2021.tif?p3'
              alt='вел'
            />
            <button className={styles.removeItem}></button>
          </li>
          <li className={styles.cartItem}>
            <p className={styles.itemTitle}>SCULTURA RIM 400 / красный / XS</p>
            <img
              className={styles.itemImage}
              src='https://d2lljesbicak00.cloudfront.net/merida-v2/crud-card//master/bikes/2022/BIG_NINE_700_grncmp_MY2022.tif?p3'
              alt='вел'
            />
            <button className={styles.removeItem}></button>
          </li>
          <li className={styles.cartItem}>
            <p className={styles.itemTitle}>ONE-SIXTY 8000 400 / красный / XS</p>
            <img
              className={styles.itemImage}
              src='https://d2lljesbicak00.cloudfront.net/merida-v2/crud-card//master/bikes/2021/SCULTURA_RIM_400_redslv_MY2021.tif?p3'
              alt='вел'
            />
            <button className={styles.removeItem}></button>
          </li>
        </ul>
        <button onClick={() => navigate('/cart')} className={styles.cartBtn}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default CartWidget;
