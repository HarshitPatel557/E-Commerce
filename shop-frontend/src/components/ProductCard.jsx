import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-2xl border border-emerald-100 
                 shadow-sm hover:shadow-lg 
                 transition-all duration-300 
                 hover:-translate-y-1 overflow-hidden"
    >
      {/* Image */}
      <div className="relative bg-linear-to-br from-teal-50 to-emerald-50 
                      aspect-square p-3 flex items-center justify-center">
        <img
          src={product.image_url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="max-h-full max-w-full object-contain 
                     group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-1.4">

        {/* Title */}
        <h3 className="text-lg font-semibold text-teal-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-teal-700/70 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-emerald-700">
            ₹{product.price}
          </span>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-linear-to-r from-emerald-500 to-teal-600 
                       text-white text-xs px-3 py-1.5 rounded-lg 
                       hover:scale-105 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
