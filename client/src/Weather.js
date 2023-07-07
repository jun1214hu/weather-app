import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const weatherRes = await axios.post('/weather', { city });
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && !error && <h2>{weather.current.weather[0].main}</h2>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Weather;
