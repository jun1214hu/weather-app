const express = require('express');
const axios = require('axios');
const app = express();
const apiKey = '828dcbc6894858597d0682787b4fffe9';

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/weather', async (req, res) => {
  const { city } = req.body;

  try {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=metric&appid=${apiKey}`;
    const geoRes = await axios.get(geoUrl);

    if (geoRes.data.length > 0) {
      const lat = geoRes.data[0].lat;
      const lon = geoRes.data[0].lon;
      const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
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

app.listen(PORT, () => {
  console.log('Server is running on port 3001');
});
