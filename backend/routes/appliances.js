const express = require('express');
const router = express.Router();
const Appliance = require('../models/Appliance');

// Get all appliances
router.get('/', async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.json(appliances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new appliance
router.post('/', async (req, res) => {
  const { name, powerPerHour } = req.body;
  const appliance = new Appliance({ name, powerPerHour });
  try {
    const newAppliance = await appliance.save();
    res.status(201).json(newAppliance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
