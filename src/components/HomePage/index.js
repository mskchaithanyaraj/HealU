// src/components/HomePage.js
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.css'
const HomePage = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <div className='homepage-section'>
        <div className='home-page-description-container'>
          <h1 className='homepage-main-heading'>Welcome to <span className='home-healu-name'>HealU</span> !</h1>
          <p className='homepage-description'>
            HealU is designed to help you make informed dietary choices by providing personalized meal planning based on your location. 
            Whether you're in Gudlavalleru, Andhra Pradesh, or anywhere else, you can easily find nutritional meal options tailored to your needs.
            With HealU, planning healthy meals has never been easier. Just enter your location, and let us guide you to the best meal options available.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
