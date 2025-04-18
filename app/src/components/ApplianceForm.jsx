import React, { useState } from "react";

const ApplianceUsageForm = ({ onSubmit }) => {
  const [overallUsage, setOverallUsage] = useState(0);

  const handleChange = (e) => {
    setOverallUsage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (overallUsage > 0) {
      onSubmit(overallUsage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <label className="text-lg text-indigo-600">Enter Total Energy Usage for Today (in kWh)</label>
      <input
        type="number"
        value={overallUsage}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md text-center"
        required
      />
      <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-md">
        Calculate Appliance Usage
      </button>
    </form>
  );
};

export default ApplianceUsageForm;