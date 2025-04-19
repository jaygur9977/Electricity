

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