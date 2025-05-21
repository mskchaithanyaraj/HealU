import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [heightUnit, setHeightUnit] = useState("ft");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.value;
    if (selectedUnit !== heightUnit) {
      if (selectedUnit === "ft" && height) {
        const totalInches = parseFloat(height) / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inch = Math.round(totalInches % 12);
        setFeet(ft.toString());
        setInches(inch.toString());
      } else if (selectedUnit === "cm" && feet) {
        const totalCm =
          parseFloat(feet) * 30.48 + parseFloat(inches || "0") * 2.54;
        setHeight(Math.round(totalCm).toString());
      }
      setHeightUnit(selectedUnit);
    }
  };

  const getHeightInCm = () => {
    if (heightUnit === "cm") return parseFloat(height);
    const ft = parseFloat(feet) || 0;
    const inch = parseFloat(inches) || 0;
    return (ft * 30.48 + inch * 2.54).toFixed(2);
  };

  const calculateBMI = () => {
    if ((heightUnit === "cm" && height) || (heightUnit === "ft" && feet)) {
      if (weight) {
        setIsCalculating(true);

        setTimeout(() => {
          const heightCm = getHeightInCm();
          const heightInMeters = heightCm / 100;

          const bmiValue = (
            parseFloat(weight) /
            (heightInMeters * heightInMeters)
          ).toFixed(1);
          setBmi(bmiValue);
          setShowResult(true);

          if (bmiValue < 18.5) {
            setCategory("Underweight");
          } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            setCategory("Normal weight");
          } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            setCategory("Overweight");
          } else {
            setCategory("Obese");
          }

          setIsCalculating(false);
        }, 800);
      }
    } else {
      setBmi(null);
      setCategory("");
      setShowResult(false);
    }
  };

  const getCategoryColor = () => {
    if (!category) return "";

    switch (category) {
      case "Underweight":
        return "#3498db";
      case "Normal weight":
        return "#2ecc71";
      case "Overweight":
        return "#f39c12";
      case "Obese":
        return "#e74c3c";
      default:
        return "#777";
    }
  };

  const getCategoryClass = () => {
    if (!category) return "";

    switch (category) {
      case "Underweight":
        return "category-underweight";
      case "Normal weight":
        return "category-normal";
      case "Overweight":
        return "category-overweight";
      case "Obese":
        return "category-obese";
      default:
        return "";
    }
  };

  const getMeterPosition = () => {
    if (!bmi) return 0;
    const bmiNum = parseFloat(bmi);
    if (bmiNum <= 10) return 0;
    if (bmiNum >= 40) return 100;
    return ((bmiNum - 10) / 30) * 100;
  };

  return (
    <div className="bmi-page">
      <Navbar />
      <div className="bmi-container">
        <div className="bmi-content">
          <motion.div
            className="bmi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bmi-header">
              <h2>BMI Calculator</h2>
              <p>
                Calculate your Body Mass Index to check if you're at a healthy
                weight
              </p>
            </div>

            <div className="bmi-form">
              <div className="input-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  min="1"
                  max="500"
                />
              </div>

              <div className="input-group">
                <div className="height-label-group">
                  <label htmlFor="height">Height</label>
                  <select
                    className="unit-selector"
                    value={heightUnit}
                    onChange={handleUnitChange}
                  >
                    <option value="cm">Centimeters</option>
                    <option value="ft">Feet & Inches</option>
                  </select>
                </div>
                {heightUnit === "cm" ? (
                  <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height in cm"
                    min="1"
                    max="300"
                  />
                ) : (
                  <div className="height-imperial">
                    <input
                      type="number"
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                      placeholder="ft"
                      min="0"
                      max="10"
                      className="feet-input"
                    />
                    <input
                      type="number"
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                      placeholder="in"
                      min="0"
                      max="11"
                      className="inches-input"
                    />
                  </div>
                )}
              </div>

              <button
                className={`btn-calculate ${isCalculating ? "loading" : ""}`}
                onClick={calculateBMI}
                disabled={
                  isCalculating ||
                  !(
                    (heightUnit === "cm" && height) ||
                    (heightUnit === "ft" && feet)
                  ) ||
                  !weight
                }
              >
                {isCalculating ? (
                  <>
                    <span className="spinner"></span>
                    <span>Calculating...</span>
                  </>
                ) : (
                  "Calculate BMI"
                )}
              </button>
            </div>

            {showResult && (
              <motion.div
                className="bmi-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bmi-meter-container">
                  <div className="bmi-meter">
                    <div className="meter-scale">
                      <div className="meter-section underweight"></div>
                      <div className="meter-section normal"></div>
                      <div className="meter-section overweight"></div>
                      <div className="meter-section obese"></div>
                    </div>
                    <div
                      className="meter-indicator"
                      style={{ left: `${getMeterPosition()}%` }}
                    >
                      <div
                        className="indicator-dot"
                        style={{ backgroundColor: getCategoryColor() }}
                      ></div>
                      <div className="indicator-value">{bmi}</div>
                    </div>
                  </div>
                  <div className="meter-labels">
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>

                <div className={`result-category ${getCategoryClass()}`}>
                  <span>Your BMI indicates:</span>
                  <h4>{category}</h4>
                </div>

                <div className="bmi-scale">
                  <div className="scale-marker underweight">
                    <div className="marker"></div>
                    <span>Underweight</span>
                  </div>
                  <div className="scale-marker normal">
                    <div className="marker"></div>
                    <span>Normal</span>
                  </div>
                  <div className="scale-marker overweight">
                    <div className="marker"></div>
                    <span>Overweight</span>
                  </div>
                  <div className="scale-marker obese">
                    <div className="marker"></div>
                    <span>Obese</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="bmi-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Understanding Your BMI</h3>

            <div className="bmi-visual-guide">
              <div className="bmi-range-bar">
                <div className="range-section underweight">
                  <div className="range-label">Underweight</div>
                </div>
                <div className="range-section normal">
                  <div className="range-label">Normal</div>
                </div>
                <div className="range-section overweight">
                  <div className="range-label">Overweight</div>
                </div>
                <div className="range-section obese">
                  <div className="range-label">Obese</div>
                </div>
              </div>
              <div className="bmi-scale-numbers">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            <div className="bmi-categories">
              <div className="bmi-category-item underweight-item">
                <h4>Underweight</h4>
                <p>BMI less than 18.5</p>
                <div className="category-description">
                  May indicate nutritional deficiency or other health issues
                </div>
              </div>
              <div className="bmi-category-item normal-item">
                <h4>Normal weight</h4>
                <p>BMI between 18.5 and 24.9</p>
                <div className="category-description">
                  Generally indicates a healthy weight for most people
                </div>
              </div>
              <div className="bmi-category-item overweight-item">
                <h4>Overweight</h4>
                <p>BMI between 25 and 29.9</p>
                <div className="category-description">
                  May increase risk of health problems
                </div>
              </div>
              <div className="bmi-category-item obese-item">
                <h4>Obese</h4>
                <p>BMI 30 or greater</p>
                <div className="category-description">
                  Increases risk of many health conditions
                </div>
              </div>
            </div>

            <div className="bmi-disclaimer">
              <h4>Important Note</h4>
              <p>
                BMI is a screening tool, not a diagnostic of body fatness or
                health. It doesn't account for muscle mass, bone density, or
                overall body composition. Consult with healthcare providers for
                a complete health assessment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BMICalculator;
