// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// const taglines = [
//   "Smart Energy, Simple Living",
//   "Save Watts, Save Wallet",
//   "Your Home. Smarter, Safer, Stronger",
//   "Cut Costs, Not Comfort",
//   "Energy Talks – In Your Language",
//   "Power Smarter – With Every Hour",
//   "Your Friendly Energy Guide – From Bulbs to Bills",
//   "Beating Bills, One Appliance at a Time",
//   "Energy Awareness Made Human",
//   "Smarter Homes Start With Smarter Choices"
// ];

// const FeatureCard = ({ title, description, icon, color }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
//       <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 text-white text-xl`}>
//         {icon}
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm">{description}</p>
//     </div>
//   );
// };

// const DataInputForm = ({ onSubmitConsumption, onSubmitWeekly }) => {
//   const [date, setDate] = useState("");
//   const [consumption, setConsumption] = useState("");
//   const [cost, setCost] = useState("");
//   const [weeklyData, setWeeklyData] = useState({
//     weekStart: "",
//     weekEnd: "",
//     days: Array(7).fill().map((_, i) => ({
//       day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
//       consumption: 0,
//       cost: 0
//     }))
//   });
//   const [activeTab, setActiveTab] = useState('daily');

//   const handleDailySubmit = (e) => {
//     e.preventDefault();
//     onSubmitConsumption({ date, consumption: parseFloat(consumption), cost: parseFloat(cost) });
//     setDate("");
//     setConsumption("");
//     setCost("");
//   };

//   const handleWeeklySubmit = (e) => {
//     e.preventDefault();
//     onSubmitWeekly(weeklyData);
//     setWeeklyData({
//       weekStart: "",
//       weekEnd: "",
//       days: Array(7).fill().map((_, i) => ({
//         day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
//         consumption: 0,
//         cost: 0
//       }))
//     });
//   };

//   const updateDayData = (index, field, value) => {
//     const newDays = [...weeklyData.days];
//     newDays[index][field] = parseFloat(value) || 0;
//     setWeeklyData({ ...weeklyData, days: newDays });
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-6 mb-6">
//       <h3 className="text-lg font-semibold mb-4">Add Consumption Data</h3>
//       <div className="flex space-x-4 mb-4">
//         <button
//           onClick={() => setActiveTab('daily')}
//           className={`px-4 py-2 rounded ${activeTab === 'daily' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
//         >
//           Daily Data
//         </button>
//         <button
//           onClick={() => setActiveTab('weekly')}
//           className={`px-4 py-2 rounded ${activeTab === 'weekly' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
//         >
//           Weekly Data
//         </button>
//       </div>

//       {activeTab === 'daily' ? (
//         <form onSubmit={handleDailySubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-1">Consumption (kWh)</label>
//             <input
//               type="number"
//               step="0.01"
//               value={consumption}
//               onChange={(e) => setConsumption(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-1">Cost (₹)</label>
//             <input
//               type="number"
//               step="0.01"
//               value={cost}
//               onChange={(e) => setCost(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//           >
//             Add Daily Data
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleWeeklySubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-1">Week Start Date</label>
//               <input
//                 type="date"
//                 value={weeklyData.weekStart}
//                 onChange={(e) => setWeeklyData({ ...weeklyData, weekStart: e.target.value })}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Week End Date</label>
//               <input
//                 type="date"
//                 value={weeklyData.weekEnd}
//                 onChange={(e) => setWeeklyData({ ...weeklyData, weekEnd: e.target.value })}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <h4 className="font-medium">Daily Consumption</h4>
//             {weeklyData.days.map((day, index) => (
//               <div key={day.day} className="grid grid-cols-3 gap-2 items-center">
//                 <span className="font-medium">{day.day}</span>
//                 <input
//                   type="number"
//                   step="0.01"
//                   placeholder="kWh"
//                   value={day.consumption}
//                   onChange={(e) => updateDayData(index, 'consumption', e.target.value)}
//                   className="p-2 border border-gray-300 rounded"
//                 />
//                 <input
//                   type="number"
//                   step="0.01"
//                   placeholder="₹"
//                   value={day.cost}
//                   onChange={(e) => updateDayData(index, 'cost', e.target.value)}
//                   className="p-2 border border-gray-300 rounded"
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//           >
//             Add Weekly Data
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default function KriyetaApp() {
//   const [tagline, setTagline] = useState("");
//   const [suggestion, setSuggestion] = useState("");
//   const [responseMsg, setResponseMsg] = useState("");
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [period, setPeriod] = useState('weekly');
//   const [historicalData, setHistoricalData] = useState([]);
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const idx = Math.floor(Math.random() * taglines.length);
//     setTagline(taglines[idx]);
    
//     // Load sample data initially
//     const sampleHistoricalData = [
//       { date: '2023-05-01', consumption: 12.5, cost: 85.0 },
//       { date: '2023-05-02', consumption: 11.8, cost: 80.2 },
//       { date: '2023-05-03', consumption: 13.2, cost: 89.7 },
//       { date: '2023-05-04', consumption: 14.0, cost: 95.2 },
//       { date: '2023-05-05', consumption: 10.5, cost: 71.4 },
//       { date: '2023-05-06', consumption: 15.2, cost: 103.3 },
//       { date: '2023-05-07', consumption: 12.8, cost: 87.0 },
//     ];
    
//     const sampleWeeklyData = [{
//       weekStart: '2023-05-01',
//       weekEnd: '2023-05-07',
//       days: [
//         { day: 'Mon', consumption: 12.5, cost: 85.0 },
//         { day: 'Tue', consumption: 11.8, cost: 80.2 },
//         { day: 'Wed', consumption: 13.2, cost: 89.7 },
//         { day: 'Thu', consumption: 14.0, cost: 95.2 },
//         { day: 'Fri', consumption: 10.5, cost: 71.4 },
//         { day: 'Sat', consumption: 15.2, cost: 103.3 },
//         { day: 'Sun', consumption: 12.8, cost: 87.0 },
//       ],
//       totalConsumption: 90.0,
//       totalCost: 611.8
//     }];
    
//     setHistoricalData(sampleHistoricalData);
//     setWeeklyData(sampleWeeklyData);
//   }, []);

//   const submitConsumptionData = (data) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const newData = {
//         ...data,
//         date: data.date || new Date().toISOString().split('T')[0]
//       };
//       setHistoricalData([...historicalData, newData]);
//       setIsLoading(false);
//     }, 500);
//   };

//   const submitWeeklyData = (data) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const totalConsumption = data.days.reduce((sum, day) => sum + day.consumption, 0);
//       const totalCost = data.days.reduce((sum, day) => sum + day.cost, 0);
      
//       const newWeeklyData = {
//         ...data,
//         totalConsumption,
//         totalCost
//       };
      
//       setWeeklyData([newWeeklyData, ...weeklyData]);
//       setIsLoading(false);
//     }, 500);
//   };

//   const submitSuggestion = () => {
//     if (suggestion.trim()) {
//       setResponseMsg("Thanks for your suggestion!");
//       setSuggestion("");
//     } else {
//       setResponseMsg("Please enter a suggestion before submitting.");
//     }
//   };

//   const renderDashboard = () => {
//     const costPredictionData = period === 'weekly'
//       ? [
//           { name: 'Current Week', cost: weeklyData[0]?.totalCost || 0 },
//           { name: 'Target Week', cost: (weeklyData[0]?.totalCost || 0) * 0.85 }
//         ]
//       : [
//           { name: 'Current Month', cost: historicalData.reduce((sum, item) => sum + item.cost, 0) },
//           { name: 'Target Month', cost: historicalData.reduce((sum, item) => sum + item.cost, 0) * 0.85 }
//         ];

//     return (
//       <div className="p-6 space-y-6">
//         {/* Tagline banner */}
//         <div className="bg-orange-600 text-white py-3 px-4 rounded-lg text-center">
//           <p className="font-medium">{tagline}</p>
//         </div>

//         {/* Data Input Form */}
//         <DataInputForm 
//           onSubmitConsumption={submitConsumptionData} 
//           onSubmitWeekly={submitWeeklyData} 
//         />

//         {/* Period selector */}
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setPeriod('weekly')}
//             className={`px-4 py-2 rounded ${period === 'weekly' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
//           >
//             Weekly
//           </button>
//           <button
//             onClick={() => setPeriod('monthly')}
//             className={`px-4 py-2 rounded ${period === 'monthly' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
//           >
//             Monthly
//           </button>
//         </div>

//         {/* Charts section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">
//               {period === 'weekly' ? 'Weekly' : 'Monthly'} Consumption
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={period === 'weekly' 
//                   ? weeklyData[0]?.days || [] 
//                   : historicalData.slice(-30) // Last 30 days
//                 }
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey={period === 'weekly' ? 'day' : 'date'} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="consumption" 
//                   name="Consumption (kWh)"
//                   stroke="#f97316" 
//                   strokeWidth={2} 
//                   activeDot={{ r: 8 }} 
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="cost" 
//                   name="Cost (₹)"
//                   stroke="#4f46e5" 
//                   strokeWidth={2} 
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white rounded-xl shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Cost Prediction vs Goal</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={costPredictionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar 
//                   dataKey="cost" 
//                   name="Cost (₹)"
//                   fill="#f97316" 
//                   barSize={30} 
//                   radius={[5, 5, 0, 0]} 
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Historical Data Chart */}
//         {historicalData.length > 0 && (
//           <div className="bg-white rounded-xl shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Historical Consumption</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={historicalData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis yAxisId="left" orientation="left" stroke="#f97316" />
//                 <YAxis yAxisId="right" orientation="right" stroke="#4f46e5" />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   yAxisId="left"
//                   type="monotone"
//                   dataKey="consumption"
//                   name="Consumption (kWh)"
//                   stroke="#f97316"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="cost"
//                   name="Cost (₹)"
//                   stroke="#4f46e5"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {/* Features section */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Energy Management Features</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <FeatureCard
//               title="Bill Prediction"
//               description="Accurate monthly electricity cost forecasts based on your appliance usage patterns."
//               icon="📊"
//               color="bg-blue-500"
//             />
//             <FeatureCard
//               title="Fault Detection"
//               description="Identify malfunctioning appliances through abnormal energy consumption patterns."
//               icon="⚠️"
//               color="bg-red-500"
//             />
//             <FeatureCard
//               title="Energy Savings"
//               description="Personalized recommendations to reduce your monthly electricity bills."
//               icon="💰"
//               color="bg-green-500"
//             />
//             <FeatureCard
//               title="Usage Alerts"
//               description="Real-time notifications for unusual consumption or warranty expirations."
//               icon="🔔"
//               color="bg-yellow-500"
//             />
//             <FeatureCard
//               title="Appliance Insights"
//               description="Detailed breakdown of each appliance's contribution to your total bill."
//               icon="🔌"
//               color="bg-purple-500"
//             />
//             <FeatureCard
//               title="Multi-Language"
//               description="Voice commands and interface available in regional languages."
//               icon="🌐"
//               color="bg-teal-500"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderSuggestions = () => (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Drop your suggestion here 👇</h2>
//       <textarea
//         value={suggestion}
//         onChange={(e) => setSuggestion(e.target.value)}
//         rows={4}
//         className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-orange-700"
//         placeholder="Your suggestion..."
//       />
//       <button
//         onClick={submitSuggestion}
//         className="mt-4 bg-orange-700 text-white px-6 py-2 rounded hover:bg-orange-800 transition"
//       >
//         Submit
//       </button>
//       {responseMsg && (
//         <p className={`mt-4 font-medium ${responseMsg.startsWith("Thanks") ? "text-green-600" : "text-red-500"}`}>
//           {responseMsg}
//         </p>
//       )}
//     </div>
//   );

//   const renderFAQs = () => {
//     const faqs = [
//       { 
//         q: "What is this Smart AI Assistant for?", 
//         a: "It helps households reduce electricity bills, track appliance usage, get servicing alerts, and receive energy-saving tips using AI-powered insights." 
//       },
//       { 
//         q: "How does the cost prediction work?", 
//         a: "Our advanced algorithms analyze your appliance usage patterns, local electricity rates, and historical data to provide accurate monthly cost estimates." 
//       },
//       { 
//         q: "What information do I need to provide?", 
//         a: "Just basic details like appliance name, brand, daily usage hours, and warranty or guarantee expiry date. We make the process simple and intuitive." 
//       },
//       { 
//         q: "Can I use this in my local language?", 
//         a: "Yes! The assistant supports multiple languages including Hindi, Tamil, Bengali and more through our advanced language processing system." 
//       },
//       { 
//         q: "Will I get alerts for warranty or high energy use?", 
//         a: "Absolutely. You'll receive timely alerts before warranty expiry and if any appliance exceeds safe consumption limits based on BEE ratings." 
//       },
//       { 
//         q: "How do I track my past electricity bills?", 
//         a: "You can upload meter readings or past bills manually. The system will then analyze usage trends and give insights." 
//       }
//     ];

//     return (
//       <div className="p-6 max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
//         <div className="space-y-4">
//           {faqs.map((f, i) => (
//             <div key={i} className="border rounded-lg overflow-hidden">
//               <button
//                 className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 font-semibold focus:outline-none"
//                 onClick={() => document.getElementById(`faq-${i}`).classList.toggle('hidden')}
//               >
//                 <span className="text-left">{f.q}</span>
//                 <span className="text-orange-600">+</span>
//               </button>
//               <div id={`faq-${i}`} className="hidden px-6 py-4 bg-white">
//                 {f.a}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <nav className="w-64 bg-white shadow-lg flex flex-col">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-bold text-orange-700">Kriyeta Energy</h2>
//         </div>
//         <ul className="flex-1">
//           {[
//             { id: 'dashboard', label: 'Dashboard' },
//             { id: 'suggestions', label: 'Suggestions' },
//             { id: 'faqs', label: 'FAQs' }
//           ].map((tab) => (
//             <li key={tab.id}>
//               <button
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full text-left px-6 py-4 hover:bg-orange-50 transition ${
//                   activeTab === tab.id ? 'bg-orange-50 text-orange-700 font-semibold border-r-4 border-orange-700' : 'text-gray-700'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div className="p-4 border-t text-sm text-gray-500">
//           <p>v1.0.0</p>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <header className="bg-white shadow-sm p-4">
//           <h1 className="text-xl font-semibold text-gray-800">
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h1>
//         </header>
        
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//           </div>
//         ) : (
//           <>
//             {activeTab === 'dashboard' && renderDashboard()}
//             {activeTab === 'suggestions' && renderSuggestions()}
//             {activeTab === 'faqs' && renderFAQs()}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const UsageDashboard = () => {
  // Sample initial data - replace with your actual data
  const initialMonthlyData = [
    { month: 'January', units: 320, days: 31 },
    { month: 'February', units: 280, days: 28 },
    { month: 'March', units: 310, days: 31 },
    { month: 'April', units: 290, days: 30 },
    { month: 'May', units: 350, days: 31 },
    { month: 'June', units: 400, days: 30 }
  ];

  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  const [selectedMonth, setSelectedMonth] = useState(initialMonthlyData[initialMonthlyData.length - 1]);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  // Generate random daily usage pattern (replace with actual data)
  const generateDailyData = (month) => {
    const daysInMonth = month.days;
    const avgDailyUsage = month.units / daysInMonth;
    
    // Create realistic daily variations
    const daily = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // Weekends typically have higher usage
      const dayOfWeek = new Date(2023, initialMonthlyData.findIndex(m => m.month === month.month), i).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Base value with some randomness
      let usage = avgDailyUsage * (0.9 + Math.random() * 0.2);
      
      // Increase usage on weekends
      if (isWeekend) {
        usage *= 1.3;
      }
      
      // Special days (like holidays might have different patterns)
      if (i === 1 || i === 15) {
        usage *= 0.8; // Lower usage on 1st and 15th (just as example)
      }
      
      daily.push({
        day: i,
        date: `${i}/${month.month.substring(0, 3)}`,

        units: parseFloat(usage.toFixed(2)),
        isWeekend
      });
    }
    setDailyData(daily);
    
    // Generate weekly aggregation
    const weekly = [];
    let weekStart = 1;
    while (weekStart <= daysInMonth) {
      const weekEnd = Math.min(weekStart + 6, daysInMonth);
      const weekDays = daily.slice(weekStart - 1, weekEnd);
      const weekUnits = weekDays.reduce((sum, day) => sum + day.units, 0);
      
      weekly.push({
        week: weekly.length + 1,
        label: `Week ${weekly.length + 1} (${weekStart}-${weekEnd})`,
        units: parseFloat(weekUnits.toFixed(2)),
        days: weekDays
      });
      
      
      weekStart = weekEnd + 1;
    }
    setWeeklyData(weekly);
  };

  useEffect(() => {
    generateDailyData(selectedMonth);
  }, [selectedMonth]);

  // Chart data for monthly trends
  const monthlyChartData = {
    labels: monthlyData.map(m => m.month),
    datasets: [
      {
        label: 'Monthly Consumption (kWh)',
        data: monthlyData.map(m => m.units),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };

  // Chart data for daily usage
  const dailyChartData = {
    labels: dailyData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Usage (kWh)',
        data: dailyData.map(d => d.units),
        backgroundColor: dailyData.map(d => 
          d.isWeekend ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'
        ),
        borderColor: dailyData.map(d => 
          d.isWeekend ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
        fill: true
      }
    ]
  };

  // Chart data for weekly usage
  const weeklyChartData = {
    labels: weeklyData.map(w => w.label),
    datasets: [
      {
        label: 'Weekly Consumption (kWh)',
        data: weeklyData.map(w => w.units),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
      }
    ]
  };

  // Add new month data
  const handleAddMonth = (e) => {
    e.preventDefault();
    const form = e.target;
    const newMonth = {
      month: form.month.value,
      units: parseFloat(form.units.value),
      days: parseInt(form.days.value)
    };
    
    setMonthlyData([...monthlyData, newMonth]);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Electricity Usage Analytics</h1>
        
        {/* Month Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Month</h2>
          <div className="flex flex-wrap gap-2">
            {monthlyData.map((month) => (
              <button
                key={month.month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-md ${
                  selectedMonth.month === month.month
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {month.month}
              </button>
            ))}
          </div>
        </div>
        
        {/* Current Month Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Month</h3>
            <p className="text-2xl font-bold text-blue-600">{selectedMonth.month}</p>
            <p className="text-gray-500">{selectedMonth.days} days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Consumption</h3>
            <p className="text-2xl font-bold text-green-600">{selectedMonth.units} kWh</p>
            <p className="text-gray-500">
              Avg: {(selectedMonth.units / selectedMonth.days).toFixed(2)} kWh/day
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Comparison</h3>
            <p className="text-gray-600">
              {selectedMonth.units > monthlyData[monthlyData.length - 2].units ? (
                <span className="text-red-600 font-medium">
                  ↑ {(selectedMonth.units - monthlyData[monthlyData.length - 2].units)} kWh from last month
                </span>
              ) : (
                <span className="text-green-600 font-medium">
                  ↓ {(monthlyData[monthlyData.length - 2].units - selectedMonth.units)} kWh from last month
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trends</h2>
            <div className="h-64">
  <Line
    data={monthlyChartData}
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
      },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: 'kWh' }
        }
      }
    }}
  />
</div>

          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Breakdown - {selectedMonth.month}</h2>
            <div className="h-64">
  <Bar
    data={weeklyChartData}
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
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'kWh' }
        }
      }
    }}
  />
</div>

          </div>
        </div>
        
        {/* Daily Usage Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Usage - {selectedMonth.month}</h2>
          <div className="h-96 mb-6">
  <Line
    data={dailyChartData}
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
      },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: 'kWh' }
        }
      }
    }}
  />
</div>

          
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Daily Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage (kWh)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dailyData.map((day) => {
                  const avg = selectedMonth.units / selectedMonth.days;
                  const variation = ((day.units - avg) / avg * 100);
                  
                  return (
                    <tr key={day.day}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {day.isWeekend ? 'Weekend' : 'Weekday'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.units}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${
                          variation > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Add New Month Data */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Month Data</h2>
          <form onSubmit={handleAddMonth} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
                <input
                  type="text"
                  id="month"
                  name="month"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="units" className="block text-sm font-medium text-gray-700">Total Units (kWh)</label>
                <input
                  type="number"
                  id="units"
                  name="units"
                  required
                  min="1"
                  step="0.1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="days" className="block text-sm font-medium text-gray-700">Days in Month</label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  required
                  min="28"
                  max="31"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Month Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsageDashboard;