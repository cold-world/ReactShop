import { Product } from './cart-context';

export interface ICartContext {
  products: Product[];
  totalAmount: number;
  addItem?: (product: Product) => void;
  removeItem?: (product: Product) => void;
}

interface Action {
  payload: Product;
  type: 'ADD' | 'REMOVE';
}

const initialState: ICartContext = {
  products: [],
  totalAmount: 0,
};

export const cartReducer = (state: ICartContext, action: Action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

    const existingCartProductIndex = state.products.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartProduct = state.products[existingCartProductIndex];

    let updatedProducts;

    if (existingCartProduct) {
      const updatedProduct = {
        ...existingCartProduct,
        amount: existingCartProduct.amount + action.payload.amount,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingCartProductIndex] = updatedProduct;
    } else {
      updatedProducts = state.products.concat(action.payload);
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingProductIndex = state.products.findIndex((item) => item.id === action.payload.id);
    const existingProduct = state.products[existingProductIndex];
    const updatedTotalAmount = state.totalAmount - existingProduct.price;

    let updatedProducts;
    if (existingProduct.amount === 1) {
      updatedProducts = state.products.filter((item) => item.id !== action.payload.id);
    } else {
      const updatedProduct = { ...existingProduct, amount: existingProduct.amount - 1 };
      updatedProducts = [...state.products];
      updatedProducts[existingProductIndex] = updatedProduct;
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }

  return initialState;
};
