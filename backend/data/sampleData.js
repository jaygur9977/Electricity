const sampleAppliances = Array.from({ length: 100 }, (_, i) => ({
    name: `Appliance ${i + 1}`,
    brand: `Brand ${i % 10}`,
    type: ["Fridge", "AC", "Washing Machine", "TV", "Microwave"][i % 5],
    powerConsumption: Math.floor(Math.random() * 1000) + 100, // watts/hour
  }));
  
  module.exports = sampleAppliances;
  