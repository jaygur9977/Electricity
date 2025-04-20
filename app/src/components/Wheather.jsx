
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const IntegratedApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherAndSuggestions = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);
    setSuggestions('');

    try {
      const response = await fetch('http://localhost:5000/api/weather-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data.weather);
      setSuggestions(data.suggestions);
      sendEmail(data.suggestions); // ✅ Send to Gmail
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to get weather and suggestions");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = (suggestionText) => {
    const templateParams = {
      to_email: 'jaygurjarband224@gmail.com',
      subject: `Energy Tips for ${location} - ${new Date().toLocaleDateString()}`,
      message: suggestionText
    };

    emailjs
      .send(
        'service_blw3mjs',       // ✅ Your EmailJS Service ID
        'template_l4z2ifn',      // ✅ Your EmailJS Template ID
        templateParams,
        'PnD1__8tYJ87tZBGt'      // ✅ Your EmailJS Public Key
      )
      .then((result) => {
        console.log('✅ Email sent!', result.text);
        alert('Suggestions sent to Gmail!');
      })
      .catch((error) => {
        console.error('❌ Email failed:', error.text);
        alert('Failed to send email.');
      });
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
                {suggestions.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">
                    {line.startsWith('*') || line.startsWith('-') 
                      ? `• ${line.substring(1).trim()}`
                      : line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedApp;
