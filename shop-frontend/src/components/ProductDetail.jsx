import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product,setProduct] = useState(null);

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  },[id]);
  if (!product){
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image_url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />

        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-xl font-semibold text-green-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Category: {product.category.name}
          </p>

          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
