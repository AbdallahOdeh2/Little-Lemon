import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#495e57] p-5 md:p-10 mt-5 relative overflow-hidden">
      <section className="flex flex-col md:flex-row items-center md:items-start justify-between relative max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="md:w-1/2 z-10 md:pr-8">
          <h2 className="text-yellow-300 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Little Lemon
          </h2>
          <h3 className="text-lg sm:text-xl font-bold text-white my-4">
            Amman
          </h3>
          <p className="text-lg md:text-xl font-semibold text-gray-300 my-5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link to="/booking">
            <button
              aria-label="On Click"
              className="px-5 py-3 bg-amber-400 rounded-full text-lg font-bold cursor-pointer hover:bg-amber-500 transition-colors duration-200"
            >
              Reserve Table
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src="/assets/restauranfood.jpg"
              alt="Delicious Mediterranean restaurant food"
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-center rounded-2xl shadow-2xl"
            />
            {/* Optional decorative overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>
    </header>
  );
}
