import React, { useContext, useState } from 'react';
import Card from '../ui/Card/Card';
import Button from '../ui/Button/Button';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import { CartContext, Product } from '../../context/cart-context';
import CartForm from './CartForm';
import CartSuccess from './CartSuccess';

type CartProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ setIsModal }: CartProps) => {
  const { products, totalAmount, addItem, removeItem } = useContext(CartContext);
  const [isOrder, setIsOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updatedTotalAmount = `$${totalAmount.toFixed(2)}`;

  const cartItemAddHandler = (product: Product) => {
    addItem?.({ ...product, amount: 1 });
  };

  const removeItemHandler = (product: Product) => {
    removeItem?.(product);
  };

  const closeByBackdrop = (e: any) => {
    if (e.target.className === '_backdrop_1evda_1') {
      setIsModal(false);
    }
  };

  const cartActions = (
    <div className={styles.buttonsBottom}>
      <Button onClick={() => setIsModal(false)} title='Close' isTransparent={true} />
      <Button onClick={() => setIsOrder(true)} title='Order' />
    </div>
  );

  if (isSuccess) {
    return (
      <div onClick={closeByBackdrop} className={styles.backdrop}>
        <Card className={styles.cart}>
          <CartSuccess />
          <Button title='Close' onClick={() => setIsModal(false)} />
        </Card>
      </div>
    );
  }

  return (
    <div onClick={closeByBackdrop} className={styles.backdrop}>
      <Card className={styles.cart}>
        <ul>
          {products?.map((item) => (
            <CartItem
              key={item.id + 100}
              product={item}
              removeItem={removeItemHandler}
              addItem={cartItemAddHandler}
            />
          ))}
        </ul>
        <div className={styles.cartBottom}>
          <p>Total Amount</p>
          <div className={styles.totalPrice}>
            <p>{updatedTotalAmount}</p>
            {!isOrder && cartActions}
          </div>
        </div>
        {isOrder && <CartForm setIsSuccess={setIsSuccess} closeModal={() => setIsModal(false)} />}
      </Card>
    </div>
  );
};

export default Cart;
