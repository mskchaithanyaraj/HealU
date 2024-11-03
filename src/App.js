// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import MealPlanner from './components/MealPlanner';
import BMICalculator from './components/BMICalculator';
import HowToUse from './components/HowToUse';
import Feedback from './components/Feedback';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/meal-planner" element={<MealPlanner />} />
      <Route path="/how-to-use" element={<HowToUse />} />
      <Route path="/bmi-calculator" element={<BMICalculator />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </Router>
);

export default App;
