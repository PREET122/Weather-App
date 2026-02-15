Project Overview

This Weather Forecast Application is a responsive web app built using HTML, Tailwind CSS, and JavaScript. It allows users to search for real-time weather information for any city or automatically detect their current location to display weather details.

The application retrieves live data from the OpenWeatherMap API and presents it in a clean, user-friendly interface with dynamic background changes based on weather conditions.

The goal of this project was to build a fully functional weather app with proper API integration, user interaction handling, responsive design, and clean code structure.

---------------------------------------

Technologies Used

HTML5 – Structure of the application
Tailwind CSS – Styling and responsive layout
JavaScript (ES6) – Functionality and API integration
OpenWeatherMap API – Real-time weather data

----------------------------------------

How to Run the Project

Clone or download this repository.
Open the project folder.
Navigate to src/config.js.
Replace the placeholder API key with your own OpenWeatherMap API key:
const API_KEY = "YOUR_API_KEY_HERE";
Open index.html in your browser

--------------------------------

Explanation:

config.js → Stores API key and base URL
weatherService.js → Handles API calls
storage.js → Manages localStorage for recent searches
ui.js → Updates and manages DOM elements
main.js → Connects all modules and handles user events