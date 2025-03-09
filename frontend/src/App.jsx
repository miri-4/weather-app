/**
 * App Component
 * 
 * This is the main application component that integrates all other components.
 * It manages the state for city selection, weather data, and error handling.
 * 
 * Features:
 * - Fetches weather data using an API service.
 * - Allows users to search for a city and view its weather.
 * - Displays weather details using WeatherDisplay.
 * - Shows metadata such as coordinates and last update time in Footer.
 * - Handles loading and error states.
 */

import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Responsive.css'
import { getWeather } from './api/weatherService'
import Footer from './components/Footer';
import SearchCity from './components/SearchCity';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  let [city, setCity] = useState(null);
  let [weatherData, setWeatherData] = useState(null);
  let [err, setErr] = useState(null);



  const fetchWeather = async () => {
    try {
      const data = await getWeather(city);
      if (data?.error) {
        setErr(data.error);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setErr("Could not fetch weather data.");
    }
  };

  useEffect(() => {
    setErr(null);
    if (city) fetchWeather();
    else setErr("No selected city");
  }, [city]);

  return (
    <div className="app-container">
      <img src="/logo.svg" alt="Logo" className="logo" />
      <div className="search-container">
        <SearchCity setCity={setCity} />
      </div>
      <div className="weather-container">
        <WeatherDisplay weatherData={weatherData} err={err} />
      </div>
      <Footer weatherData={weatherData} err={err} />
    </div>
  );
}

export default App;
