import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";

const ProductDetail = ({ refreshCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`http://127.0.0.1:8000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20 text-teal-700">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-teal-700 hover:text-emerald-600 transition"
      >
        ← Back to products
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Image */}
          <div className="bg-linear-to-br from-teal-50 to-emerald-50 
                          rounded-2xl p-6 flex items-center justify-center">
            <img
              src={product.image_url || "https://via.placeholder.com/400"}
              alt={product.name}
              className="max-h-105 object-contain 
                         hover:scale-105 transition"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">

            <h1 className="text-3xl font-bold text-teal-900 mb-3">
              {product.name}
            </h1>

            <p className="text-teal-700/80 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Category */}
            <span className="inline-block text-xs font-semibold 
                             bg-emerald-100 text-emerald-700 
                             px-3 py-1 rounded-full mb-4 w-fit">
              {product.category.name}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              ⭐⭐⭐⭐⭐
              <span className="text-sm text-teal-700">(4.8)</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-emerald-700 mb-6">
              ₹{product.price}
            </p>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">

              <button
                onClick={async () => {
                  const res = await apiFetch("/api/cart/add/", {
                    method: "POST",
                    body: JSON.stringify({ product_id: product.id }),
                  });
                  if (!res || !res.ok) {
                    alert("Please login again");
                    // navigate('/login')
                    return;
                  }
                  refreshCart();
                  alert("Added to cart");
                }}
                className="flex-1 bg-linear-to-r from-emerald-500 to-teal-600 
                           text-white py-3 rounded-xl font-semibold 
                           hover:scale-[1.03] transition shadow-md"
              >
                Add to Cart 🛒
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="flex-1 border border-emerald-300 
                           text-emerald-700 py-3 rounded-xl font-semibold 
                           hover:bg-emerald-50 transition"
              >
                Buy Now ⚡
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12 bg-teal-50 rounded-2xl p-6 border border-teal-100">
        <h3 className="text-2xl font-bold text-teal-900 mb-4">
          Customer Reviews
        </h3>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="font-semibold text-teal-900">Amit Sharma</p>
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
            <p className="text-teal-700 mt-1">
              Amazing quality, totally worth the price!
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="font-semibold text-teal-900">Priya Patel</p>
            <div className="text-yellow-500">⭐⭐⭐⭐</div>
            <p className="text-teal-700 mt-1">
              Loved it! Fast delivery as well.
            </p>
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-6">
          <textarea
            rows="3"
            placeholder="Write your review..."
            className="w-full p-3 rounded-xl border 
                       border-teal-200 focus:ring-2 
                       focus:ring-emerald-300 outline-none"
          />
          <button className="mt-3 bg-linear-to-r from-emerald-500 to-teal-600 
                             text-white px-6 py-2 rounded-xl shadow 
                             hover:scale-105 transition">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
