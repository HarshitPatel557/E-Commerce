// CSS
import './App.css'
import { OrbitProgress } from "react-loading-indicators";

// React
import { Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// utils
import { apiFetch } from "./utils/api";
import { getAccessToken } from "./utils/auth";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from "./components/PrivateRoute";

// Pages
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from "./pages/Login";
import Register from './pages/Register';
import Profile from "./pages/Profile";


// App component
function App() {
  
  const [cartCount,setCartCount] = useState(0);     // no. of items in cart
  const [cart,setCart] = useState(null);

  const fetchCartCount = async () => {
    const token = getAccessToken();

    // User not logged in
    if (!token) {
      setCartCount(0);
      setCart({ items: [] });
      return;
    }

    const res = await apiFetch("/api/cart/");

    if (!res || !res.ok) {
      setCartCount(0);
      setCart({ items: [] });
      return;
    }

    const data = await res.json();
    setCartCount(data.items.length);
    setCart(data);
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  // if cart not present loading...
  if (!cart) {
  return (
    <div className="flex justify-center mt-10">
      <OrbitProgress variant="dotted" dense color="#6de9a4" size="medium" text="" textColor="" />
    </div>
  );
  }

  // Total Price = (price*quentity) of all cart items
  const total = (cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )).toFixed(2);

  
  return (
    <>
      <div className="bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50">

        <Navbar cartCount = { cartCount } />

        <main className="p-6">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<ProductList refreshCart={fetchCartCount} />} />
            <Route path="/product/:id" element={<ProductDetail refreshCart={fetchCartCount} />} />
            
            {/* Private Routes*/}
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
