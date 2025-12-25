import React, { useEffect, useState } from 'react'

const ProductList = () => {
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err)) 
  },[])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image_url || "https://via.placeholder.com/300"}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />

            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-lg font-semibold text-green-600">
                ₹{product.price}
              </span>

              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;