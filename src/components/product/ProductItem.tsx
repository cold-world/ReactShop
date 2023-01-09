import React, { FormEvent, useContext, useState } from 'react';
import styles from './ProductItem.module.css';
import { CartContext } from '../../context/cart-context';
import { IProduct } from './Product.types';
import Button from '../ui/Button/Button';

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addItem } = useContext(CartContext);
  const [input, setInput] = useState<number>(1);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const submitItemHandler = (e: FormEvent) => {
    e.preventDefault();
    addItem?.({
      ...product,
      amount: +input,
    });
    setInput(1);
  };
  return (
    <li className={styles.product}>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.description}>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
        <p className={styles.price}>{product.price}$</p>
      </div>
      <form onSubmit={submitItemHandler}>
        <div className={styles.amount}>
          <label htmlFor='amount'>Amount</label>
          <input value={input} onChange={handleChange} min={1} max={10} type='number' id='amount' />
        </div>
        <Button title='+ Add' />
      </form>
    </li>
  );
};

export default ProductItem;
