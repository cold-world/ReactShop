import React, { Dispatch, useContext } from 'react';
import CartIcon from '../../cart/CartIcon';
import styles from './Header.module.css';
import { CartContext } from '../../../context/cart-context';

type HeaderProps = {
  setIsModal: Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsModal }: HeaderProps) => {
  const { products } = useContext(CartContext);
  const numberOfCartItems = products.reduce((acc, item) => acc + item.amount, 0);
  return (
    <header className={styles.header}>
      <h1>ReactShop</h1>
      <button
        disabled={products.length === 0 ? true : false}
        onClick={() => setIsModal((prev) => !prev)}
        className={styles.button}
      >
        <span>
          <CartIcon />
        </span>
        <span>Your cart</span>
        <span className={styles.amount}>{numberOfCartItems}</span>
      </button>
    </header>
  );
};

export default Header;
