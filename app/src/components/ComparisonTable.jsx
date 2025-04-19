// src/components/ComparisonTable.jsx
import React from 'react';

const ComparisonTable = ({ userAppliances, backendAppliances }) => {
  const compareData = userAppliances.map((userApp) => {
    const match = backendAppliances.find(
      (backApp) => backApp.name.toLowerCase() === userApp.name.toLowerCase()
    );
    return {
      ...userApp,
      backendWatts: match ? match.watts : 'N/A',
    };
  });

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comparison</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Appliance</th>
            <th className="py-2">User Watts</th>
            <th className="py-2">Backend Watts</th>
          </tr>
        </thead>
        <tbody>
          {compareData.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.watts}</td>
              <td className="py-2">{item.backendWatts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
