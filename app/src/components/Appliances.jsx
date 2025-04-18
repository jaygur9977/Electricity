


import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaStar } from "react-icons/fa";

const Appliances = () => {
  const [appliances, setAppliances] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    image: "https://via.placeholder.com/150",
    price: "",
    features: [],
    starRating: 3,
    warranty: "",
    guarantee: "",
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

  const handleStarClick = (rating) => {
    setFormData({ ...formData, starRating: rating });
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
            body: JSON.stringify({
              ...formData,
              warranty: formData.warranty, // Ensure warranty is formatted correctly
              guarantee: formData.guarantee, // Ensure guarantee is formatted correctly
            }),
          }
        );
      } else {
        // Add new appliance
        response = await fetch("http://localhost:5000/api/appliances", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            warranty: formData.warranty, // Ensure warranty is formatted correctly
            guarantee: formData.guarantee, // Ensure guarantee is formatted correctly
          }),
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
        features: [],
        starRating: 3,
        warranty: "",
        guarantee: "",
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
      features: [...appliance.features],
      starRating: appliance.starRating || 3,
      warranty: appliance.warranty,
      guarantee: appliance.guarantee,
    });
    setShowForm(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-600">
        Appliances
      </h1>

      <button
        onClick={() => {
          setSelectedAppliance(null);
          setShowForm(true);
        }}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 mx-auto"
      >
        <FaPlus /> Add Appliance
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {appliances.map((appliance) => (
          <div
            key={appliance._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={appliance.image}
              alt={appliance.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold">{appliance.name}</h2>
              <p className="text-gray-500 text-sm md:text-base">Model: {appliance.model}</p>
              <p className="text-green-600 font-bold mt-1 md:mt-2">{appliance.price}</p>

              <div className="mt-2">
                {renderStars(appliance.starRating || 3)}
              </div>
              
              <div className="text-xs md:text-sm text-gray-500 mt-2">
                <p>Warranty: {appliance.warranty}</p>
                <p>Guarantee: {appliance.guarantee}</p>
              </div>

              <div className="flex justify-between mt-3 md:mt-4">
                <button
                  onClick={() => openEditForm(appliance)}
                  className="px-2 md:px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm md:text-base"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(appliance._id)}
                  className="px-2 md:px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 text-sm md:text-base"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal - Responsive */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl md:text-2xl font-bold">
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

            <form onSubmit={handleSubmit} className="p-4 md:p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Star Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className={`text-2xl ${star <= formData.starRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Warranty</label>
                  <input
                    type="date"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Guarantee</label>
                  <input
                    type="date"
                    name="guarantee"
                    value={formData.guarantee}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Features</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      className="flex-1 p-2 border rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {selectedAppliance ? "Update Appliance" : "Add Appliance"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appliances;