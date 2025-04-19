// // // backend/server.js
// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Initialize Gemini API
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // app.post('/api/ask-gemini', async (req, res) => {
// //   try {
// //     const { question } = req.body;
    
// //     if (!question) {
// //       return res.status(400).json({ error: 'Question is required' });
// //     }

// //     // For text-only input, use the gemini-pro model
// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// //     const result = await model.generateContent(question);
// //     const response = await result.response;
// //     const text = response.text();

// //     console.log('Gemini response:', text);
// //     res.json({ answer: text });
// //   } catch (error) {
// //     console.error('Error calling Gemini API:', error);
// //     res.status(500).json({ error: 'Failed to get response from Gemini' });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });




// // // backend/server.js
// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Initialize Gemini API
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // app.post('/api/calculate-energy', async (req, res) => {
// //   try {
// //     const { householdData } = req.body;
    
// //     if (!householdData || !householdData.appliances || householdData.appliances.length === 0) {
// //       return res.status(400).json({ error: 'Household data with appliances is required' });
// //     }

// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// //     // Create a detailed prompt for Gemini
// //     const prompt = `Analyze this household energy consumption data and provide:
// //     1. Energy consumption summary for each appliance (in kWh)
// //     2. Daily and monthly cost estimates (assuming $0.15 per kWh)
// //     3. Energy-saving recommendations
    
// //     Household details:
// //     - Number of residents: ${householdData.residents || 'Not specified'}
// //     - Home size: ${householdData.homeSize || 'Not specified'}
    
// //     Appliances:
// //     ${householdData.appliances.map(app => `
// //     - ${app.name}: ${app.wattage}W, used ${app.hoursPerDay} hours/day, ${app.daysPerWeek || 7} days/week
// //     `).join('')}
    
// //     Provide the response in clear markdown format with sections.`;

// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();

// //     console.log('Gemini analysis:', text);
// //     res.json({ analysis: text });
// //   } catch (error) {
// //     console.error('Error calling Gemini API:', error);
// //     res.status(500).json({ error: 'Failed to analyze energy data' });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });




// // // backend/server.js
// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Initialize Gemini API
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // app.post('/api/calculate-energy', async (req, res) => {
// //   try {
// //     const { householdData } = req.body;
    
// //     if (!householdData || !householdData.appliances || householdData.appliances.length === 0) {
// //       return res.status(400).json({ error: 'Household data with appliances is required' });
// //     }

// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// //     // Create a detailed prompt for Gemini
// //     const prompt = `Analyze this household energy consumption data and provide:
// //     1. Energy consumption summary for each appliance (in kWh)
// //     2. Daily, weekly, and monthly cost estimates (assuming $0.15 per kWh)
// //     3. Energy-saving recommendations
// //     4. JSON format data for visualization with this structure:
// //     {
// //       "summary": "text summary",
// //       "dailyUsage": { "appliance1": kWh, "appliance2": kWh },
// //       "weeklyUsage": { "appliance1": kWh, "appliance2": kWh },
// //       "monthlyUsage": { "appliance1": kWh, "appliance2": kWh },
// //       "recommendations": ["tip1", "tip2"]
// //     }
    
// //     Household details:
// //     - Number of residents: ${householdData.residents || 'Not specified'}
// //     - BHK type: ${householdData.bhk || 'Not specified'}
    
// //     Appliances:
// //     ${householdData.appliances.map(app => `
// //     - ${app.name}: ${app.wattage}W, used ${app.hoursPerDay} hours/day, ${app.daysPerWeek || 7} days/week
// //     `).join('')}`;

// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();

// //     // Extract JSON data if present in the response
// //     let jsonData = {};
// //     try {
// //       const jsonMatch = text.match(/\{[\s\S]*\}/);
// //       if (jsonMatch) {
// //         jsonData = JSON.parse(jsonMatch[0]);
// //       }
// //     } catch (e) {
// //       console.error('Error parsing JSON from Gemini:', e);
// //     }

// //     console.log('Gemini analysis:', text);
// //     res.json({ 
// //       analysis: text,
// //       chartData: jsonData
// //     });
// //   } catch (error) {
// //     console.error('Error calling Gemini API:', error);
// //     res.status(500).json({ error: 'Failed to analyze energy data' });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });




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
    
//     if (!householdData?.appliances?.length) {
//       return res.status(400).json({ error: 'Appliance data required' });
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//     const costPerKwh = householdData.costPerKwh || 0.15;

//     const prompt = `
//       Analyze these appliances and return:
//       1. kWh per day/week/month
//       2. Cost calculations ($${costPerKwh}/kWh)
//       3. Comparison summary

//       Return JSON format:
//       {
//         "summary": "text summary",
//         "appliances": [
//           {
//             "name": "Appliance1",
//             "dailyKwh": 1.5,
//             "weeklyKwh": 10.5,
//             "monthlyKwh": 45,
//             "dailyCost": 0.23,
//             "weeklyCost": 1.58,
//             "monthlyCost": 6.75
//           }
//         ],
//         "totalDailyKwh": 4.2,
//         "totalMonthlyCost": 18.50
//       }

//       Data: ${JSON.stringify(householdData.appliances)}
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
    
//     try {
//       const jsonMatch = response.text().match(/\{[\s\S]*\}/);
//       const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Invalid response format" };
//       res.json(analysis);
//     } catch (e) {
//       throw new Error("Failed to parse Gemini response");
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Analysis failed' });
//   }
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Real appliance benchmarks (Source: Bureau of Energy Efficiency India)
const APPLIANCE_STANDARDS = {
  "Refrigerator": { wattage: 150, usage: 24 },
  "LED TV": { wattage: 80, usage: 4 },
  "AC (1.5 Ton)": { wattage: 1500, usage: 8 },
  "Ceiling Fan": { wattage: 75, usage: 12 },
  "Washing Machine": { wattage: 500, usage: 1 },
  "Laptop": { wattage: 50, usage: 6 }
};

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/calculate-energy', async (req, res) => {
  try {
    const { householdData } = req.body;
    const costPerKwh = householdData.costPerKwh || 6.5; // ₹6.5/kWh avg in India
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Analyze appliance data for Indian household:
    - Rate: ₹${costPerKwh}/kWh
    - Appliances: ${JSON.stringify(householdData.appliances)}
    
    Return JSON with:
    - kWh/day/week/month
    - Costs in ₹
    - 3 conservation tips per appliance
    - Comparison to BEE 5-star rated appliances
    
    Format:
    {
      "summary": "...",
      "appliances": [
        {
          "name": "AC",
          "dailyKwh": 12,
          "monthlyCost": 2340,
          "tips": ["Use at 24°C", "Clean filters monthly"],
          "beeComparison": "Your AC uses 20% more than 5-star model"
        }
      ],
      "totals": {
        "monthlyKwh": 320,
        "monthlyCost": 2080
      }
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonMatch = response.text().match(/\{[\s\S]*\}/);
    
    res.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Invalid response" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get('/api/standard-appliances', (req, res) => {
  res.json(APPLIANCE_STANDARDS);
});

app.listen(port, () => console.log(`Server running on port ${port}`));




