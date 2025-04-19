import React, { useState } from 'react';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    const apiKey = "5660c1d2975c42a9be6160711251904";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong while fetching the weather.");
    } finally {
      setLoading(false);
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
      getWeather();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Weather App</h1>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city or zip code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={getWeather}
            disabled={loading}
            className={`w-full mt-3 p-3 rounded-lg font-bold text-white transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'}`}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {weatherData && (
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
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
