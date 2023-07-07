import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const weatherRes = await axios.post('https://intense-reaches-10245-5ab56b1229bf.herokuapp.com/weather', { city });
      setWeather(weatherRes.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      setError('Failed to fetch weather data');
      setWeather(null);
    }

    setCity('');
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">

      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"

        />
        <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Get Weather
        </button>
      </form>

      {weather && !error && 
        <div>
            <div className="mt-4 text-2xl">{weather.timezone}</div>
            <div className="mt-2 text-xl">Current Temperature: {weather.current.temp}</div>
            <div className="mt-2 text-xl">Weather: {weather.current.weather[0].description}</div>
            <div className="mt-2 text-xl ">Feels like: {weather.current.feels_like}</div>
        </div>
      }
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Weather;
