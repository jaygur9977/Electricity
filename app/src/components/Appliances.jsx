
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const Appliances = () => {
  const [appliances, setAppliances] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    image: "https://via.placeholder.com/150",
    price: "",
    features: []
  });
  const [currentFeature, setCurrentFeature] = useState("");

  // Fetch appliances from backend
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appliances");
        const data = await response.json();
        setAppliances(data);
      } catch (error) {
        console.error("Error fetching appliances:", error);
      }
    };
    fetchAppliances();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature]
      });
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedAppliance) {
        // Update existing appliance
        response = await fetch(
          `http://localhost:5000/api/appliances/${selectedAppliance._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          }
        );
      } else {
        // Add new appliance
        response = await fetch("http://localhost:5000/api/appliances", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }

      const data = await response.json();
      
      // Refresh the appliances list
      const updatedResponse = await fetch("http://localhost:5000/api/appliances");
      const updatedData = await updatedResponse.json();
      setAppliances(updatedData);
      
      // Reset form and close modal
      setShowForm(false);
      setSelectedAppliance(null);
      setFormData({
        name: "",
        model: "",
        image: "https://via.placeholder.com/150",
        price: "",
        features: []
      });
    } catch (error) {
      console.error("Error saving appliance:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/appliances/${id}`, {
        method: "DELETE"
      });
      // Refresh the appliances list
      const response = await fetch("http://localhost:5000/api/appliances");
      const data = await response.json();
      setAppliances(data);
    } catch (error) {
      console.error("Error deleting appliance:", error);
    }
  };

  const openEditForm = (appliance) => {
    setSelectedAppliance(appliance);
    setFormData({
      name: appliance.name,
      model: appliance.model,
      image: appliance.image,
      price: appliance.price,
      features: [...appliance.features]
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        Appliances
      </h1>

      <button
        onClick={() => {
          setSelectedAppliance(null);
          setShowForm(true);
        }}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
      >
        <FaPlus /> Add Appliance
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appliances.map((appliance) => (
          <div
            key={appliance._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={appliance.image}
              alt={appliance.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{appliance.name}</h2>
              <p className="text-gray-500">Model: {appliance.model}</p>
              <p className="text-green-600 font-bold mt-2">{appliance.price}</p>
              
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openEditForm(appliance)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(appliance._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedAppliance ? "Edit Appliance" : "Add New Appliance"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedAppliance(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Features</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    className="flex-1 p-2 border rounded-l"
                    placeholder="Add a feature"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {selectedAppliance ? "Update Appliance" : "Add Appliance"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedAppliance && !showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedAppliance.name}</h2>
              <button
                onClick={() => setSelectedAppliance(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <img
              src={selectedAppliance.image}
              alt={selectedAppliance.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Model:</span> {selectedAppliance.model}
            </p>
            <p className="text-green-600 font-bold mb-4">
              <span className="font-semibold text-gray-700">Price:</span> {selectedAppliance.price}
            </p>

            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedAppliance.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className="flex justify-between">
              <button
                onClick={() => openEditForm(selectedAppliance)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedAppliance._id);
                  setSelectedAppliance(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appliances;