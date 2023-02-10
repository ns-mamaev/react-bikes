import { useDispatch } from 'react-redux';
import { decreaseItemQty, increaseItemQty } from '../../redux/slices/cartSlice';
import { groupDigits } from '../../utills/utills';
import styles from './CartItem.module.scss';

function CartItem({ title, image, qty, cartId, price, options: { color, size }, checkedAll }) {
  const dispatch = useDispatch();
  const cost = groupDigits(price * qty);

  return (
    <li className={styles.cartItem}>
      <div className={styles.description}>
        <p className={styles.title}>{title}</p>
        <span className={styles.color} style={{ background: color }}></span>
        <span className={styles.size}>{size}</span>
      </div>
      <input className={styles.checkbox} type='checkbox' />
      <img className={styles.itemImage} src={image} alt={title} />
      <div className={styles.actions}>
        <button className={styles.qtyButton} onClick={() => dispatch(increaseItemQty(cartId))}>
          +
        </button>
        <span className={styles.qty}>{qty}</span>
        <button className={styles.qtyButton} onClick={() => dispatch(decreaseItemQty(cartId))}>
          -
        </button>
        <button className={styles.textButton} type='button'>
          Удалить
        </button>
      </div>
      <span className={styles.cost}>{cost} $</span>
    </li>
  );
}

export default CartItem;
