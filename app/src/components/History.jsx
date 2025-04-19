import React, { useState, useEffect } from 'react';

const UsageAlert = () => {
  const [bills, setBills] = useState([
    { month: 'January', units: 0 },
    { month: 'February', units: 0 },
    { month: 'March', units: 0 }
  ]);

  const [currentReadings, setCurrentReadings] = useState({
    lastBillReading: '',
    currentReading: '',
    readingDate: new Date().toISOString().split('T')[0]
  });

  const [calculations, setCalculations] = useState({
    avgUsage: 0,
    currentUsage: 0,
    daysInMonth: 30,
    daysPassed: 0,
    projectedUsage: 0,
    alertMessage: ''
  });

  useEffect(() => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysPassed = today.getDate();

    setCalculations(prev => ({
      ...prev,
      daysInMonth,
      daysPassed
    }));
  }, []);

  const handleBillChange = (index, value) => {
    const newBills = [...bills];
    newBills[index].units = value === '' ? '' : parseInt(value);
    setBills(newBills);

    if (newBills.every(bill => bill.units !== '' && !isNaN(bill.units))) {
      const avg = newBills.reduce((sum, bill) => sum + bill.units, 0) / newBills.length;
      setCalculations(prev => ({
        ...prev,
        avgUsage: Math.round(avg)
      }));
    }
  };

  const handleReadingChange = (e) => {
    const { name, value } = e.target;
    setCurrentReadings(prev => ({
      ...prev,
      [name]: name === 'readingDate' ? value : value === '' ? '' : parseInt(value)
    }));
  };

  const calculateUsage = () => {
    if (!currentReadings.lastBillReading || !currentReadings.currentReading) return;

    const usage = currentReadings.currentReading - currentReadings.lastBillReading;
    const dailyUsage = usage / calculations.daysPassed;
    const projected = dailyUsage * calculations.daysInMonth;

    let alertMsg = '';
    if (projected > calculations.avgUsage * 1.1) {
      const percentHigher = Math.round(((projected - calculations.avgUsage) / calculations.avgUsage) * 100);
      alertMsg = `⚠️ Warning! You're using ${percentHigher}% more than your average. Consider reducing usage.`;
    } else if (projected < calculations.avgUsage * 0.9) {
      const percentLower = Math.round(((calculations.avgUsage - projected) / calculations.avgUsage) * 100);
      alertMsg = `✅ Great! You're using ${percentLower}% less than your average. Keep it up!`;
    }

    setCalculations(prev => ({
      ...prev,
      currentUsage: usage,
      projectedUsage: Math.round(projected),
      alertMessage: alertMsg
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Electricity Usage Alert System</h1>

      {/* Previous Bills Section */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter Your Last 3 Bills</h2>
        <p className="text-gray-600 mb-4">This helps us calculate your average monthly consumption</p>
        <div className="space-y-4">
          {bills.map((bill, index) => (
            <div key={index} className="flex items-center">
              <label className="w-24 text-gray-700">{bill.month}:</label>
              <input
                type="number"
                value={bill.units === 0 ? '' : bill.units}
                onChange={(e) => handleBillChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Units consumed"
              />
              <span className="ml-2 text-gray-500">kWh</span>
            </div>
          ))}

          {calculations.avgUsage > 0 && (
            <div className="mt-4 p-3 bg-blue-100 rounded-md">
              <p className="font-medium text-blue-800">
                Your average monthly usage: <span className="font-bold">{calculations.avgUsage} kWh</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Current Readings Section */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter Current Meter Readings</h2>
        <p className="text-gray-600 mb-4">Help us calculate your current month's projected usage</p>

        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-48 text-gray-700">Last bill reading (units):</label>
            <input
              type="number"
              name="lastBillReading"
              value={currentReadings.lastBillReading}
              onChange={handleReadingChange}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Units from last bill"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-700">Current reading (units):</label>
            <input
              type="number"
              name="currentReading"
              value={currentReadings.currentReading}
              onChange={handleReadingChange}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Current meter reading"
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-700">Reading date:</label>
            <input
              type="date"
              name="readingDate"
              value={currentReadings.readingDate}
              onChange={handleReadingChange}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={calculateUsage}
            disabled={!currentReadings.lastBillReading || !currentReadings.currentReading}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Calculate Current Usage
          </button>
        </div>
      </div>

      {/* Results Section */}
      {calculations.currentUsage > 0 && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Usage Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Current Usage</p>
              <p className="text-2xl font-bold text-blue-600">
                {calculations.currentUsage} kWh
              </p>
              <p className="text-sm text-gray-500">
                (from {formatDate(currentReadings.readingDate)})
              </p>
            </div>

            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Projected Monthly Usage</p>
              <p className="text-2xl font-bold text-purple-600">
                {calculations.projectedUsage} kWh
              </p>
              <p className="text-sm text-gray-500">
                (based on {calculations.daysPassed} of {calculations.daysInMonth} days)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Your Average Usage</p>
              <p className="text-2xl font-bold text-green-600">
                {calculations.avgUsage} kWh
              </p>
            </div>

            <div className="p-3 bg-white rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Difference</p>
              <p className={`text-2xl font-bold ${
                calculations.projectedUsage > calculations.avgUsage ? 'text-red-600' : 'text-green-600'
              }`}>
                {Math.abs(calculations.projectedUsage - calculations.avgUsage)} kWh
                {calculations.projectedUsage > calculations.avgUsage ? ' more' : ' less'}
              </p>
            </div>
          </div>

          {calculations.alertMessage && (
            <div className={`p-4 rounded-md ${
              calculations.projectedUsage > calculations.avgUsage 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              <p className="font-medium">{calculations.alertMessage}</p>

              {calculations.projectedUsage > calculations.avgUsage && (
                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Quick Tips to Reduce Usage:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Set AC temperature to 24°C or higher</li>
                    <li>Turn off lights and fans when not in room</li>
                    <li>Use appliances during off-peak hours if possible</li>
                    <li>Unplug devices that are not in use</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsageAlert;
