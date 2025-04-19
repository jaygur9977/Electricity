// Calculate cost based on power consumption (W), duration (minutes), and rate ($/kWh)
const calculateCost = (power, duration, rate) => {
    const kWh = (power * (duration / 60)) / 1000; // Convert to kWh
    return kWh * rate;
  };
  
  // Format energy (Wh) to readable string
  const formatEnergy = (wh) => {
    if (wh >= 1000) {
      return `${(wh / 1000).toFixed(2)} kWh`;
    }
    return `${wh.toFixed(2)} Wh`;
  };
  
  // Format cost to currency
  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cost);
  };
  
  module.exports = {
    calculateCost,
    formatEnergy,
    formatCost
  };