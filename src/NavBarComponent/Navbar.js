// Navbar.js
import React from "react";
import "../Styles/Styles.css";

const Navbar = () => {
  return (
    <nav className="navStles">
      <div className="navLinks">
        <a href="#">Home</a>
      </div>
      <div className="navLinks">
        <a href="#">Products</a>
      </div>
      <div className="navLinks">
        <a href="#">About</a>
      </div>
      <div className="navLinks">
        <a href="#">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
