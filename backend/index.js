require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 5000;

// Rate limiting to prevent excessive API calls
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/weather-suggestions', limiter);

// Fallback suggestions for when API quota is exceeded
const FALLBACK_SUGGESTIONS = `
• ☀️ Use blinds/curtains during peak sunlight - Reduces AC workload
• 💨 Use natural ventilation when possible - Saves fan/AC energy
• ❄️ Set thermostat to 24°C (75°F) - Optimal for energy savings
• 🌙 Turn off unnecessary lights at night - Reduces electricity usage
`;

// Initialize Gemini AI
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (err) {
  console.error('Failed to initialize Gemini AI:', err.message);
}

// Simple cache implementation
const suggestionCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

app.post('/api/weather-suggestions', async (req, res) => {
  try {
    const { location } = req.body;

    if (!location || typeof location !== 'string') {
      return res.status(400).json({ 
        error: 'Please provide a valid location',
        suggestions: FALLBACK_SUGGESTIONS
      });
    }

    // 1. Fetch weather data
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(location)}&aqi=no`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (weatherData.error) {
      return res.status(400).json({ 
        error: weatherData.error.message,
        suggestions: FALLBACK_SUGGESTIONS
      });
    }

    // Check cache first
    const cacheKey = `${location}-${weatherData.current.temp_c}`;
    if (suggestionCache.has(cacheKey)) {
      const cached = suggestionCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({
          weather: weatherData,
          suggestions: cached.suggestions,
          cached: true,
          usingFallback: false
        });
      }
    }

    // 2. Try to get Gemini suggestions or use fallback
    let suggestions;
    let usingFallback = true;
    
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use basic model
        
        const prompt = `Provide 3-5 brief energy saving tips for ${weatherData.current.temp_c}°C weather in ${weatherData.location.name} in bullet point format.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        suggestions = response.text();
        usingFallback = false;
        
        // Cache successful API responses
        suggestionCache.set(cacheKey, {
          suggestions,
          timestamp: Date.now()
        });
      } catch (geminiError) {
        console.warn('Gemini API error:', geminiError.message);
        suggestions = FALLBACK_SUGGESTIONS;
      }
    } else {
      suggestions = FALLBACK_SUGGESTIONS;
    }

    res.json({
      weather: weatherData,
      suggestions,
      usingFallback
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to process request',
      details: error.message,
      suggestions: FALLBACK_SUGGESTIONS,
      usingFallback: true
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    cacheSize: suggestionCache.size
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
