import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({cartCount}) => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-100 via-cyan-100 to-emerald-100 px-10 py-5 flex justify-between items-center rounded-b-3xl shadow-md">
      <Link to="/" className="text-3xl font-bold text-teal-900">
        ShopCircle
      </Link>

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white border border-emerald-300 shadow-sm rounded-xl px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent px-3 py-1 focus:outline-none text-teal-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg hover:bg-emerald-700 transition">
          Search
        </button>
      </form>

      <div className="flex items-center gap-8 text-teal-900 font-semibold">
        <Link to="/" className="hover:text-emerald-700 transition">Products</Link>
        <Link to="/cart" className="relative hover:text-emerald-700 transition">
          Cart 🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>



  )
}

export default Navbar
