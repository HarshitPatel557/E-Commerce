import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({cartCount}) => {
    console.log(cartCount)
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <i className="fa-brands fa-stumbleupon-circle"> </i>ShopCircle
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-600">
          Products
        </Link>

        <Link to="/cart" className="relative hover:text-blue-600">
          Cart 🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
