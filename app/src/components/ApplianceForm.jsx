// src/components/ApplianceForm.jsx
import React, { useState } from 'react';

const ApplianceForm = ({ onAdd }) => {
  const [appliance, setAppliance] = useState({ name: '', hours: '', watts: '' });

  const handleChange = (e) => {
    setAppliance({ ...appliance, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (appliance.name && appliance.hours && appliance.watts) {
      onAdd(appliance);
      setAppliance({ name: '', hours: '', watts: '' });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Appliance</h2>
      <input
        type="text"
        name="name"
        placeholder="Appliance Name"
        value={appliance.name}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        name="hours"
        placeholder="Hours Used"
        value={appliance.hours}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        name="watts"
        placeholder="Watts"
        value={appliance.watts}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
};

export default ApplianceForm;
