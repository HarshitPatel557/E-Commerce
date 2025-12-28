import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
    if (debouncedValue) {
      navigate(`/?search=${debouncedValue}`);
    } else {
      navigate(`/`);
    }
  }, [debouncedValue, navigate]);


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
    <nav className="bg-linear-to-r from-teal-100 via-cyan-100 to-emerald-100 px-10 py-5 flex justify-between items-center rounded-b-3xl shadow-md">
      <Link to="/" className="text-3xl font-bold text-teal-900">
        ShopCircle
      </Link>

      {/* <form
        onSubmit={handleSearch}
        className="flex items-center bg-white border border-emerald-300 shadow-sm rounded-xl px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent px-3 py-1 focus:outline-none text-teal-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}

              {/* Search Bar */}
      <div className="flex items-center bg-white border border-emerald-300 shadow-sm rounded-xl px-4 py-2">
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent px-3 py-1 focus:outline-none text-teal-900"
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            onClick={clearSearch}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        )}

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg hover:bg-emerald-700 transition"
        >
          Search
        </button>
      </div>  
        {/* <button className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg hover:bg-emerald-700 transition">
          Search
        </button>
      </form> */}

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
