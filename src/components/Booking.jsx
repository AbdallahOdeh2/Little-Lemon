import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";

export default function Booking() {
  // Default available times
  const [availableTimes] = useState([
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ]);

  // Simple dispatch function for date changes
  const dispatch = (action) => {
    if (action.type === "UPDATE_TIMES") {
      // In a real app, this would update available times based on the date
      console.log("Date selected:", action.payload);
    }
  };

  // Simple form submission handler
  const submitForm = (formData) => {
    console.log("Booking submitted:", formData);
    alert("Thank you for your reservation! We'll confirm shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto px-6 mb-6">
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

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Book Your Table
        </h1>
        <p className="text-lg text-gray-600">
          Reserve your spot at Little Lemon
        </p>
      </div>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </div>
  );
}
