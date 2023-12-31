const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = process.env.REACT_APP_API_KEY; // all API keys hidden
const port = process.env.PORT || 3001; // 3001 for local dev purposes

app.use(express.json());
app.post('/weather', async (req, res) => {
  const { city } = req.body;

  try {
    // according to the prompt, users will input CITY name
    // openweathermap only returns the LAT and LON for CITY
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const geoRes = await axios.get(geoUrl);

    if (geoRes.data.length > 0) {
      const lat = geoRes.data[0].lat;
      const lon = geoRes.data[0].lon;
      // use the fetched LAT and LON to fetch the actual weather
      const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      const weatherRes = await axios.get(weatherUrl);

      res.json(weatherRes.data);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error fetching weather data: ', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// local dev purposes
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
