import React, { useState } from 'react';
import Navbar from '../Navbar';
import healuHealthMatters from '../../assets/heart.png';
import doctorImage from '../../assets/doctor.png';
import HeartRateImage from '../../assets/Heart Rate.png';
import DietImage from '../../assets/diet 1.png';
import ChatbotImage from '../../assets/chatbot 1.png';
import StatsImage from '../../assets/stats-2 1.png';
import Footer from '../Footer';
import './index.css';

const MealPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='meal-planner-container'>
      <Navbar />
      <div className='mealplanner-description-container'>
        <div className='mealplanner-description-sub-container'>
          <p className='mealplanner-tag animate-fade-in'>
            Health Matters <img src={healuHealthMatters} alt='HealU' className='health-matters-icon' />
          </p>
          <h1 className='mealplanner-heading animate-slide-up text-gradient'>
            <span className='colour-primary'>One Step Solution</span> for all your dietary needs.
          </h1>
          <p className='mealplanner-description animate-slide-up text-gradient'>
            Using your BMI index we calculate whether the dish is suitable for you.
          </p>
          <input
            type='search'
            placeholder='Search for meals or ingredients'
            className='search-input-meal animate-fade-in'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <img src={doctorImage} alt='doctor' className='doctor-img animate-float'/>
      </div>
      <div className='mealplanner-features'>
        <h1 className='animate-fade-in text-gradient'>Features we provide</h1>
        <div className='features-container'>
          <div className='feature animate-pop-in'>
            <img src={HeartRateImage} alt='heart rate' className='feature-image'/>
            <h1 className='feature-heading'>Calculating BMI is easier</h1>
            <p className='feature-description'>We calculate BMI from your data like age, height, weight</p>
          </div>
          <div className='feature animate-pop-in'>
            <img src={DietImage} alt="Food Recommendation" className='feature-image' />
            <h3 className='feature-heading'>Food Recommendation</h3>
            <p className='feature-description'>We provide food recommendation according to your calorie requirements.</p>
          </div>
          <div className='feature animate-pop-in'>
            <img src={StatsImage} alt="Nutritional Value"  className='feature-image'/>
            <h3 className='feature-heading'>Nutritional Value</h3>
            <p className='feature-description'>Get all the nutritional values of your preferred dish.</p>
          </div>
          <div className='feature animate-pop-in'>
            <img src={ChatbotImage} alt="Interactive Chatbot"  className='feature-image'/>
            <h3 className='feature-heading'>Interactive Chatbot</h3>
            <p className='feature-description'>Solve your queries by interacting with our bot.</p>
          </div>
        </div>
      </div>
      <div className='meal-suggestions animate-fade-in'>
        <h2>Personalized Meal Suggestions</h2>
        <p>Based on your BMI and dietary preferences, we recommend the following meals:</p>
        <ul className='meal-list'>
          <li>Grilled chicken with quinoa and roasted vegetables</li>
          <li>Salmon with sweet potato mash and steamed broccoli</li>
          <li>Vegetarian lentil curry with brown rice</li>
          <li>Greek yogurt parfait with mixed berries and granola</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default MealPlanner;