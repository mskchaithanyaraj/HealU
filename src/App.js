import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MealPlanner from "./components/MealPlanner";
import BMICalculator from "./components/BMICalculator";
import HowToUse from "./components/HowToUse";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const handleRegister = async (userData) => {
    try {
      const response = await fetch(
        "https://healu-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route
          path="/meal-planner"
          element={<ProtectedRoute element={<MealPlanner />} />}
        />
        <Route
          path="/how-to-use"
          element={<ProtectedRoute element={<HowToUse />} />}
        />
        <Route
          path="/bmi-calculator"
          element={<ProtectedRoute element={<BMICalculator />} />}
        />
        <Route
          path="/feedback"
          element={<ProtectedRoute element={<Feedback />} />}
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register onSubmit={handleRegister} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
