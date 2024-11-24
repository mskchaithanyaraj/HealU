import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import healuHealthMatters from "../../assets/heart.png";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <nav className="navbar-container">
      <h2 className="healu-name">
        <Link className="cancel-link-styling" to="/">
          <img
            src={healuHealthMatters}
            alt="HealU"
            className="small-heart-icon"
          />{" "}
          HealU
        </Link>
      </h2>

      {/* Toggler Icon for Mobile */}
      <div className="menu-toggle-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Items */}
      <ul className={`navbar-items ${menuOpen ? "show-menu" : ""}`}>
        <li>
          <Link to="/" className="navbar-link-item" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/meal-planner"
            className="navbar-link-item"
            onClick={toggleMenu}
          >
            Meal Planner
          </Link>
        </li>
        <li>
          <Link
            to="/how-to-use"
            className="navbar-link-item"
            onClick={toggleMenu}
          >
            How to Use?
          </Link>
        </li>
        <li>
          <Link
            to="/bmi-calculator"
            className="navbar-link-item"
            onClick={toggleMenu}
          >
            Calculate BMI
          </Link>
        </li>
        <li>
          <Link
            to="/feedback"
            className="navbar-link-item"
            onClick={toggleMenu}
          >
            Feedback
          </Link>
        </li>
        <li>
          <button
            className="navbar-link-item logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
