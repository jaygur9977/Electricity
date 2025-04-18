// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appliances')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Appliance Model
const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  features: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Appliance = mongoose.model('Appliance', applianceSchema);

// Routes
app.get('/api/appliances', async (req, res) => {
  try {
    const appliances = await Appliance.find().sort({ createdAt: -1 });
    res.json(appliances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/appliances', async (req, res) => {
  const appliance = new Appliance({
    name: req.body.name,
    model: req.body.model,
    image: req.body.image,
    price: req.body.price,
    features: req.body.features
  });

  try {
    const newAppliance = await appliance.save();
    res.status(201).json(newAppliance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/appliances/:id', async (req, res) => {
  try {
    const updatedAppliance = await Appliance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAppliance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/appliances/:id', async (req, res) => {
  try {
    await Appliance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appliance deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));