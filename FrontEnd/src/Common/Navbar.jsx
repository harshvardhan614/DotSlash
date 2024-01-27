import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg" ;
import './common.css'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="navColor">
      <nav className="navbar myContainer">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/interview" onClick={closeMobileMenu}>
            Interview
          </Link>         
          <Link to="/contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </div>
        <div
          className={`mobile-menu-icon ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;