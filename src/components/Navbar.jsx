import { useState } from "react";
import logo from "../../public/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between sm:px-4 px-5">
      <a href="/">
        <img src={logo} alt="logo image" className="w-25 h-22" />
      </a>
      {/* Mobile navbar */}
      <div className="md:hidden">
        <button onClick={() => toggleMenu()}>{menuOpen ? "X" : "☰"}</button>
      </div>
      {/* === Mobile navbar === */}
      <ul
        className={`flex-col md:flex md:flex-row gap-6 md:gap-3 absolute md:static items-center bg-black/10 md:bg-transparent
        top-16 right-0 p-4 md:p-0 transition-all duration-150  ${
          menuOpen ? "flex w-full" : "hidden"
        }`}
      >
        <li className="p-3 bg-black/20 font-semibold rounded-4xl hover:bg-black/30 cursor-pointer">
          <a href="/">Home</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">About</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">Services</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">Menu</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">Reservations</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">Order Online</a>
        </li>
        <li className="p-3 bg-black/20 rounded-4xl font-semibold hover:bg-black/30 cursor-pointer">
          <a href="/">Login</a>
        </li>
      </ul>
    </nav>
  );
}
