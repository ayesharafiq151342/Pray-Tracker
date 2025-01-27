import React from "react";

// Example Product Data (Replace with your dynamic data or API call)
const product = {
  name: "Amazing Product",
  price: 99.99,
  description: "This is a great product that you will love! It has amazing features and comes with a warranty.",
  imageUrl: "https://example.com/path/to/product-image.jpg", };

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">{product.name}</h2>
            <p className="text-xl text-gray-700 mb-4">Price: <span className="font-bold text-green-600">${product.price}</span></p>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>

            {/* Call to Action Button */}
            <button className="w-full md:w-1/2 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
