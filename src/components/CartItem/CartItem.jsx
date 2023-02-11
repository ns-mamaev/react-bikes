import { useDispatch } from 'react-redux';
import {
  addToRemovedBuffer,
  decreaseItemQty,
  deleteItems,
  increaseItemQty,
  markRemove,
  unmarkRemove,
} from '../../redux/slices/cartSlice';
import { groupDigits } from '../../utills/utills';
import styles from './CartItem.module.scss';

function CartItem({ item, checked }) {
  const {
    title,
    image,
    qty,
    cartId,
    price,
    options: { color, size },
  } = item;
  const dispatch = useDispatch();
  const cost = groupDigits(price * qty);

  const onToggleCheckbox = () => {
    if (checked) {
      dispatch(unmarkRemove(cartId));
    } else {
      dispatch(markRemove(cartId));
    }
  };

  const onInrease = () => {
    dispatch(increaseItemQty(cartId));
  };

  const onDecrease = () => {
    dispatch(decreaseItemQty(cartId));
  };

  const onRemove = () => {
    dispatch(addToRemovedBuffer(cartId));
    dispatch(deleteItems(cartId));
  };

  const increaseDisabled = qty < 2;

  return (
    <li className={styles.cartItem}>
      <div className={styles.description}>
        <p className={styles.title}>{title}</p>
        <span className={styles.color} style={{ background: color }}></span>
        <span className={styles.size}>{size}</span>
      </div>
      <input
        onChange={onToggleCheckbox}
        checked={checked}
        className={styles.checkbox}
        type='checkbox'
      />
      <img className={styles.itemImage} src={image} alt={title} />
      <div className={styles.actions}>
        <button disabled={increaseDisabled} className={styles.qtyButton} onClick={onDecrease}>
          -
        </button>
        <span className={styles.qty}>{qty}</span>
        <button className={styles.qtyButton} onClick={onInrease}>
          +
        </button>
        <button onClick={onRemove} className={styles.textButton} type='button'>
          Удалить
        </button>
      </div>
      <span className={styles.cost}>{cost} $</span>
    </li>
  );
}

export default CartItem;
