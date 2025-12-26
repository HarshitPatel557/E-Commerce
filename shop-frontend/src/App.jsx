import './App.css'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart';
import { Router,Routes,Route } from 'react-router-dom';

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
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App;
