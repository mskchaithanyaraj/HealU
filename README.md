# HealU

**HealU** is a health-focused web application designed to help users make informed dietary choices by providing personalized meal planning based on location, health goals, and nutritional needs. Targeted especially at individuals in South India, HealU enables users to access customized meal plans with specific nutritional information and ordering options based on their local food preferences.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [Contributing](#contributing)
8. [Future Scope](#future-scope)
9. [License](#license)

---

## Project Overview

HealU is built as a community service project (CSP) that offers a solution to the common challenge of meal planning and diet optimization. By allowing users to input their location, HealU recommends meals based on nutritional content, calorie requirements, and the user’s specific dietary goals. It also provides ordering options to purchase ingredients or find nearby places serving these meals.

## Key Features

- **Location-Based Meal Suggestions**: Meal plans customized to the user’s specific location, with a focus on South Indian dietary options.
- **Nutritional Information**: Detailed breakdown of macronutrients, vitamins, and minerals in suggested meals.
- **Personalized Meal Planning**: Optimized diet plans based on weight, BMI, and meal time (morning, afternoon, evening).
- **Meal Ordering and Nearby Options**: Order directly from the platform or find local vendors and shops.
- **Responsive Design**: Accessible across multiple devices, ensuring a seamless user experience on mobile, tablet, and desktop.

## Technologies Used

- **Frontend**: React
- **Styling**: CSS3, with a light theme for health-centric aesthetics
- **Additional Libraries**: React Router for routing, Axios for API requests, and Chatbot integration for user assistance

## Installation and Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/healu.git
    cd healu
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    npm start
    ```

4. **Building for Production**:
    ```bash
    npm run build
    ```

## Usage

1. Visit the main page of **HealU**.
2. Click on **Meal Planner** to enter your location and other details.
3. Review personalized meal recommendations with detailed nutritional information.

## Folder Structure

```plaintext
healu/
├── public/
│   ├── index.html
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── background.jpg
│   │   └── logo.jpg
│   ├── components/
│   │   ├── HomePage/
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── MealPlanner/
│   │   │   ├── MealPlanner.js
│   │   │   └── index.css
│   │   ├── HowToUse/
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── NavBar/
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── Footer/
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── BMICalculator/
│   │   │   ├── index.js
│   │   │   └── index.css
│   └── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
