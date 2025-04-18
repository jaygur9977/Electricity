import React, { useState } from 'react';
import axios from 'axios';

const EnergyTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockData = [
    { date: '2025-04-15', appliance: 'AC', usage: 3.2, duration: 5 },
    { date: '2025-04-15', appliance: 'Geyser', usage: 1.2, duration: 2 },
    { date: '2025-04-15', appliance: 'Lights', usage: 1.7, duration: 6 },
  ];

  const getTips = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-tip', mockData);
      setTips(res.data.tips);
    } catch (error) {
      console.error('Error fetching tips:', error);
      setTips(['Error fetching tips']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">⚡ AI-Generated Energy Tips</h1>

      <button
        onClick={getTips}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Generate Tips
      </button>

      {loading ? (
        <p className="text-lg text-yellow-400">Generating tips...</p>
      ) : (
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded shadow">
              <p className="text-lg">💡 {tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnergyTips;