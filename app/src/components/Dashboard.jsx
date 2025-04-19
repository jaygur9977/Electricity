import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FiActivity, FiTrendingUp, FiCalendar, FiHome, FiClock, FiAlertCircle, FiDollarSign } from 'react-icons/fi';
Chart.register(...registerables);

const UsageDashboard = () => {
  // Sample initial data
  const initialData = [
    { 
      month: 'January 2023', 
      days: 31,
      totalUnits: 320, 
      totalCost: 2400,
      weeks: [
        { week: 1, days: 7, units: 70, cost: 525, peakDay: 3 },
        { week: 2, days: 7, units: 75, cost: 562.5, peakDay: 5 },
        { week: 3, days: 7, units: 80, cost: 600, peakDay: 6 },
        { week: 4, days: 7, units: 75, cost: 562.5, peakDay: 2 },
        { week: 5, days: 3, units: 20, cost: 150, peakDay: 1 }
      ]
    },
    { 
      month: 'February 2023', 
      days: 28,
      totalUnits: 280, 
      totalCost: 2100,
      weeks: [
        { week: 1, days: 7, units: 65, cost: 487.5, peakDay: 4 },
        { week: 2, days: 7, units: 70, cost: 525, peakDay: 6 },
        { week: 3, days: 7, units: 75, cost: 562.5, peakDay: 5 },
        { week: 4, days: 7, units: 70, cost: 525, peakDay: 3 }
      ]
    },
    { 
      month: 'March 2023', 
      days: 31,
      totalUnits: 310, 
      totalCost: 2325,
      weeks: [
        { week: 1, days: 7, units: 75, cost: 562.5, peakDay: 6 },
        { week: 2, days: 7, units: 70, cost: 525, peakDay: 3 },
        { week: 3, days: 7, units: 80, cost: 600, peakDay: 5 },
        { week: 4, days: 7, units: 65, cost: 487.5, peakDay: 2 },
        { week: 5, days: 3, units: 20, cost: 150, peakDay: 1 }
      ]
    },
    { 
      month: 'April 2023', 
      days: 30,
      totalUnits: 290, 
      totalCost: 2175,
      weeks: [
        { week: 1, days: 7, units: 70, cost: 525, peakDay: 5 },
        { week: 2, days: 7, units: 65, cost: 487.5, peakDay: 3 },
        { week: 3, days: 7, units: 75, cost: 562.5, peakDay: 6 },
        { week: 4, days: 7, units: 70, cost: 525, peakDay: 4 },
        { week: 5, days: 2, units: 10, cost: 75, peakDay: 1 }
      ]
    },
    { 
      month: 'May 2023', 
      days: 31,
      totalUnits: 350, 
      totalCost: 2625,
      weeks: [
        { week: 1, days: 7, units: 80, cost: 600, peakDay: 6 },
        { week: 2, days: 7, units: 85, cost: 637.5, peakDay: 5 },
        { week: 3, days: 7, units: 90, cost: 675, peakDay: 7 },
        { week: 4, days: 7, units: 75, cost: 562.5, peakDay: 3 },
        { week: 5, days: 3, units: 20, cost: 150, peakDay: 1 }
      ]
    },
    { 
      month: 'June 2023', 
      days: 30,
      totalUnits: 400, 
      totalCost: 3000,
      weeks: [
        { week: 1, days: 7, units: 90, cost: 675, peakDay: 6 },
        { week: 2, days: 7, units: 95, cost: 712.5, peakDay: 5 },
        { week: 3, days: 7, units: 105, cost: 787.5, peakDay: 7 },
        { week: 4, days: 7, units: 90, cost: 675, peakDay: 4 },
        { week: 5, days: 2, units: 20, cost: 150, peakDay: 1 }
      ]
    }
  ];

  const [data, setData] = useState(initialData);
  const [selectedMonth, setSelectedMonth] = useState(initialData[initialData.length - 1]);
  const [selectedWeek, setSelectedWeek] = useState(initialData[initialData.length - 1].weeks[0]);
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'weekly'
  const [ratePerUnit, setRatePerUnit] = useState(7.5); // ₹ per kWh

  // Generate daily data for the selected week
  const generateDailyData = (week) => {
    const avgDailyUsage = week.units / week.days;
    const daily = [];
    
    for (let i = 1; i <= week.days; i++) {
      const dayOfWeek = new Date().getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let usage = avgDailyUsage * (0.8 + Math.random() * 0.4);
      if (i === week.peakDay) usage *= 1.5;
      if (isWeekend) usage *= 1.3;
      
      daily.push({
        day: i,
        date: `${i}/${selectedMonth.month.split(' ')[0].substring(0, 3)}`,
        units: parseFloat(usage.toFixed(2)),
        cost: parseFloat((usage * ratePerUnit).toFixed(2)),
        isWeekend,
        isPeak: i === week.peakDay
      });
    }
    
    return daily;
  };

  const [dailyData, setDailyData] = useState(generateDailyData(selectedWeek));

  useEffect(() => {
    setDailyData(generateDailyData(selectedWeek));
  }, [selectedWeek, selectedMonth]);

  // Chart data for monthly trends
  const monthlyTrendsData = {
    labels: data.map(m => m.month.split(' ')[0]),
    datasets: [
      {
        label: 'Consumption (kWh)',
        data: data.map(m => m.totalUnits),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        label: 'Cost (₹)',
        data: data.map(m => m.totalCost),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y1'
      }
    ]
  };

  // Weekly breakdown for selected month
  const weeklyBreakdownData = {
    labels: selectedMonth.weeks.map(w => `Week ${w.week}`),
    datasets: [
      {
        label: 'Weekly Consumption (kWh)',
        data: selectedMonth.weeks.map(w => w.units),
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2
      }
    ]
  };

  // Daily usage for selected week
  const dailyUsageData = {
    labels: dailyData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Usage (kWh)',
        data: dailyData.map(d => d.units),
        backgroundColor: dailyData.map(d => 
          d.isPeak ? 'rgba(239, 68, 68, 0.5)' : 
          d.isWeekend ? 'rgba(249, 115, 22, 0.5)' : 'rgba(59, 130, 246, 0.5)'
        ),
        borderColor: dailyData.map(d => 
          d.isPeak ? 'rgba(239, 68, 68, 1)' : 
          d.isWeekend ? 'rgba(249, 115, 22, 1)' : 'rgba(59, 130, 246, 1)'
        ),
        borderWidth: 1
      }
    ]
  };

  // Consumption distribution
  const consumptionDistributionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].slice(0, selectedMonth.weeks.length),
    datasets: [
      {
        data: selectedMonth.weeks.map(w => w.units),
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Add new month data
  const handleAddMonth = (e) => {
    e.preventDefault();
    const form = e.target;
    const weeks = [];
    const totalUnits = parseFloat(form.units.value);
    const days = parseInt(form.days.value);
    
    // Generate weekly data
    let remainingUnits = totalUnits;
    let weekCount = Math.ceil(days / 7);
    
    for (let i = 1; i <= weekCount; i++) {
      const weekDays = i < weekCount ? 7 : days % 7 || 7;
      const weekUnits = i < weekCount ? 
        parseFloat((totalUnits / weekCount * (0.9 + Math.random() * 0.2)).toFixed(2)) : 
        parseFloat(remainingUnits).toFixed(2);
      
      weeks.push({
        week: i,
        days: weekDays,
        units: parseFloat(weekUnits),
        cost: parseFloat((weekUnits * ratePerUnit).toFixed(2)),
        peakDay: Math.floor(Math.random() * weekDays) + 1
      });
      
      remainingUnits -= parseFloat(weekUnits);
    }
    
    const newMonth = {
      month: form.month.value,
      days: days,
      totalUnits: totalUnits,
      totalCost: parseFloat((totalUnits * ratePerUnit).toFixed(2)),
      weeks: weeks
    };
    
    setData([...data, newMonth]);
    setSelectedMonth(newMonth);
    setSelectedWeek(newMonth.weeks[0]);
    form.reset();
  };

  // Calculate savings opportunity
  const calculateSavings = () => {
    const avg = data.reduce((sum, month) => sum + month.totalUnits, 0) / data.length;
    const current = selectedMonth.totalUnits;
    const potential = current * 0.85; // 15% savings
    return {
      current,
      potential,
      savings: current - potential,
      savingsCost: (current - potential) * ratePerUnit
    };
  };

  const savingsData = calculateSavings();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Electricity Usage Analytics</h1>
          <p className="text-gray-600">Track and optimize your energy consumption</p>
        </header>
        
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                viewMode === 'monthly' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              <FiCalendar />
              <span>Monthly View</span>
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                viewMode === 'weekly' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              <FiClock />
              <span>Weekly View</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rate:</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">₹</span>
              <input
                type="number"
                value={ratePerUnit}
                onChange={(e) => setRatePerUnit(parseFloat(e.target.value))}
                step="0.1"
                min="1"
                className="pl-8 w-20 py-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <span className="text-sm text-gray-600">per kWh</span>
          </div>
        </div>
        
        {/* Month/Week Selector */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Select {viewMode === 'monthly' ? 'Month' : 'Week'}</h2>
          
          {viewMode === 'monthly' ? (
            <div className="flex flex-wrap gap-2">
              {data.map((month) => (
                <button
                  key={month.month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setSelectedWeek(month.weeks[0]);
                  }}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${
                    selectedMonth.month === month.month
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-medium">{month.month.split(' ')[0]}</span>
                  <span className="text-xs">{month.totalUnits}kWh</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedMonth.weeks.map((week) => (
                <button
                  key={week.week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${
                    selectedWeek.week === week.week
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-medium">Week {week.week}</span>
                  <span className="text-xs">{week.units}kWh</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 font-medium">Total Consumption</h3>
              <FiActivity className="text-indigo-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {viewMode === 'monthly' ? selectedMonth.totalUnits : selectedWeek.units} kWh
            </p>
            <p className="text-gray-500">
              {viewMode === 'monthly' ? 
                `${(selectedMonth.totalUnits / selectedMonth.days).toFixed(2)} kWh/day` : 
                `${(selectedWeek.units / selectedWeek.days).toFixed(2)} kWh/day`}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 font-medium">Total Cost</h3>
              <FiDollarSign className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              ₹{viewMode === 'monthly' ? selectedMonth.totalCost : selectedWeek.cost}
            </p>
            <p className="text-gray-500">
              {viewMode === 'monthly' ? 
                `₹${(selectedMonth.totalCost / selectedMonth.days).toFixed(2)}/day` : 
                `₹${(selectedWeek.cost / selectedWeek.days).toFixed(2)}/day`}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 font-medium">Savings Opportunity</h3>
              <FiTrendingUp className="text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              ₹{viewMode === 'monthly' ? savingsData.savingsCost.toFixed(2) : (savingsData.savingsCost / 4).toFixed(2)}
            </p>
            <p className="text-gray-500">
              {viewMode === 'monthly' ? 
                `${savingsData.savings.toFixed(2)} kWh (15%) possible` : 
                `${(savingsData.savings / 4).toFixed(2)} kWh possible`}
            </p>
          </div>
        </div>
        
        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Monthly Trends</h2>
              <div className="flex space-x-2">
                <button className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">Consumption</button>
                <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Cost</button>
              </div>
            </div>
            <div className="h-72">
              <Line
                data={monthlyTrendsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return context.datasetIndex === 0 ? 
                            `${context.dataset.label}: ${context.raw} kWh` : 
                            `${context.dataset.label}: ₹${context.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: { display: true, text: 'kWh' }
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: { display: true, text: '₹' },
                      grid: { drawOnChartArea: false }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Weekly Breakdown */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {viewMode === 'monthly' ? 'Weekly Breakdown' : 'Daily Usage'} - {selectedMonth.month.split(' ')[0]}
              </h2>
              {viewMode === 'weekly' && (
                <div className="text-sm text-gray-500">
                  Week {selectedWeek.week} ({selectedWeek.days} days)
                </div>
              )}
            </div>
            <div className="h-72">
              {viewMode === 'monthly' ? (
                <Bar
                  data={weeklyBreakdownData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.raw} kWh`
                        }
                      }
                    }
                  }}
                />
              ) : (
                <Bar
                  data={dailyUsageData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.raw} kWh (₹${dailyData[context.dataIndex].cost})`,
                          footer: (items) => {
                            const day = dailyData[items[0].dataIndex];
                            if (day.isPeak) return 'Peak Usage Day';
                            if (day.isWeekend) return 'Weekend Day';
                            return 'Weekday';
                          }
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Additional Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Consumption Distribution */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedMonth.month.split(' ')[0]} Consumption Distribution
            </h2>
            <div className="h-64">
              <Pie
                data={consumptionDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const total = selectedMonth.totalUnits;
                          const value = context.raw;
                          const percentage = Math.round((value / total) * 100);
                          return `${context.label}: ${value}kWh (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Savings Tips */}
          <div className="bg-white rounded-xl shadow p-4 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Savings Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <FiHome className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Peak Usage Reduction</h3>
                  <p className="text-gray-600 text-sm">
                    Your peak usage occurs on {dailyData.find(d => d.isPeak)?.date || 'Weekend days'}. 
                    Consider shifting high-consumption activities to off-peak hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <FiAlertCircle className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Appliance Efficiency</h3>
                  <p className="text-gray-600 text-sm">
                    You could save ₹{viewMode === 'monthly' ? savingsData.savingsCost.toFixed(2) : (savingsData.savingsCost / 4).toFixed(2)} 
                    this {viewMode === 'monthly' ? 'month' : 'week'} by improving appliance efficiency by 15%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <FiTrendingUp className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Comparative Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Your {viewMode === 'monthly' ? 'monthly' : 'weekly'} consumption is {selectedMonth.totalUnits > data[data.length - 2].totalUnits ? 'higher' : 'lower'} than 
                    last {viewMode === 'monthly' ? 'month' : 'week'} by {Math.abs(selectedMonth.totalUnits - data[data.length - 2].totalUnits).toFixed(2)}kWh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add New Data Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Month Data</h2>
          <form onSubmit={handleAddMonth} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <input
                  type="text"
                  id="month"
                  name="month"
                  required
                  placeholder="e.g. July 2023"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1">Total Units (kWh)</label>
                <input
                  type="number"
                  id="units"
                  name="units"
                  required
                  min="1"
                  step="0.1"
                  placeholder="e.g. 350"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">Days in Month</label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  required
                  min="28"
                  max="31"
                  placeholder="28-31"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-150"
            >
              Add Month Data
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Electricity Usage Analytics Dashboard • Data updates in real-time</p>
          <p className="mt-1">© {new Date().getFullYear()} Energy Management System</p>
        </footer>
      </div>
    </div>
  );
};

export default UsageDashboard;
