

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Combined endpoint for weather and suggestions
app.post('/api/weather-suggestions', async (req, res) => {
  try {
    const { location } = req.body;

    // 1. First fetch weather data
    const weatherApiKey = process.env.WEATHER_API_KEY || "5660c1d2975c42a9be6160711251904";
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(location)}&aqi=no`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (weatherData.error) {
      return res.status(400).json({ error: weatherData.error.message });
    }

    // 2. Generate energy conservation suggestions
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Given the current weather conditions:
    - Location: ${weatherData.location.name}, ${weatherData.location.country}
    - Temperature: ${weatherData.current.temp_c}°C (feels like ${weatherData.current.feelslike_c}°C)
    - Weather Condition: ${weatherData.current.condition.text}
    - Humidity: ${weatherData.current.humidity}%
    - Wind Speed: ${weatherData.current.wind_kph} km/h
    - UV Index: ${weatherData.current.uv}
    
    Provide 3-5 crisp energy-saving recommendations in this exact format:
• [Icon] [Action] - [Brief reason]
• [Icon] [Action] - [Brief reason]
• [Icon] [Action] - [Brief reason]

Use these icons based on weather:
☀️ for sunny/hot
🌧️ for rainy/wet
❄️ for cold
💨 for windy
🌤️ for mild

Example:
• ❄️ Lower thermostat by 2°C - Saves 5% heating costs in cold weather
• 💨 Open windows for ventilation - Uses natural wind instead of AC`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    res.json({
      weather: weatherData,
      suggestions
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
