import React from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.js";

export default function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our Special Menu
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our authentic Mediterranean dishes, crafted with love and the
          finest ingredients
        </p>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
                  ${recipe.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {recipe.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                    Order Now
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Hungry for More?
            </h2>
            <p className="text-gray-600 mb-6">
              Experience the full Little Lemon dining experience by making a
              reservation
            </p>
            <Link
              to="/booking"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Reserve Your Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
