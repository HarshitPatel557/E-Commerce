import './App.css'
import ProductList from './components/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

function App() {

  const [cartCount,setCartCount] = useState(0);

  const fetchCartCount=()=>{
    fetch("http://127.0.0.1:8000/api/cart/")
      .then(res=>res.json())
      .then(data=>setCartCount(data.items.length));
  };

  useEffect(()=>{
    fetchCartCount();
  },[cartCount])
  console.log(cartCount)
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <Navbar cartCount={ cartCount } />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<ProductList refreshCart={fetchCartCount} />} />
          <Route path="/product/:id" element={<ProductDetail refreshCart={fetchCartCount} />} />
          <Route path="/cart" element={<Cart refreshCart={fetchCartCount} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App;
