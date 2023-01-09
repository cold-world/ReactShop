import React, { ChangeEvent, useState, useContext, Dispatch } from 'react';
import useInput from '../../hooks/useInput';
import sendRequest, { Config } from '../../utils/send-order';
import Button from '../ui/Button/Button';
import styles from './CartForm.module.css';
import { CartContext } from '../../context/cart-context';

type CartFormProps = {
  closeModal: () => void;
  setIsSuccess: Dispatch<React.SetStateAction<boolean>>;
};

const CartForm = ({ closeModal, setIsSuccess }: CartFormProps) => {
  const nameInput = useInput();
  const surnameInput = useInput();
  const emailInput = useInput();
  const addressInput = useInput();

  const { products, totalAmount } = useContext(CartContext);

  const [isError, setIsError] = useState<string | null>(null);

  const formSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(null);

    const productsToOrder = products.map((item) => {
      return { id: item.id, title: item.title, amount: item.amount };
    });

    const fieldIsValid = (value: string): boolean => value.trim() !== '';

    const formIsValid: boolean =
      fieldIsValid(nameInput.value) &&
      fieldIsValid(surnameInput.value) &&
      fieldIsValid(emailInput.value) &&
      fieldIsValid(addressInput.value);

    const requestData = {
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      address: addressInput.value,
      products: productsToOrder,
      totalAmount: totalAmount.toFixed(2),
    };

    const config: Config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData,
    };

    if (!formIsValid) {
      setIsError('Please fill all fields');
      return;
    }
    try {
      await sendRequest(config);
      setIsSuccess(true);
    } catch (error: any) {
      setIsError(error.message);
      return;
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <p>Checkout</p>
      {isError && <p className={styles.error}>{isError}</p>}
      <input type='text' placeholder='name' {...nameInput.bind} />
      <input type='text' placeholder='surname' {...surnameInput.bind} />
      <input type='email' placeholder='email' {...emailInput.bind} />
      <input type='text' placeholder='address' {...addressInput.bind} />
      <div>
        <Button
          onClick={() => closeModal()}
          className={styles.button}
          title='Cancel'
          isTransparent={true}
        />
        <Button className={styles.button} title='Submit' />
      </div>
    </form>
  );
};

export default CartForm;
