import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// Fallback suggestions for frontend use
const FALLBACK_SUGGESTIONS = `
• ☀️ Use blinds/curtains during peak sunlight - Reduces AC workload
• 💨 Use natural ventilation when possible - Saves fan/AC energy
• ❄️ Set thermostat to 24°C (75°F) - Optimal for energy savings
• 🌙 Turn off unnecessary lights at night - Reduces electricity usage
`;

const IntegratedApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [apiStatus, setApiStatus] = useState('');

  const getWeatherAndSuggestions = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);
    setSuggestions('');
    setEmailSent(false);
    setUsingFallback(false);
    setApiStatus('');

    try {
      const response = await fetch('http://localhost:5000/api/weather-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeatherData(data.weather);
      setSuggestions(data.suggestions || FALLBACK_SUGGESTIONS);
      setUsingFallback(data.usingFallback || false);
      setApiStatus(data.cached ? 'Using cached data' : '');

      // Only try to send email if we got real suggestions
      if (!data.usingFallback) {
        await sendEmail(data.suggestions);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to get weather data");
      setSuggestions(FALLBACK_SUGGESTIONS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (suggestionText) => {
    try {
      await emailjs.send(
        'service_blw3mjs',
        'template_l4z2ifn',
        {
          to_email: 'jaygurjarband224@gmail.com',
          subject: `Energy Tips for ${location} - ${new Date().toLocaleDateString()}`,
          message: suggestionText
        },
        'PnD1__8tYJ87tZBGt'
      );
      setEmailSent(true);
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  };

  const getWeatherIcon = (condition) => {
    const text = condition.toLowerCase();
    if (text.includes("sunny")) return "☀️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("rain")) return "🌧️";
    if (text.includes("snow")) return "❄️";
    return "🌤️";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeatherAndSuggestions();
    }
  };

  const formatSuggestions = (text) => {
    if (!text) return null;
    
    return text.split('\n')
      .filter(line => line.trim())
      .map((line, i) => {
        // Clean up the line and ensure consistent formatting
        const cleanedLine = line.replace(/^[•*-]\s*/, '').trim();
        return <p key={i} className="mb-2">• {cleanedLine}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Weather & Energy Conservation Advisor
        </h1>

        <div className="mb-6 bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city or zip code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <button
            onClick={getWeatherAndSuggestions}
            disabled={loading}
            className={`w-full mt-3 p-3 rounded-lg font-bold text-white transition-all ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Analyzing...' : 'Get Weather & Energy Tips'}
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {apiStatus && (
          <div className="p-3 mb-4 bg-blue-100 text-blue-700 rounded-lg">
            {apiStatus}
          </div>
        )}

        {usingFallback && (
          <div className="p-3 mb-4 bg-yellow-100 text-yellow-800 rounded-lg">
            Note: Showing generic energy tips (API quota may be reached)
          </div>
        )}

        {emailSent && (
          <div className="p-3 mb-4 bg-green-100 text-green-700 rounded-lg">
            Suggestions sent to your email!
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white bg-opacity-70 p-5 rounded-lg shadow">
              <div className="text-5xl text-center mb-2">
                {getWeatherIcon(weatherData.current.condition.text)}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {weatherData.location.name}
              </h2>
              <p className="text-gray-600 italic text-center mb-4">
                {weatherData.current.condition.text}
              </p>
              <p className="text-4xl font-bold text-red-500 text-center mb-6">
                {weatherData.current.temp_c}°C
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="text-2xl mr-2">💧</span>
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-semibold">{weatherData.current.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 p-3 rounded-lg">
                  <span className="text-2xl mr-2">🌬️</span>
                  <div>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="font-semibold">{weatherData.current.wind_kph} km/h</p>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 p-3 rounded-lg">
                  <span className="text-2xl mr-2">👁️</span>
                  <div>
                    <p className="text-sm text-gray-500">Visibility</p>
                    <p className="font-semibold">{weatherData.current.vis_km} km</p>
                  </div>
                </div>
                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                  <span className="text-2xl mr-2">☁️</span>
                  <div>
                    <p className="text-sm text-gray-500">Cloud</p>
                    <p className="font-semibold">{weatherData.current.cloud}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-5 rounded-lg shadow">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Energy Conservation Tips
              </h3>
              <div className="prose">
                {formatSuggestions(suggestions)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedApp;
