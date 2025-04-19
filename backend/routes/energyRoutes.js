const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energyController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Energy usage routes
router.post('/usage', energyController.logEnergyUsage);
router.get('/usage', energyController.getEnergyUsage);
router.get('/usage/summary', energyController.getUsageSummary);
router.get('/usage/trends', energyController.getUsageTrends);

// Analysis and recommendations
router.get('/analysis', energyController.getEnergyAnalysis);
router.get('/recommendations', energyController.getRecommendations);
router.get('/tips', energyController.getDailyTip);

// User management
router.post('/user', energyController.createUser);
router.put('/user', energyController.updateUser);
router.get('/user', energyController.getUser);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {
//   logEnergyUsage,
//   getEnergyUsage,
//   getUsageSummary,
//   getUsageTrends,
//   getEnergyAnalysis,
//   getRecommendations,
//   getDailyTip,
//   createUser,
//   updateUser,
//   getUser
// } = require('../controllers/energyController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Apply auth middleware to all routes
// router.use(authMiddleware);

// // Energy usage routes
// router.post('/usage', logEnergyUsage);
// router.get('/usage', getEnergyUsage);
// router.get('/usage/summary', getUsageSummary);
// router.get('/usage/trends', getUsageTrends);

// // Analysis and recommendations
// router.get('/analysis', getEnergyAnalysis);
// router.get('/recommendations', getRecommendations);
// router.get('/tips', getDailyTip);

// // User management
// router.post('/user', createUser);
// router.put('/user', updateUser);
// router.get('/user', getUser);

// module.exports = router;