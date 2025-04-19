import { useState } from 'react';
import WeatherPage from './WeatherPage';

function App() {
  const [currentPage, setCurrentPage] = useState('weather'); 
  const [locationData, setLocationData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white shadow-sm rounded-lg p-4 mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage('weather')}
          className={`px-4 py-2 rounded-md ${currentPage === 'weather' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Weather
        </button>
        <button
          onClick={() => setCurrentPage('energy')}
          className={`px-4 py-2 rounded-md ${currentPage === 'energy' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Energy Calculator
        </button>
      </nav>

      <main className="max-w-4xl mx-auto">
        {currentPage === 'weather' ? (
          <WeatherPage onLocationSet={setLocationData} />
        ) : (
          <EnergyPage locationData={locationData} />
        )}
      </main>
    </div>
  );
}

export default App;