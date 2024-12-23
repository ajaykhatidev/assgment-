"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/books");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    console.log("Buying now:", product);
    // Add your buy logic here (e.g., navigating to checkout with product details)
  };

  return (
    <div className="mt-4">
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4 hover:shadow-lg transition-shadow"
            >
              <img
                className="w-full h-56 object-cover"
                src={product.imgUrl || "/fallback-image.jpg"} // Custom placeholder
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">Author: {product.author}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  ${product.price}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
