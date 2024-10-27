  // src/components/Navbar.js
  import React from 'react';
  import { Link } from 'react-router-dom';
  
import healuHealthMatters from '../../assets/heart.png'
  import './index.css'

  const Navbar = () => {
    return (
      <nav className='navbar-container'>
        <h2 className='healu-name'><Link className='cancel-link-styling' to ='/'><img src={healuHealthMatters} alt='HealU' className='small-heart-icon'/> HealU</Link></h2>
        <ul className='navbar-items'>
          <li>
            <Link to="/" className='navbar-link-item'>Home</Link>
          </li>
          <li>
            <Link to="/meal-planner" className='navbar-link-item'>Meal Planner</Link>
          </li>
          <li>
            <Link to="/how-to-use" className='navbar-link-item'>How to Use?</Link>
          </li>
          <li>
            <Link to="/bmi-calculator" className='navbar-link-item'>Calculate BMI</Link>
          </li>
        </ul>
      </nav>
    );
  }

  export default Navbar;
