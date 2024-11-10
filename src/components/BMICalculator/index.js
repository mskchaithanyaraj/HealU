import React, { useState } from "react";
import "./index.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setCategory("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setCategory("Normal weight");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setCategory("Overweight");
      } else {
        setCategory("Obese");
      }
    } else {
      setBmi(null);
      setCategory("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bmi-body-container">
        <div className="bmi-card">
          <h2>HealU's BMI Calculator</h2>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>
          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
            />
          </div>
          <button className="btn-calculator" onClick={calculateBMI}>
            Calculate BMI
          </button>
          {bmi && (
            <div className="result">
              <h3>Your BMI: {bmi}</h3>
              <h4>Category: {category}</h4>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BMICalculator;
