const express = require('express');
const router = express.Router();
const UserUsage = require('../models/UserUsage');

// Get user usage history
router.get('/', async (req, res) => {
  try {
    const usageHistory = await UserUsage.find().populate('appliances.applianceId');
    res.json(usageHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new user usage data
router.post('/', async (req, res) => {
  const { appliances } = req.body; // Expecting an array of { applianceId, hoursUsed }
  const userUsage = new UserUsage({ appliances });
  try {
    const newUserUsage = await userUsage.save();
    res.status(201).json(newUserUsage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
