import express from 'express';

const router = express.Router();

// POST /api/compare
// Expects: [{ name: 'Fan', hoursPerDay: 5, wattPerHour: 70 }, {...}]
router.post('/', (req, res) => {
  const userData = req.body; // Array of appliances
  const dbData = req.app.locals.sampleData;

  const results = userData.map((userAppliance) => {
    // Try to find best match from mock DB
    const matches = dbData.filter(item => item.name.toLowerCase() === userAppliance.name.toLowerCase());
    const closest = matches.length ? matches[0] : null;

    const userDailyConsumption = userAppliance.hoursPerDay * userAppliance.wattPerHour;
    const dbAverageConsumption = closest ? closest.averageConsumption : null;

    return {
      name: userAppliance.name,
      userDailyConsumption,
      dbAverageConsumption,
      warning: dbAverageConsumption && userDailyConsumption > dbAverageConsumption * 1.2
        ? 'High energy usage compared to average.'
        : 'Usage is within normal range.'
    };
  });

  res.json({ comparison: results });
});

export default router;
