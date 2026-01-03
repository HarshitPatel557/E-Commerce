import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.trim().toLowerCase() || "";

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Memoized filtering for better performance
  const filtered = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter((item) => {
      const name = item?.name?.toLowerCase() || "";
      const description = item?.description?.toLowerCase() || "";
      const category = item?.category?.name?.toLowerCase() || "";

      return (
        name.includes(searchQuery) ||
        description.includes(searchQuery)  ||
        category.includes(searchQuery)
      );
    });
  }, [searchQuery, products]);


  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">Products {searchQuery && ` - Results for "${searchQuery}"`}</h2> */}

      <HeroSlider />
      {filtered.length ===0 && ( <p className="text-gray-500">No Product Found...</p> )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductList;
