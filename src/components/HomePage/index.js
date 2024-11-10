"use client";

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="main-container">
      <Navbar />
      <motion.div
        className="homepage-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="home-page-description-container"
          variants={itemVariants}
        >
          <motion.h1 className="homepage-main-heading" variants={itemVariants}>
            Welcome to <span className="home-healu-name">HealU</span> !
          </motion.h1>
          <motion.p className="homepage-description" variants={itemVariants}>
            HealU is designed to help you make informed dietary choices by
            providing personalized meal planning based on your location. Whether
            you're in Gudlavalleru, Andhra Pradesh, or anywhere else, you can
            easily find nutritional meal options tailored to your needs. With
            HealU, planning healthy meals has never been easier. Just enter your
            location, and let us guide you to the best meal options available.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/how-to-use" className="cta-button">
              Learn How to Use
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default HomePage;
