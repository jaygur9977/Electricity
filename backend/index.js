


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appliances')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Appliance Model
// const applianceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   model: { type: String, required: true },
//   image: { type: String, required: true },
//   price: { type: String, required: true },
//   features: { type: [String], required: true },
//   starRating: { type: Number, min: 1, max: 5, required: true },
//   warranty: { type: String, required: true },  // e.g., "12 months"
//   guarantee: { type: String, required: true },  // e.g., "24 months"
//   createdAt: { type: Date, default: Date.now }
// });

// const Appliance = mongoose.model('Appliance', applianceSchema);

// // Routes
// app.get('/api/appliances', async (req, res) => {
//   try {
//     const appliances = await Appliance.find().sort({ createdAt: -1 });
//     res.json(appliances);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/api/appliances', async (req, res) => {
//     const appliance = new Appliance({
//       name: req.body.name,
//       model: req.body.model,
//       image: req.body.image,
//       price: req.body.price,
//       features: req.body.features || [], // Ensure features is always an array
//       starRating: req.body.starRating,
//       warranty: req.body.warranty,
//       guarantee: req.body.guarantee
//     });
  
//     try {
//       const newAppliance = await appliance.save();
//       res.status(201).json(newAppliance);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  

//   app.put('/api/appliances/:id', async (req, res) => {
//     try {
//       const updatedAppliance = await Appliance.findByIdAndUpdate(
//         req.params.id,
//         {
//           name: req.body.name,
//           model: req.body.model,
//           image: req.body.image,
//           price: req.body.price,
//           features: req.body.features || [],
//           starRating: req.body.starRating,
//           warranty: req.body.warranty,
//           guarantee: req.body.guarantee
//         },
//         { new: true }
//       );
//       res.json(updatedAppliance);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  

// app.delete('/api/appliances/:id', async (req, res) => {
//   try {
//     await Appliance.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Appliance deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




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
  starRating: { type: Number, min: 1, max: 5, required: true },
  warranty: { type: String, required: true },
  guarantee: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Appliance = mongoose.model('Appliance', applianceSchema);

// Routes - Appliance CRUD
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
    features: req.body.features || [],
    starRating: req.body.starRating,
    warranty: req.body.warranty,
    guarantee: req.body.guarantee
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
      {
        name: req.body.name,
        model: req.body.model,
        image: req.body.image,
        price: req.body.price,
        features: req.body.features || [],
        starRating: req.body.starRating,
        warranty: req.body.warranty,
        guarantee: req.body.guarantee
      },
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

// Tips Generation Route
app.post('/generate-tip', (req, res) => {
  const data = req.body;

  const tips = [];

  data.forEach((item) => {
    if (item.appliance === 'AC' && item.usage > 2) {
      tips.push(`❄️ Your AC used ${item.usage} kWh on ${item.date}. Try setting a timer to reduce usage and save up to ₹150/month.`);
    }

    if (item.appliance === 'Geyser' && item.duration > 1) {
      tips.push(`💧 Your geyser ran for ${item.duration} hours on ${item.date}. Reduce to 15 mins to cut bills by 20%.`);
    }

    if (item.appliance === 'Lights' && item.usage > 1.5) {
      tips.push(`💡 Lights were on unusually long on ${item.date}. Try turning off during daylight.`);
    }
  });

  res.json({ tips: tips.length ? tips : ['👍 All looks good! No unusual usage detected.'] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
