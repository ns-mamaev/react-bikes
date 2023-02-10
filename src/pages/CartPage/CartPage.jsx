import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { groupDigits } from '../../utills/utills';
import styles from './CartPage.module.scss';

function CartPage() {
  const { items, totalQty, totalCost } = useSelector((state) => state.cart);
  const [checkboxActive, setCheckboxActive] = useState(false);

  const toggleChechbox = () => {
    console.log('check');
    setCheckboxActive((v) => !v);
  };

  return (
    <>
      <Link to='/'>Вернуться на главную</Link>
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.cart}>
        <section className={styles.items}>
          <div className={styles.select}>
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
            <button type='button'>Удалить выбранные</button>
          </div>
          <ul className={styles.list}>
            {items.map((item) => (
              <CartItem {...item} key={item.cartId} checkedAll={checkboxActive} />
            ))}
          </ul>
        </section>
        <section className={styles.totals}>
          <h3>Детали заказа</h3>
          <span>Всего {totalQty} товаров</span>
          <span>Итого: {groupDigits(totalCost)} $</span>
          <button className={styles.purchaseBtn}>Перейти к оформлению</button>
        </section>
      </div>

      <div className={styles.mock}></div>
    </>
  );
}

export default CartPage;
