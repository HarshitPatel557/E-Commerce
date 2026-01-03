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
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { getToken, removeToken } from "./utils/auth";
import Footer from './components/Footer';
import Register from './pages/Register';
import Profile from "./pages/Profile";



function App() {
  
  const [cartCount,setCartCount] = useState(0);
  const [cart,setCart] = useState(null);

  const fetchCartCount=()=>{
    const token = getToken();
    if (!token) {
      setCartCount(0);
      setCart({ items: [] });  // prevent undefined error
      return;
    }

    fetch("http://127.0.0.1:8000/api/cart/",{
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res=>res.json())
      .then(data=>{
        setCartCount(data.items.length)
        setCart(data)
      });
  };

  
  useEffect(()=>{
    fetchCartCount();
  },[])


  if (!cart) {
  return (
    <div className="flex justify-center mt-10">
      <OrbitProgress variant="dotted" dense color="#6de9a4" size="medium" text="" textColor="" />
    </div>
  );
}

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
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<ProductList refreshCart={fetchCartCount} />} />
            <Route path="/product/:id" element={<ProductDetail refreshCart={fetchCartCount} />} />
            
            <Route path='/profile' element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
            <Route path="/cart" element={ <PrivateRoute> <Cart refreshCart={fetchCartCount} cart={cart} total={total}/> </PrivateRoute> } />
            <Route path="/checkout" element={ <PrivateRoute> <Checkout total={total} /> </PrivateRoute> } />
            <Route path="/order-success/:id" element={ <PrivateRoute> <OrderSuccess total={total} /> </PrivateRoute> } />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App;
