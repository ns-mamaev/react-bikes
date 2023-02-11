import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import {
  clearRemovedBuffer,
  deleteCheckedWithBuffer,
  restoreRemoved,
  toggleAllChecked,
} from '../../redux/slices/cartSlice';
import { groupDigits } from '../../utills/utills';
import styles from './CartPage.module.scss';

function CartPage() {
  const { items, removedBuffer } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const checkboxActive = items.every(({ checked }) => checked);
  const { allQty, checkedQty, totalCost } = items.reduce(
    (acc, { qty, price, checked }) => {
      if (checked) {
        acc.checkedQty += qty;
        acc.totalCost += price * qty;
      }
      acc.allQty += qty;
      return acc;
    },
    { allQty: 0, checkedQty: 0, totalCost: 0 },
  );

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

  const onRemove = () => {
    dispatch(deleteCheckedWithBuffer());
  };

  const onToggleCheckbox = () => {
    dispatch(toggleAllChecked(!checkboxActive));
  };

  useEffect(() => onClearBuffer(), []);

  const removedWidgetText =
    removedBuffer.length === 1
      ? `Удален товар: ${removedBuffer[0].title}`
      : `Удалено товаров: ${removedBuffer.reduce((total, { qty }) => total + qty, 0)}`;

  const onPurchase = () => {
    alert(`А тебе не жирно будет ${checkedQty} шт. на ${totalCost}$ ???`);
  };

  return (
    <main className={styles.cartPage}>
      <h1 className={styles.title}>Корзина</h1>
      <span className={styles.qty}>{allQty}</span>
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
                  Восстановить
                </button>
              </div>
              <button onClick={onClearBuffer}>Х</button>
            </div>
          )}
          {allQty > 0 ? (
            <>
              {items.length > 0 && (
                <div className={styles.selectWidget}>
                  <label>
                    <input
                      name='checkbox-all'
                      type='checkbox'
                      onChange={onToggleCheckbox}
                      checked={checkboxActive}
                      className={styles.checkbox}
                    />
                    Выбрать все
                  </label>
                  {checkedQty > 0 && (
                    <button onClick={onRemove} type='button'>
                      Удалить выбранные
                    </button>
                  )}
                </div>
              )}
              <ul className={styles.list}>
                {items.map((item) => (
                  <CartItem item={item} key={item.cartId} />
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className={styles.emptyText}>Корзина пуста, брат, нужно лучше покупать</p>
              <Link to='/'>Назад к покупкам</Link>
            </>
          )}
        </section>
        {allQty > 0 && (
          <section className={styles.totals}>
            <h3>{checkedQty > 0 ? 'Детали заказа' : 'Нет выбранных товаров'}</h3>
            {checkedQty > 0 && (
              <>
                <span>Всего {checkedQty} товаров</span>
                <span className={styles.totalCost}>Итого: {groupDigits(totalCost)} $</span>
              </>
            )}
            <button disabled={!checkedQty} className={styles.purchaseBtn} onClick={onPurchase}>
              Перейти к оформлению
            </button>
          </section>
        )}
      </div>
      <div className={styles.mock}>Здесь будет ваша реклама</div>
    </main>
  );
}

export default CartPage;
