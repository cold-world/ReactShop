import { createContext, ReactNode, useReducer } from 'react';
import { IProduct } from '../components/product/Product.types';
import { cartReducer } from './cart-reducer';
import { ICartContext } from './cart-reducer';
type CartContextProviderProps = {
  children: ReactNode;
};

export interface Product extends IProduct {
  amount: number;
}

const initialState: ICartContext = {
  products: [],
  totalAmount: 0,
};

export const CartContext = createContext<ICartContext>(initialState);

const CartContextProvider = ({ children }: CartContextProviderProps): JSX.Element => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (product: Product) => {
    dispatchCartAction({ type: 'ADD', payload: product });
  };

  const removeItemHandler = (product: Product) => {
    dispatchCartAction({ type: 'REMOVE', payload: product });
  };

  const cartContext: ICartContext = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
