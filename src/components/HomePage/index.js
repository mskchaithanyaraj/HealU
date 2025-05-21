import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6,
      },
    },
  };

  return (
    <>
      <div className="homepage">
        <Navbar />

        <div className="hero-section">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              Welcome to <span className="highlight">HealU</span>
            </motion.h1>

            <motion.p className="hero-description" variants={itemVariants}>
              Your personalized health companion for making informed dietary
              choices based on your location and nutritional needs.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <Link to="/meal-planner" className="primary-button">
                Start Planning
              </Link>
              <Link to="/how-to-use" className="secondary-button">
                Learn How to Use
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="card-content">
              <h2>Personalized Nutrition</h2>
              <p>
                HealU is designed to help you make informed dietary choices by
                providing personalized meal planning based on your location.
                Whether you're in Gudlavalleru, Andhra Pradesh, or anywhere
                else, you can easily find nutritional meal options tailored to
                your needs.
              </p>
              <div className="card-features">
                <div className="feature">
                  <div className="feature-icon">🍎</div>
                  <div className="feature-text">Location-based meals</div>
                </div>
                <div className="feature">
                  <div className="feature-icon">📊</div>
                  <div className="feature-text">Nutritional tracking</div>
                </div>
                <div className="feature">
                  <div className="feature-icon">🥗</div>
                  <div className="feature-text">Healthy alternatives</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
