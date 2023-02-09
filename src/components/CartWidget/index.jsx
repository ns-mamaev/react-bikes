import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteItems } from '../../redux/slices/cartSlice';
import { createTitle } from '../../utills/utills';
import styles from './CartWidget.module.scss';

function CartWidget() {
  const navigate = useNavigate();
  const [popupOpened, setPopupOpened] = useState(false);
  const timerRef = useRef(null);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalQty = items.reduce((acc, { qty }) => acc + qty, 0);

  const onShowPopup = () => {
    if (!totalQty) {
      return;
    }
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

  const onDeleteItem = (id) => {
    console.log('clk');
    dispatch(deleteItems(id));
  };

  return (
    <div className={styles.cartWidget} onMouseEnter={onShowPopup} onMouseLeave={onHidePopup}>
      <Link title='В корзину' className={styles.cartLink} to='/cart'>
        Корзина
        <div className={styles.cartIcon}></div>
        {totalQty ? (
          <span className={styles.qtyLabel + ' ' + styles.totalQty}>{totalQty}</span>
        ) : null}
      </Link>
      <div className={styles.popup + ' ' + (popupOpened ? '' : styles.popupHidden)}>
        <ul className={styles.cartItems}>
          {items.map(({ options, image, title, cartId, qty }) => (
            <li key={cartId} className={styles.cartItem}>
              <p className={styles.itemTitle}>{createTitle(title, options, ' | ')}</p>
              <img className={styles.itemImage} src={image} alt={title} />
              {qty > 1 && <span className={styles.qtyLabel + ' ' + styles.itemQty}>x{qty}</span>}
              <button onClick={() => onDeleteItem(cartId)} className={styles.removeItem}></button>
            </li>
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
