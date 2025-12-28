import './App.css'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { OrbitProgress } from "react-loading-indicators";



function App() {
  
  const [cartCount,setCartCount] = useState(0);
  const [cart,setCart] = useState(null);

  const fetchCartCount=()=>{
    fetch("http://127.0.0.1:8000/api/cart/")
      .then(res=>res.json())
      .then(data=>{
        setCartCount(data.items.length)
        setCart(data)
      });
  };

  

  useEffect(()=>{
    fetchCartCount();
  },[])

  if (!cart) return <p><OrbitProgress variant="dotted" dense color="#6de9a4" size="medium" text="" textColor="" /></p>

  const total = (cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )).toFixed(2);

  
  return (
    <>
      <div className="bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <Navbar cartCount={ cartCount } />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<ProductList refreshCart={fetchCartCount} />} />
            <Route path="/product/:id" element={<ProductDetail refreshCart={fetchCartCount} />} />
            <Route path="/cart" element={<Cart refreshCart={fetchCartCount} cart={cart} total={total}/>} />
            <Route path="/checkout" element={<Checkout total={total} />} />
            <Route path="/order-success/:id" element={<OrderSuccess total={total} />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App;
