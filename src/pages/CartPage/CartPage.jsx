import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import {
  clearRemovedBuffer,
  replaceMarkedRemove,
  restoreRemoved,
} from '../../redux/slices/cartSlice';
import { groupDigits } from '../../utills/utills';
import styles from './CartPage.module.scss';

function CartPage() {
  const { items, totalQty, totalCost, removedBuffer, markedRemove } = useSelector(
    (state) => state.cart,
  );
  const [checkboxActive, setCheckboxActive] = useState(false);
  const dispatch = useDispatch();

  const toggleChechbox = () => {
    setCheckboxActive((v) => !v);
  };

  useEffect(() => {
    if (checkboxActive) {
      dispatch(replaceMarkedRemove(items.map(({ cartId }) => cartId)));
    } else {
      dispatch(replaceMarkedRemove([]));
    }
  }, [checkboxActive]);

  const onRestoreRemoved = () => {
    if (removedBuffer.length) {
      dispatch(restoreRemoved());
    }
  };

  const onClearBuffer = () => {
    if (removedBuffer.length) {
      dispatch(clearRemovedBuffer());
    }
  };

  const onRemove = () => {};

  const resolveItemChecked = (cartId) => markedRemove.includes(cartId);

  useEffect(() => onClearBuffer(), []);

  const removedWidgetText =
    removedBuffer.length === 1
      ? `Удален товар: ${removedBuffer[0].title}`
      : `Удалено товаров: ${removedBuffer.reduce((total, { qty }) => total + qty, 0)}`;

  return (
    <main className={styles.cartPage}>
      <Link to='/'>Вернуться на главную</Link>
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.cart}>
        <section className={styles.items}>
          {removedBuffer.length > 0 && (
            <div className={styles.removedWidget}>
              <img
                className={styles.removedImage}
                src={removedBuffer[removedBuffer.length - 1].image}
                alt='удаленный товар'
              />
              <div className={styles.removedTextWrapper}>
                <p className={styles.removedText}>{removedWidgetText}</p>
                <button onClick={onRestoreRemoved} className={styles.cancelRemoveBtn}>
                  Отменить
                </button>
              </div>
              <button onClick={onClearBuffer}>Х</button>
            </div>
          )}
          <div className={styles.selectWidget}>
            <label>
              <input
                name='checkbox-all'
                type='checkbox'
                onChange={toggleChechbox}
                checked={checkboxActive}
                className={styles.checkbox}
              />
              Выбрать все
            </label>
            <button onClick={onRemove} type='button'>
              Удалить выбранные
            </button>
          </div>
          <ul className={styles.list}>
            {items.map((item) => (
              <CartItem item={item} key={item.cartId} checked={resolveItemChecked(item.cartId)} />
            ))}
          </ul>
        </section>
        <section className={styles.totals}>
          <h3>Детали заказа</h3>
          <span>Всего {totalQty} товаров</span>
          <span className={styles.totalCost}>Итого: {groupDigits(totalCost)} $</span>
          <button className={styles.purchaseBtn}>Перейти к оформлению</button>
        </section>
      </div>

      <div className={styles.mock}>Здесь будет ваша реклама</div>
    </main>
  );
}

export default CartPage;
