"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Import the Navbar component

export default function Home() {
  // State to store products
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/books");
        setProducts(response.data); // Set the products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  console.log(products);

  // Handle delete product
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/books?id=${id}`); // Pass the ID as a query parameter
      setProducts(products.filter((product) => product.id !== id)); // Update the state after deletion
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return (
    <div>
      {/* Render the Navbar */}
      <Navbar />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4"
            >
              <img
                className="w-full h-56 object-cover"
                src={product.imgUrl || "https://via.placeholder.com/150"} // Use placeholder if no image
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Author: {product.author}
                </p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  ${product.price}
                </p>
                <div className="mt-4 flex justify-between">
                  <Link href={`/Edit/${product.id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)} // Call handleDelete with product ID
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
