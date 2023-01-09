import './App.css';
import ProductList from './components/product/ProductList';
import { useState } from 'react';
import Cart from './components/cart/Cart';
import CartContextProvider from './context/cart-context';
import Header from './components/layout/Header/Header';
import Banner from './components/layout/Banner/Banner';
import HomeCard from './components/layout/HomeCard/HomeCard';

function App() {
  const [isModal, setIsModal] = useState(false);
  return (
    <CartContextProvider>
      <div className='App'>
        <Header setIsModal={setIsModal} />
        {isModal && <Cart setIsModal={setIsModal} />}
        <Banner />
        <main>
          <HomeCard />
          <ProductList />
        </main>
      </div>
    </CartContextProvider>
  );
}
export default App;
