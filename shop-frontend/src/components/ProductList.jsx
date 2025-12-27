import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err)) 
  },[])

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative p-5 rounded-3xl bg-white shadow-md border border-teal-100 
                      hover:shadow-emerald-200 hover:-translate-y-2 transition-all duration-300 group"
          >
            {/* Gradient Top Border */}
            {/* <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl 
                            bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400"></div> */}

            {/* Product Image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={product.image_url || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="h-48 w-full object-cover rounded-2xl transform 
                          group-hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Product Title */}
            <h3 className="text-xl font-semibold text-teal-900 mt-3">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-teal-800/70 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>

            {/* Price + Action Row */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-emerald-700">
                ₹{product.price}
              </span>

              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white 
                          px-4 py-2 rounded-xl shadow-md hover:shadow-lg 
                          hover:scale-[1.03] transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;