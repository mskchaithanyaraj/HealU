import React from 'react';
import './index.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CarrotImage from '../../assets/carrot.png'
import CornImage from '../../assets/corn.png'

const HowToUse = () => {
  return (
    <>
      <Navbar />
      <div className='how-to-use-main-container'>
        <img src={CarrotImage} alt = 'carrot' className='threeD-image' />
        <div className="how-to-use-container">
          <h1 className="title">How to Use HealU’s Meal Planner Chat</h1>
          
          <div className="step-container">
            <h2 className="step-title">Introduce Yourself</h2>
            <p className="step-description">
              Start by entering your age and weight. This helps the planner understand your nutritional needs.
            </p>
          </div>

          <div className="step-container">
            <h2 className="step-title">Specify Any Health Conditions</h2>
            <p className="step-description">
              Mention any specific health conditions or dietary goals, like diabetes, weight gain/loss, or heart health.
              This lets the planner tailor meals to support your well-being.
            </p>
          </div>

          <div className="step-container">
            <h2 className="step-title">Describe Your Food Preferences</h2>
            <p className="step-description">
              List foods you prefer to include, and any ingredients you avoid. (e.g., “No dairy,” or “Prefer vegetarian options”).
            </p>
          </div>

          <div className="step-container">
            <h2 className="step-title">Indicate Meal Timing or Frequency</h2>
            <p className="step-description">
              Share details on how many meals you’d like planned, and any specific timings (e.g., “3 meals daily” or “Avoid heavy meals at night”).
            </p>
          </div>

          <div className="step-container">
            <h2 className="step-title">Any Additional Details</h2>
            <p className="step-description">
              Let us know if there are any other dietary guidelines or routines you follow (e.g., “Low-carb,” or “High protein after workouts”).
            </p>
          </div>
        </div>
        <img src={CornImage} alt = 'corn' className='threeD-image'/>
      </div>
      <Footer />  
    </>
  );
};

export default HowToUse;
