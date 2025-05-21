"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import healuHealthMatters from "../../assets/heart.png";
import doctorImage from "../../assets/doctor.png";
import HeartRateImage from "../../assets/Heart Rate.png";
import DietImage from "../../assets/diet 1.png";
import ChatbotImage from "../../assets/chatbot 1.png";
import StatsImage from "../../assets/stats-2 1.png";
import Footer from "../Footer";
import "./index.css";

const MealPlanner = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="meal-planner-container">
      <Navbar />

      {/* Hero Section */}
      <div className="meal-hero-section">
        <div className="meal-hero-content">
          <div className="meal-tag animate-fade-in">
            Health Matters{" "}
            <img
              src={healuHealthMatters || "/placeholder.svg"}
              alt="HealU"
              className="health-matters-icon"
            />
          </div>

          <h1 className="meal-heading animate-slide-up">
            <span className="meal-highlight">One Step Solution</span> for all
            your dietary needs.
          </h1>

          <p className="meal-description animate-slide-up">
            Using your BMI index we calculate whether the dish is suitable for
            you.
          </p>

          <div className="meal-search-container animate-fade-in">
            <input
              type="search"
              placeholder="Search for meals or ingredients"
              className="meal-search-input"
              value={searchTerm}
              onChange={handleSearch}
              disabled={true}
            />
            <button className="meal-search-button">Search</button>
          </div>
        </div>

        <div className="meal-hero-image">
          <img
            src={doctorImage || "/placeholder.svg"}
            alt="doctor"
            className="doctor-img animate-float"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="meal-features-section">
        <h2 className="features-title animate-fade-in">Features we provide</h2>

        <div className="features-grid">
          <div className="feature-card animate-pop-in">
            <div className="feature-icon">
              <img
                src={HeartRateImage || "/placeholder.svg"}
                alt="heart rate"
              />
            </div>
            <h3>Calculating BMI is easier</h3>
            <p>We calculate BMI from your data like age, height, weight</p>
          </div>

          <div className="feature-card animate-pop-in">
            <div className="feature-icon">
              <img
                src={DietImage || "/placeholder.svg"}
                alt="Food Recommendation"
              />
            </div>
            <h3>Food Recommendation</h3>
            <p>
              We provide food recommendation according to your calorie
              requirements.
            </p>
          </div>

          <div className="feature-card animate-pop-in">
            <div className="feature-icon">
              <img
                src={StatsImage || "/placeholder.svg"}
                alt="Nutritional Value"
              />
            </div>
            <h3>Nutritional Value</h3>
            <p>Get all the nutritional values of your preferred dish.</p>
          </div>

          <div className="feature-card animate-pop-in">
            <div className="feature-icon">
              <img
                src={ChatbotImage || "/placeholder.svg"}
                alt="Interactive Chatbot"
              />
            </div>
            <h3>Interactive Chatbot</h3>
            <p>Solve your queries by interacting with our bot.</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="coming-soon-section animate-fade-in">
        <div className="coming-soon-content">
          <h2>New Features Coming Soon</h2>
          <p>
            We're constantly working to improve your experience. Here's what's
            coming next:
          </p>

          <div className="coming-soon-features">
            <div className="coming-soon-feature">
              <div className="feature-badge">Coming Soon</div>
              <h3>Personalized Meal Plans</h3>
              <p>
                Get weekly meal plans tailored to your dietary needs and
                preferences.
              </p>
            </div>

            <div className="coming-soon-feature">
              <div className="feature-badge">Coming Soon</div>
              <h3>Recipe Sharing</h3>
              <p>
                Share your favorite healthy recipes with the HealU community.
              </p>
            </div>

            <div className="coming-soon-feature">
              <div className="feature-badge">Coming Soon</div>
              <h3>Nutrition Tracking</h3>
              <p>
                Track your daily nutrition intake and monitor your progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MealPlanner;
