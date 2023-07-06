import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiKey = '828dcbc6894858597d0682787b4fffe9';
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

        try {
            const geoRes = await axios.get(geoUrl);
            if (geoRes.data.length > 0) {
                const lat = geoRes.data[0].lat;
                const lon = geoRes.data[0].lon;

                const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                const weatherRes = await axios.get(weatherUrl);
                setWeather(weatherRes.data);
                setError(null);
            } else {
                setError('City not found');
                setWeather(null);
            }
        } catch (error) {
            console.error('Error fetching weather data: ', error);
            setError('Failed to fetch weather data');
            setWeather(null);
        }
        setCity('');
    }

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
                    onChange={(handleInputChange)}
                />
                <button type='submit'> Get Weather </button>
            </form>

            { weather && !error &&  (<h2> {weather.current.weather[0].main} </h2>)}

        {error && <p>{error}</p>}

        </div>
    )
}

export default Weather;