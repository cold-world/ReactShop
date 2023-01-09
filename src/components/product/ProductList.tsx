import React, { useState, useEffect } from 'react';
import Card from '../ui/Card/Card';
import { IProduct } from './Product.types';
import ProductItem from './ProductItem';
import styles from './ProductList.module.css';

type FetchError = {
  message: string;
  status: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | FetchError>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Something went wrong ' + response.status);
        }
        const data = await response.json();
        setProducts(data);
        setisLoading(false);
      } catch (error: unknown) {
        const fetchError = error as FetchError;
        setError(fetchError);
        setisLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <Card className={styles.productList}>
        {isLoading && <p className={styles.loading}>...Loading...</p>}
        {error && <p className={styles.error}>{error.message}</p>}
        <ul>
          {products?.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default ProductList;
