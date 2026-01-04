import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from "../utils/auth";


const Navbar = ({cartCount}) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const initialSearch = new URLSearchParams(location.search).get("search") || "";
  
  const [query, setQuery] = useState(initialSearch);
  const [debouncedValue, setDebouncedValue] =useState(initialSearch)
  
  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query.trim());
    }, 300); // 300ms debounce time

    return () => clearTimeout(handler);
  }, [query]);

  // Auto-search when debounced value updates
  useEffect(() => {
    if (location.pathname !== "/") return; // 🔥 block redirect on other pages

    if (debouncedValue) {
      navigate(`/?search=${debouncedValue}`);
    } else {
      navigate(`/`);
    }
  }, [debouncedValue, navigate, location.pathname]);

  const handleSearch = () => {
    const trimmed = query.trim();
    // If empty → go to homepage without query
    if (!trimmed) return navigate("/");
    navigate(`/?search=${trimmed}`);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setQuery("");
    navigate("/");
  };


  return (
    <nav className="bg-linear-to-r from-teal-100 via-cyan-100 to-emerald-100 
                px-10 py-4 flex items-center justify-between 
                rounded-b-3xl shadow-md">

  {/* Left: Logo */}
  <Link 
    to="/" 
    className="text-3xl font-bold text-teal-900 tracking-wide"
  >
    ShopCircle
  </Link>

  {/* Center: Search Bar */}
  <div className="flex items-center bg-white border border-emerald-300 
                  shadow-sm rounded-full px-4 py-2 w-[420px]">

    <input
      type="text"
      value={query}
      placeholder="Search products..."
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyPress}
      className="flex-1 bg-transparent px-3 py-1 
                 focus:outline-none text-teal-900"
    />

    {query.length > 0 && (
      <button
        onClick={clearSearch}
        className="text-gray-400 hover:text-gray-600 mx-2"
      >
        ✕
      </button>
    )}

    <button
      onClick={handleSearch}
      className="bg-emerald-600 text-white 
                 px-4 py-1.5 rounded-full 
                 hover:bg-emerald-700 transition"
    >
      Search
    </button>
  </div>

  {/* Right: Navigation + Auth */}
  <div className="flex items-center gap-6 text-teal-900 font-semibold">

    <Link to="/" className="hover:text-emerald-700 transition">
      Products
    </Link>

    <Link to="/about" className="hover:text-emerald-700 transition">
      About
    </Link>

    <Link to="/cart" className="relative hover:text-emerald-700 transition">
      🛒
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-3 
                         bg-emerald-600 text-white 
                         text-xs px-2 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>

    {isAuthenticated() ? (
      <>
        {/* Profile Avatar (Circle) */}
        <Link to="/profile">
          <div className="w-10 h-10 rounded-full 
                          bg-emerald-500 text-white 
                          flex items-center justify-center 
                          font-bold shadow-md 
                          hover:scale-105 transition">
            U
          </div>
        </Link>

        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="bg-linear-to-r from-pink-200 to-red-100 
                     text-red-600 px-4 py-2 rounded-xl 
                     shadow-md hover:shadow-lg 
                     hover:scale-105 transition-all"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/login"
        className="bg-linear-to-r from-emerald-500 to-teal-300 
                   text-white px-5 py-2 rounded-xl 
                   shadow-md hover:shadow-lg 
                   hover:scale-105 transition-all"
      >
        Login
      </Link>
    )}
  </div>
</nav>

  )
}

export default Navbar
