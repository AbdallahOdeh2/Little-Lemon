import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import MenuPreview from "./components/MenuPreview";
import Booking from "./components/Booking";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <MenuPreview />
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </div>
  );
}
