import React from 'react';
import { Product } from '../../context/cart-context';
import Button from '../ui/Button/Button';
import styles from './CartItem.module.css';

type CartItemProps = {
  product: Product;
  removeItem: (product: Product) => void;
  addItem: (product: Product) => void;
};

const CartItem = ({ product, addItem, removeItem }: CartItemProps) => {
  return (
    <li className={styles.cartTop}>
      <div className={styles.productInfo}>
        <h4>{product.title}</h4>
        <span>{product.price}</span>
        <span> x{product.amount}</span>
      </div>
      <div className={styles.buttonsTop}>
        <Button onClick={() => removeItem(product)} title='-' isTransparent={true} />
        <Button onClick={() => addItem(product)} title='+' isTransparent={true} />
      </div>
    </li>
  );
};

export default CartItem;
