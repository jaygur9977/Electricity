const express = require('express');
const router = express.Router();
const Appliance = require('../models/Appliance');

// POST route to add a new appliance
router.post('/add', async (req, res) => {
  try {
    const appliance = new Appliance(req.body);
    await appliance.save();
    res.status(201).send(appliance);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to get all appliances
router.get('/all', async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.status(200).send(appliances);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
