import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = ({refreshCart}) => {

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
    <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-teal-100 mt-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-teal-700 font-medium hover:text-emerald-600 transition flex items-center gap-1 mb-6"
      >
        ← Back
      </button>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src={product.image_url || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">

          <div>
            {/* Name */}
            <h2 className="text-3xl font-bold text-teal-900 mb-3">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-teal-800/80 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <p className="text-3xl font-semibold text-emerald-700 mb-4">
              ₹{product.price}
            </p>

            {/* Category */}
            <p className="text-sm text-teal-700 mb-6">
              <span className="font-semibold">Category:</span> {product.category.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              ⭐⭐⭐⭐⭐
              <span className="text-sm text-teal-700">(4.8 / 5)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-4">

            {/* Add to Cart */}
            <button
              onClick={() => {
                fetch("http://127.0.0.1:8000/api/cart/add/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ product_id: product.id })
                }).then(() => {
                  refreshCart();
                  alert("Added to cart");
                });
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 
                        text-white px-6 py-3 rounded-xl font-semibold 
                        hover:scale-[1.03] transition shadow-md hover:shadow-lg"
            >
              Add to Cart 🛒
            </button>

            {/* Buy Now */}
            <button
              onClick={() => navigate("/checkout")}
              className="bg-white text-emerald-700 border border-emerald-300 
                        px-6 py-3 rounded-xl font-semibold 
                        hover:bg-emerald-50 transition shadow-md"
            >
              Buy Now ⚡
            </button>

          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-teal-50 p-6 rounded-2xl border border-teal-100">
        <h3 className="text-2xl font-bold text-teal-900 mb-4">Customer Reviews</h3>

        {/* Replace with dynamic reviews later */}
        <div className="space-y-6">

          <div className="p-4 bg-white rounded-xl shadow border border-teal-100">
            <p className="font-semibold text-teal-900">Amit Sharma</p>
            <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
            <p className="text-teal-700 mt-1">Amazing quality, totally worth the price!</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow border border-teal-100">
            <p className="font-semibold text-teal-900">Priya Patel</p>
            <div className="text-yellow-500 text-sm">⭐⭐⭐⭐</div>
            <p className="text-teal-700 mt-1">Loved it! Fast delivery as well.</p>
          </div>

        </div>

        {/* Review Form */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-teal-900 mb-2">Leave a Review</h4>

          <textarea
            className="w-full p-3 border border-teal-200 rounded-xl focus:outline-none 
                      focus:ring-2 focus:ring-emerald-300"
            rows="3"
            placeholder="Write your review..."
          ></textarea>

          <button className="mt-3 bg-gradient-to-r from-emerald-500 to-teal-600 
                            text-white px-6 py-2 rounded-xl shadow hover:scale-[1.02] transition">
            Submit Review
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductDetail;
