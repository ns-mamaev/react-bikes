import { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartWidgetItem from '../CartWidgetItem';
import styles from './CartWidget.module.scss';

function CartWidget() {
  const navigate = useNavigate();
  const [popupOpened, setPopupOpened] = useState(false);
  const timerRef = useRef(null);
  const items = useSelector((state) => state.cart.items);
  const totalQty = useMemo(
    () => items.reduce((acc: number, { qty }: any) => acc + qty, 0),
    [items],
  );

  const onMouseEnter = () => {
    if (!totalQty) {
      // закрываем попап при удалении всего из корзины
      if (popupOpened) {
        setPopupOpened(false);
      }
      return;
    }
    if (!popupOpened) {
      setPopupOpened(true);
    }
    if (timerRef.current !== null) {
      // если повторно навели на попап - отменяем запланированное закрытие
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const onMouseLeave = () => {
    timerRef.current = setTimeout(() => setPopupOpened(false), 500);
  };

  return (
    <div className={styles.root} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link title='В корзину' className={styles.cartLink} to='/cart'>
        Корзина
        <div className={styles.cartIcon}></div>
        {totalQty !== 0 && (
          <span className={styles.qtyLabel + ' ' + (false ? styles.qtyLabelActive : '')}>
            {totalQty}
          </span>
        )}
      </Link>
      <div className={styles.popup + ' ' + (popupOpened ? '' : styles.popupHidden)}>
        <ul className={styles.cartItems}>
          {items.map((item) => (
            <CartWidgetItem {...item} key={item.cartId} />
          ))}
        </ul>
        <button onClick={() => navigate('/cart')} className={styles.cartBtn}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default CartWidget;
