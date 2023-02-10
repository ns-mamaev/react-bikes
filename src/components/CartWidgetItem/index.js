import { useDispatch } from 'react-redux';
import { decreaseItemQty, deleteItems, increaseItemQty } from '../../redux/slices/cartSlice';
import { createTitle } from '../../utills/utills';
import styles from './CartWidgetItem.module.scss';

function CartWidgetItem({ title, options, image, qty, cartId }) {
  const dispatch = useDispatch();
  
  const onDeleteItem = (id) => {
    console.log('clk');
    dispatch(deleteItems(id));
  };

  return (
    <li className={styles.cartItem}>
      <p className={styles.itemTitle}>{createTitle(title, options, ' | ')}</p>
      <img className={styles.itemImage} src={image} alt={title} />
      {qty > 1 && <span className={styles.qtyLabel}>x{qty}</span>}
      <button onClick={() => dispatch(increaseItemQty(cartId))}>+</button>
      <button onClick={() => dispatch(decreaseItemQty(cartId))}>-</button>
      <button onClick={() => onDeleteItem(cartId)} className={styles.removeItem}></button>
    </li>
  );
}

export default CartWidgetItem;