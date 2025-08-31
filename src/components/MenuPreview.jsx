import React from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.js";

export default function MenuPreview() {
  // Show only first 3 recipes for preview
  const previewRecipes = recipes.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Special Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our authentic Mediterranean dishes, crafted with love and
            the finest ingredients
          </p>
        </div>

        {/* Menu Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full font-bold text-sm shadow-lg">
                  ${recipe.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {recipe.description}
                </p>

                {/* Order Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center">
          <Link
            to="/menu"
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            View Full Menu
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
