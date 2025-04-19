// // backend/server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post('/api/ask-gemini', async (req, res) => {
//   try {
//     const { question } = req.body;
    
//     if (!question) {
//       return res.status(400).json({ error: 'Question is required' });
//     }

//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const result = await model.generateContent(question);
//     const response = await result.response;
//     const text = response.text();

//     console.log('Gemini response:', text);
//     res.json({ answer: text });
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     res.status(500).json({ error: 'Failed to get response from Gemini' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// // backend/server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post('/api/calculate-energy', async (req, res) => {
//   try {
//     const { householdData } = req.body;
    
//     if (!householdData || !householdData.appliances || householdData.appliances.length === 0) {
//       return res.status(400).json({ error: 'Household data with appliances is required' });
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     // Create a detailed prompt for Gemini
//     const prompt = `Analyze this household energy consumption data and provide:
//     1. Energy consumption summary for each appliance (in kWh)
//     2. Daily and monthly cost estimates (assuming $0.15 per kWh)
//     3. Energy-saving recommendations
    
//     Household details:
//     - Number of residents: ${householdData.residents || 'Not specified'}
//     - Home size: ${householdData.homeSize || 'Not specified'}
    
//     Appliances:
//     ${householdData.appliances.map(app => `
//     - ${app.name}: ${app.wattage}W, used ${app.hoursPerDay} hours/day, ${app.daysPerWeek || 7} days/week
//     `).join('')}
    
//     Provide the response in clear markdown format with sections.`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     console.log('Gemini analysis:', text);
//     res.json({ analysis: text });
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     res.status(500).json({ error: 'Failed to analyze energy data' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/calculate-energy', async (req, res) => {
  try {
    const { householdData } = req.body;
    
    if (!householdData || !householdData.appliances || householdData.appliances.length === 0) {
      return res.status(400).json({ error: 'Household data with appliances is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create a detailed prompt for Gemini
    const prompt = `Analyze this household energy consumption data and provide:
    1. Energy consumption summary for each appliance (in kWh)
    2. Daily, weekly, and monthly cost estimates (assuming $0.15 per kWh)
    3. Energy-saving recommendations
    4. JSON format data for visualization with this structure:
    {
      "summary": "text summary",
      "dailyUsage": { "appliance1": kWh, "appliance2": kWh },
      "weeklyUsage": { "appliance1": kWh, "appliance2": kWh },
      "monthlyUsage": { "appliance1": kWh, "appliance2": kWh },
      "recommendations": ["tip1", "tip2"]
    }
    
    Household details:
    - Number of residents: ${householdData.residents || 'Not specified'}
    - BHK type: ${householdData.bhk || 'Not specified'}
    
    Appliances:
    ${householdData.appliances.map(app => `
    - ${app.name}: ${app.wattage}W, used ${app.hoursPerDay} hours/day, ${app.daysPerWeek || 7} days/week
    `).join('')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON data if present in the response
    let jsonData = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Error parsing JSON from Gemini:', e);
    }

    console.log('Gemini analysis:', text);
    res.json({ 
      analysis: text,
      chartData: jsonData
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to analyze energy data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});