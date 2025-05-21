import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import healuHealthMatters from "../../assets/heart.png";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/"; // Redirect to home page after logout
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img
              src={healuHealthMatters || "/placeholder.svg"}
              alt="HealU"
              className="logo-icon"
            />
            <span className="logo-text">HealU</span>
          </Link>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="menu-icon" />
          ) : (
            <FaBars className="menu-icon" />
          )}
        </div>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/meal-planner" className="nav-link" onClick={closeMenu}>
                Meal Planner
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/how-to-use" className="nav-link" onClick={closeMenu}>
                How to Use?
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/bmi-calculator"
                className="nav-link"
                onClick={closeMenu}
              >
                Calculate BMI
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link" onClick={closeMenu}>
                Feedback
              </Link>
            </li>
            <li className="nav-item logout-item">
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
