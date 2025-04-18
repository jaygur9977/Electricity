// // import React from "react";

// // const historyData = [
// //   { id: 1, title: "Login", date: "2025-04-18", desc: "Logged in using Google" },
// //   { id: 2, title: "Viewed Profile", date: "2025-04-17", desc: "Checked profile info" },
// //   { id: 3, title: "Logged Out", date: "2025-04-16", desc: "User signed out" },
// //   { id: 4, title: "Updated Settings", date: "2025-04-15", desc: "Changed theme color" },
// // ];

// // const HistoryPage = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100 px-8 py-10">
// //       <h2 className="text-3xl font-bold mb-6 text-center text-green-700">User History</h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //         {historyData.map((item) => (
// //           <div
// //             key={item.id}
// //             className="group relative bg-white shadow-md p-5 rounded-2xl transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
// //           >
// //             <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
// //             <p className="text-sm text-gray-500">{item.date}</p>

// //             {/* Hover details */}
// //             <div className="absolute inset-0 bg-green-100 bg-opacity-90 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //               <p className="text-lg font-medium">{item.desc}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default HistoryPage;



// import React, { useState } from "react";
// import ApplianceUsageForm from "./ApplianceForm";
// import ApplianceUsageDisplay from "./ApplianceUsageDisplay";

// const handleHome = () => { 
//   window.location.href = '/tips';
// };

// function History() {
//   const [overallUsage, setOverallUsage] = useState(0);
//   const [applianceData, setApplianceData] = useState([]);

//   const handleSubmit = (overallUsage) => {
//     setOverallUsage(overallUsage);
//     calculateUsage(overallUsage);
//   };

//   const calculateUsage = (overallUsage) => {
//     const appliances = [
//       { appliance: "Fan", power: 75, hours: 8 },  // Power in watts, avg usage in hours
//       { appliance: "Light (LED)", power: 20, hours: 6 },
//       { appliance: "AC", power: 1500, hours: 5 },
//       { appliance: "Geyser", power: 2000, hours: 0.5 },
//       { appliance: "Fridge", power: 150, hours: 24 },
//       { appliance: "Washing Machine", power: 1000, hours: 0.5 },
//       { appliance: "TV", power: 100, hours: 2 },
//       { appliance: "Charger", power: 10, hours: 4 },
//     ];

//     const totalPowerRequired = appliances.reduce(
//       (sum, appliance) => sum + (appliance.power * appliance.hours) / 1000, 
//       0
//     );

//     // Calculate scaling factor based on the total power needed vs overall usage
//     const scalingFactor = overallUsage / totalPowerRequired;

//     const applianceUsage = appliances.map((appliance) => {
//       const applianceUsageInKWh = ((appliance.power * appliance.hours) / 1000) * scalingFactor;
//       return { appliance: appliance.appliance, usage: applianceUsageInKWh.toFixed(2) };
//     });

//     setApplianceData(applianceUsage);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <h1 className="text-3xl font-bold my-5 text-center text-indigo-700">Appliance Energy Usage Estimator</h1>
//       <ApplianceUsageForm onSubmit={handleSubmit} />
//       {overallUsage > 0 && <ApplianceUsageDisplay applianceData={applianceData} />}

//       <div>
//         <button className="bg-blue-400 mt-4"  onClick={handleHome}>tips</button>
//       </div>
//     </div>
//   );
// }

// export default History;





import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiBarChart2, FiInfo, FiClock, FiZap, 
  FiCalendar, FiTrendingUp, FiTrendingDown, FiAlertTriangle 
} from 'react-icons/fi';
import { 
  FaFan, FaLightbulb, FaSnowflake, FaTv, 
  FaBatteryFull, FaTshirt, FaTemperatureHigh 
} from 'react-icons/fa';
import { IoMdWater } from 'react-icons/io';

// Mock function to simulate fetching your 1000-appliance dataset
const fetchApplianceDatabase = async () => {
  // In a real app, this would be an API call to your backend
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    brand: ['LG', 'Samsung', 'Voltas', 'Daikin', 'Whirlpool', 'Godrej', 'Haier'][Math.floor(Math.random() * 7)],
    type: ['AC', 'Refrigerator', 'Washing Machine', 'TV', 'Geyser', 'Fan', 'Light'][Math.floor(Math.random() * 7)],
    model: `MOD-${Math.floor(1000 + Math.random() * 9000)}`,
    powerRating: Math.floor(50 + Math.random() * 3000), // watts
    starRating: Math.floor(1 + Math.random() * 5), // 1-5 stars
    monthlyUsage: (30 + Math.random() * 300).toFixed(2) // kWh/month
  }));
};

const ApplianceInputForm = ({ onSubmit }) => {
  const [applianceData, setApplianceData] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [daysPerMonth, setDaysPerMonth] = useState(30);

  useEffect(() => {
    // Load appliance database on component mount
    const loadData = async () => {
      const data = await fetchApplianceDatabase();
      setApplianceData(data);
    };
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAppliance || !hoursPerDay) return;

    const monthlyUsage = (
      (selectedAppliance.powerRating * hoursPerDay * daysPerMonth) / 1000
    ).toFixed(2);

    onSubmit({
      ...selectedAppliance,
      hoursPerDay: parseFloat(hoursPerDay),
      calculatedUsage: parseFloat(monthlyUsage)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiZap className="mr-2 text-yellow-500" />
        Add Your Appliance
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Appliance
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSelectedAppliance(JSON.parse(e.target.value))}
            required
          >
            <option value="">-- Select an appliance --</option>
            {applianceData.map((appliance) => (
              <option key={appliance.id} value={JSON.stringify(appliance)}>
                {appliance.brand} {appliance.type} ({appliance.model}) - {appliance.powerRating}W ★{appliance.starRating}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours used per day
            </label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
              max="24"
              step="0.5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days used per month
            </label>
            <input
              type="number"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="1"
              max="31"
              required
            />
          </div>
        </div>

        {selectedAppliance && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Estimated Monthly Usage:</strong> {(
                (selectedAppliance.powerRating * (hoursPerDay || 0) * daysPerMonth) / 1000
              ).toFixed(2)} kWh
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add Appliance
        </button>
      </form>
    </div>
  );
};

const ApplianceComparison = ({ userAppliances, database }) => {
  // Find similar appliances in the database for comparison
  const getComparisons = () => {
    return userAppliances.map(userApp => {
      const similar = database.filter(dbApp => 
        dbApp.type === userApp.type && 
        dbApp.powerRating >= userApp.powerRating * 0.9 && 
        dbApp.powerRating <= userApp.powerRating * 1.1
      ).slice(0, 5); // Get top 5 similar appliances
      
      const avgUsage = similar.reduce((sum, app) => sum + parseFloat(app.monthlyUsage), 0) / similar.length;
      
      return {
        userApp,
        similar,
        avgUsage: avgUsage || 0,
        comparison: userApp.calculatedUsage - avgUsage
      };
    });
  };

  const comparisons = getComparisons();
  const highConsumption = comparisons.filter(c => c.comparison > 0).sort((a, b) => b.comparison - a.comparison);

  return (
    <div className="mt-6 space-y-6">
      {highConsumption.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiAlertTriangle className="text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-red-800">High Consumption Appliances</h3>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {highConsumption.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-red-100">
                <div className="flex justify-between">
                  <span className="font-medium">{item.userApp.brand} {item.userApp.type}</span>
                  <span className="text-red-600">+{item.comparison.toFixed(2)} kWh</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Your usage: {item.userApp.calculatedUsage} kWh vs similar avg: {item.avgUsage.toFixed(2)} kWh
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Appliances vs Database Average</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appliance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Usage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Similar</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisons.map((comp, index) => (
                <tr key={index} className={comp.comparison > 0 ? 'bg-red-50' : 'bg-green-50'}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {comp.userApp.brand} {comp.userApp.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {comp.userApp.calculatedUsage} kWh
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {comp.avgUsage.toFixed(2)} kWh
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {comp.comparison > 0 ? (
                      <span className="text-red-600">+{comp.comparison.toFixed(2)} kWh</span>
                    ) : (
                      <span className="text-green-600">{comp.comparison.toFixed(2)} kWh</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const [applianceDatabase, setApplianceDatabase] = useState([]);
  const [userAppliances, setUserAppliances] = useState([]);
  const [activeTab, setActiveTab] = useState('input');

  useEffect(() => {
    // Load appliance database
    const loadData = async () => {
      const data = await fetchApplianceDatabase();
      setApplianceDatabase(data);
    };
    loadData();
  }, []);

  const handleAddAppliance = (newAppliance) => {
    setUserAppliances([...userAppliances, newAppliance]);
    setActiveTab('comparison');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appliance Energy Comparison</h1>
          <p className="mt-2 text-lg text-gray-600">
            Compare your appliance usage with our database of 1000+ appliances
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === 'input' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Add Appliances
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === 'comparison' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              disabled={userAppliances.length === 0}
            >
              View Comparison
            </button>
          </div>
        </div>

        {activeTab === 'input' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ApplianceInputForm onSubmit={handleAddAppliance} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Added Appliances</h3>
              {userAppliances.length === 0 ? (
                <p className="text-gray-500">No appliances added yet</p>
              ) : (
                <ul className="space-y-3">
                  {userAppliances.map((app, index) => (
                    <li key={index} className="border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{app.brand} {app.type}</span>
                        <span>{app.calculatedUsage} kWh/mo</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {app.hoursPerDay}h/day × {app.daysPerMonth}days
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <ApplianceComparison 
            userAppliances={userAppliances} 
            database={applianceDatabase} 
          />
        )}
      </div>
    </div>
  );
};

export default HistoryPage;