const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  type: String,
  starRating: Number,
  addedTimeAgo: Date,
  warrantyDate: Date,
  guaranteeDate: Date,
  usagePerDay: Number
});

const Appliance = mongoose.model('Appliance', applianceSchema);

module.exports = Appliance;
