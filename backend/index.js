require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appliances', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Consumption Schema
const ConsumptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  consumption: { type: Number, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Consumption = mongoose.model('Consumption', ConsumptionSchema);

// Weekly Data Schema
const WeeklyDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  days: [{
    day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    consumption: Number,
    cost: Number
  }],
  totalConsumption: Number,
  totalCost: Number
});

const WeeklyData = mongoose.model('WeeklyData', WeeklyDataSchema);

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add Consumption Data
app.post('/api/consumption', authenticate, async (req, res) => {
  try {
    const { date, consumption, cost } = req.body;
    const newConsumption = new Consumption({
      userId: req.user._id,
      date: new Date(date),
      consumption,
      cost
    });
    await newConsumption.save();
    res.status(201).send(newConsumption);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add Weekly Data
app.post('/api/weekly', authenticate, async (req, res) => {
  try {
    const { weekStart, weekEnd, days } = req.body;
    const totalConsumption = days.reduce((sum, day) => sum + day.consumption, 0);
    const totalCost = days.reduce((sum, day) => sum + day.cost, 0);
    
    const newWeeklyData = new WeeklyData({
      userId: req.user._id,
      weekStart: new Date(weekStart),
      weekEnd: new Date(weekEnd),
      days,
      totalConsumption,
      totalCost
    });
    
    await newWeeklyData.save();
    res.status(201).send(newWeeklyData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get Historical Data
app.get('/api/historical', authenticate, async (req, res) => {
  try {
    const data = await Consumption.find({ userId: req.user._id })
      .sort({ date: 1 })
      .limit(60); // Last 60 days (2 months)
    
    const formattedData = data.map(item => ({
      date: item.date.toISOString().split('T')[0],
      consumption: item.consumption,
      cost: item.cost
    }));
    
    res.send(formattedData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get Weekly Data
app.get('/api/weekly', authenticate, async (req, res) => {
  try {
    const data = await WeeklyData.find({ userId: req.user._id })
      .sort({ weekStart: -1 })
      .limit(4); // Last 4 weeks
    
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));