import React, { useState } from "react";

const ApplianceUsage = () => {
  const [totalBill, setTotalBill] = useState(""); // Previous month's total bill in kWh
  const [totalTodayUsage, setTotalTodayUsage] = useState(""); // Today's total usage in kWh
  const [applianceData, setApplianceData] = useState([]);

  const appliances = [
    { name: "Fan", power: 75, hours: 8 },
    { name: "Light (LED)", power: 20, hours: 6 },
    { name: "AC", power: 1500, hours: 5 },
    { name: "Geyser", power: 2000, hours: 0.5 },
    { name: "Fridge", power: 150, hours: 24 },
    { name: "Washing Machine", power: 1000, hours: 0.5 },
    { name: "TV", power: 100, hours: 2 },
    { name: "Charger", power: 10, hours: 4 }
  ];

  const calculateApplianceUsage = () => {
    if (!totalBill || !totalTodayUsage) return;

    // Calculate the total energy required for all appliances today
    const totalPowerRequired = appliances.reduce((sum, appliance) => {
      return sum + ((appliance.power * appliance.hours * 30) / 1000);  // For 30 days of the month
    }, 0);

    // Scaling factor for the appliances based on the previous month's total bill
    const scalingFactor = totalBill / totalPowerRequired;

    // Calculate the appliance-wise daily usage
    const applianceUsage = appliances.map((appliance) => {
      const dailyUsage = ((appliance.power * appliance.hours * 30) / 1000) * scalingFactor;
      return {
        appliance: appliance.name,
        dailyUsage: dailyUsage.toFixed(2)  // Rounded to 2 decimal places
      };
    });

    // Update the state with appliance data
    setApplianceData(applianceUsage);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Energy Usage Analysis</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Previous Month's Total Bill (in kWh):</label>
        <input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
          placeholder="Enter total bill"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Today's Total Usage (in kWh):</label>
        <input
          type="number"
          value={totalTodayUsage}
          onChange={(e) => setTotalTodayUsage(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
          placeholder="Enter today's total usage"
        />
      </div>
      <button
        onClick={calculateApplianceUsage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
      >
        Calculate Appliance Usage
      </button>

      {applianceData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Appliance Usage for the Previous Month:</h3>
          <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Appliance</th>
                <th className="px-4 py-2 border">Daily Usage (in kWh)</th>
              </tr>
            </thead>
            <tbody>
              {applianceData.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{item.appliance}</td>
                  <td className="px-4 py-2 border">{item.dailyUsage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplianceUsage;