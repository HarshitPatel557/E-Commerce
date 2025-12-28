import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      key={product.id}
      className="relative p-5 rounded-3xl bg-white shadow-md border border-teal-100 
                hover:shadow-emerald-200 hover:-translate-y-2 transition-all duration-300 group"
    >

      {/* Product Image */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={product.image_url || "https://via.placeholder.com/300"}
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

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-2xl font-bold text-emerald-700">
          ₹{product.price}
        </span>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-linear-to-r from-emerald-500 to-teal-600 text-white 
                    px-4 py-2 rounded-xl shadow-md hover:shadow-lg 
                    hover:scale-[1.03] transition-all duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
