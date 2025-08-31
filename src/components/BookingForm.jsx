import React, { useState } from "react";

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    occasion: "",
  });

  const [errors, setErrors] = useState({});

  // Fallback times if availableTimes is not provided
  const defaultTimes = [
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
  ];

  // Use availableTimes if provided, otherwise use default times
  const timeOptions =
    availableTimes && availableTimes.length > 0 ? availableTimes : defaultTimes;

  const occasions = [
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
    { value: "business", label: "Business Meeting" },
    { value: "celebration", label: "Celebration" },
    { value: "other", label: "Other" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    if (!formData.guests || formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = "Please enter a valid number of guests (1-10)";
    }

    if (!formData.occasion) {
      newErrors.occasion = "Please select an occasion";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Dispatch date changes for available times
    if (field === "date" && dispatch) {
      dispatch({ type: "UPDATE_TIMES", payload: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (submitForm) {
        await submitForm(formData);
      }

      // Reset form after successful submission
      setFormData({
        date: "",
        time: "",
        guests: "",
        occasion: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Booking submission failed:", error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Reserve Your Table
          </h2>
          <p className="text-gray-600">
            Experience the finest dining at Little Lemon
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={getCurrentDate()}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time *
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="">Select a time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Guests *
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="1-10 guests"
            />
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
            )}
          </div>

          {/* Occasion Selection */}
          <div className="space-y-2">
            <label
              htmlFor="occasion"
              className="block text-sm font-medium text-gray-700"
            >
              Occasion *
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={(e) => handleInputChange("occasion", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="">Select an occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion.value} value={occasion.value}>
                  {occasion.label}
                </option>
              ))}
            </select>
            {errors.occasion && (
              <p className="text-red-500 text-sm mt-1">{errors.occasion}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transform hover:scale-105 transition-all duration-200"
            >
              Reserve Your Table
            </button>
          </div>
        </form>

        {/* Additional Information */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            Reservation Policy
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Reservations can be made up to 30 days in advance</li>
            <li>• Cancellations must be made at least 24 hours before</li>
            <li>• Maximum party size is 10 guests</li>
            <li>• We hold tables for 15 minutes past reservation time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
