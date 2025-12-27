import './App.css'
import ProductList from './components/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center">
          Simple E-Commerce
        </h1>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App;
