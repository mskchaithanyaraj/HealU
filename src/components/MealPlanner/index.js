import React from 'react';
import Navbar from '../Navbar'; // Import Navbar component
import healuHealthMatters from '../../assets/heart.png';
import doctorImage from '../../assets/doctor.png';
import HeartRateImage from '../../assets/Heart Rate.png';
import DietImage from '../../assets/diet 1.png';
import ChatbotImage from '../../assets/chatbot 1.png';
import StatsImage from '../../assets/stats-2 1.png';
import Footer from '../Footer';
import './index.css';

const MealPlanner = () => {
  return (
    <div className='meal-planner-container'>
      <Navbar />
      <div className='mealplanner-description-container'>
        <div className='mealplanner-description-sub-container'>
          <p className='mealplanner-tag'>Health Matters <img src={healuHealthMatters} alt='HealU' className='health-matters-icon' /></p>
          <h1 className='mealplanner-heading'><span className='colour-primary'>One Step Solution</span> for all your dietary needs.</h1>
          <p className='mealplanner-description'>Using your BMI index we calculate whether the dish is suitable for you.</p>
          <input type='search' placeholder='Search Here (not ready yet)' className='search-input-meal' />
        </div>
        <img src={doctorImage} alt='doctor' className='doctor-img'/>
      </div>
      <div className='mealplanner-features'>
        <h1>Features we provide</h1>
        <div className='features-container'>
        <div className='feature'>
          <img src={HeartRateImage} alt='heart rate' className='feature-image'/>
          <h1 className='feature-heading'>Calculating BMI is easier </h1>
          <p className='feature-description'>We calculate BMI from your data like age, height, weight</p>
        </div>
          <div className='feature'>
            <img src={DietImage} alt="Food Recommendation" className='feature-image' />
            <h3 className='feature-heading'>Food Recommendation</h3>
            <p className='feature-description'>We provide food recommendation according to your calorie requirements.</p>
          </div>
          <div className='feature'>
            <img src={StatsImage} alt="Nutritional Value"  className='feature-image'/>
            <h3 className='feature-heading'>Nutritional Value</h3>
            <p className='feature-description'>Get all the nutritional values of your preferred dish.</p>
          </div>
          <div className='feature'>
            <img src={ChatbotImage} alt="Interactive Chatbot"  className='feature-image'/>
            <h3 className='feature-heading'>Interactive Chatbot</h3>
            <p className='feature-description'>Solve your queries by interacting with our bot.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealPlanner;
