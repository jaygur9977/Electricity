const express = require('express');
const router = express.Router();
const UsageData = require('../models/UsageData');

router.post('/', async (req, res) => {
  try {
    const newData = new UsageData(req.body);
    const saved = await newData.save();
    res.status(201).json({ message: 'Data saved successfully', data: saved });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
