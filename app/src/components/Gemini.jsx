// // import { useState } from 'react';

// // function App() {
// //   const [question, setQuestion] = useState('');
// //   const [answer, setAnswer] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const askGemini = async () => {
// //     if (!question.trim()) {
// //       setError('Please enter a question');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError('');
    
// //     try {
// //       const response = await fetch('http://localhost:5000/api/ask-gemini', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ question }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setAnswer(data.answer);
// //       console.log('Gemini response:', data.answer);
// //     } catch (err) {
// //       console.error('Error:', err);
// //       setError('Failed to get response from Gemini');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="app">
// //       <h1>Gemini API React Demo</h1>
      
// //       <div className="input-container">
// //         <input
// //           type="text"
// //           value={question}
// //           onChange={(e) => setQuestion(e.target.value)}
// //           placeholder="Ask Gemini anything..."
// //           disabled={isLoading}
// //         />
// //         <button onClick={askGemini} disabled={isLoading}>
// //           {isLoading ? 'Thinking...' : 'Ask Gemini'}
// //         </button>
// //       </div>

// //       {error && <div className="error">{error}</div>}

// //       <div className="response">
// //         <h2>Response:</h2>
// //         {isLoading ? (
// //           <div className="loading">Generating answer...</div>
// //         ) : (
// //           <pre>{answer || 'Your answer will appear here'}</pre>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;





// // import { useState } from 'react';

// // function App() {
// //   const [householdData, setHouseholdData] = useState({
// //     residents: '',
// //     homeSize: '',
// //     appliances: [{ name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }]
// //   });
// //   const [analysis, setAnalysis] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleApplianceChange = (index, e) => {
// //     const { name, value } = e.target;
// //     const updatedAppliances = [...householdData.appliances];
// //     updatedAppliances[index] = {
// //       ...updatedAppliances[index],
// //       [name]: name === 'daysPerWeek' ? parseInt(value) || 0 : value
// //     };
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: updatedAppliances
// //     }));
// //   };

// //   const addAppliance = () => {
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: [
// //         ...prev.appliances,
// //         { name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }
// //       ]
// //     }));
// //   };

// //   const removeAppliance = (index) => {
// //     if (householdData.appliances.length <= 1) return;
// //     const updatedAppliances = householdData.appliances.filter((_, i) => i !== index);
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: updatedAppliances
// //     }));
// //   };

// //   const calculateEnergy = async () => {
// //     if (!householdData.appliances.some(app => app.name && app.wattage && app.hoursPerDay)) {
// //       setError('Please fill in at least one appliance completely');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError('');
    
// //     try {
// //       const response = await fetch('http://localhost:5000/api/calculate-energy', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ householdData }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setAnalysis(data.analysis);
// //       console.log('Energy analysis:', data.analysis);
// //     } catch (err) {
// //       console.error('Error:', err);
// //       setError('Failed to calculate energy consumption');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-3xl mx-auto">
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-green-700">Household Energy Calculator</h1>
// //           <p className="mt-2 text-lg text-gray-600">
// //             Calculate your appliance energy consumption and get savings recommendations
// //           </p>
// //         </div>

// //         <div className="bg-white shadow rounded-lg p-6 mb-8">
// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Household Information</h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Number of Residents
// //               </label>
// //               <input
// //                 type="number"
// //                 name="residents"
// //                 value={householdData.residents}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                 placeholder="e.g. 4"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Home Size (sq ft)
// //               </label>
// //               <input
// //                 type="number"
// //                 name="homeSize"
// //                 value={householdData.homeSize}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                 placeholder="e.g. 1500"
// //               />
// //             </div>
// //           </div>

// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Appliances</h2>
          
// //           {householdData.appliances.map((appliance, index) => (
// //             <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={appliance.name}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. Refrigerator"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
// //                   <input
// //                     type="number"
// //                     name="wattage"
// //                     value={appliance.wattage}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. 150"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Day</label>
// //                   <input
// //                     type="number"
// //                     name="hoursPerDay"
// //                     value={appliance.hoursPerDay}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. 24"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Days/Week</label>
// //                   <input
// //                     type="number"
// //                     name="daysPerWeek"
// //                     value={appliance.daysPerWeek}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     min="1"
// //                     max="7"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                   />
// //                 </div>
// //               </div>
// //               {householdData.appliances.length > 1 && (
// //                 <button
// //                   onClick={() => removeAppliance(index)}
// //                   className="mt-2 text-sm text-red-600 hover:text-red-800"
// //                 >
// //                   Remove Appliance
// //                 </button>
// //               )}
// //             </div>
// //           ))}

// //           <button
// //             onClick={addAppliance}
// //             className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //           >
// //             + Add Another Appliance
// //           </button>
// //         </div>

// //         <div className="flex justify-center">
// //           <button
// //             onClick={calculateEnergy}
// //             disabled={isLoading}
// //             className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
// //           >
// //             {isLoading ? (
// //               <span className="flex items-center">
// //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                 </svg>
// //                 Calculating...
// //               </span>
// //             ) : 'Calculate Energy Consumption'}
// //           </button>
// //         </div>

// //         {error && (
// //           <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
// //             <div className="flex">
// //               <div className="flex-shrink-0">
// //                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                 </svg>
// //               </div>
// //               <div className="ml-3">
// //                 <p className="text-sm text-red-700">{error}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {analysis && (
// //           <div className="mt-8 bg-white shadow rounded-lg p-6">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Analysis</h2>
// //             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;



// // import { useState } from 'react';
// // import { Bar, Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement
// // );

// // function App() {
// //   const [householdData, setHouseholdData] = useState({
// //     residents: '',
// //     bhk: '1BHK',
// //     appliances: [{ name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }]
// //   });
// //   const [analysis, setAnalysis] = useState('');
// //   const [chartData, setChartData] = useState(null);
// //   const [activeChart, setActiveChart] = useState('daily');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK+'];

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleApplianceChange = (index, e) => {
// //     const { name, value } = e.target;
// //     const updatedAppliances = [...householdData.appliances];
// //     updatedAppliances[index] = {
// //       ...updatedAppliances[index],
// //       [name]: name === 'daysPerWeek' ? parseInt(value) || 0 : value
// //     };
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: updatedAppliances
// //     }));
// //   };

// //   const addAppliance = () => {
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: [
// //         ...prev.appliances,
// //         { name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }
// //       ]
// //     }));
// //   };

// //   const removeAppliance = (index) => {
// //     if (householdData.appliances.length <= 1) return;
// //     const updatedAppliances = householdData.appliances.filter((_, i) => i !== index);
// //     setHouseholdData(prev => ({
// //       ...prev,
// //       appliances: updatedAppliances
// //     }));
// //   };

// //   const calculateEnergy = async () => {
// //     if (!householdData.appliances.some(app => app.name && app.wattage && app.hoursPerDay)) {
// //       setError('Please fill in at least one appliance completely');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError('');
// //     setChartData(null);
    
// //     try {
// //       const response = await fetch('http://localhost:5000/api/calculate-energy', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ householdData }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setAnalysis(data.analysis);
      
// //       if (data.chartData) {
// //         setChartData(data.chartData);
// //         console.log('Chart data:', data.chartData);
// //       }
// //     } catch (err) {
// //       console.error('Error:', err);
// //       setError('Failed to calculate energy consumption');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const prepareChartData = (usageType) => {
// //     if (!chartData || !chartData[`${usageType}Usage`]) return null;
    
// //     const usageData = chartData[`${usageType}Usage`];
// //     const appliances = Object.keys(usageData);
// //     const values = Object.values(usageData);
    
// //     return {
// //       labels: appliances,
// //       datasets: [
// //         {
// //           label: `Energy Consumption (kWh) - ${usageType}`,
// //           data: values,
// //           backgroundColor: [
// //             'rgba(75, 192, 192, 0.6)',
// //             'rgba(54, 162, 235, 0.6)',
// //             'rgba(255, 99, 132, 0.6)',
// //             'rgba(255, 206, 86, 0.6)',
// //             'rgba(153, 102, 255, 0.6)',
// //             'rgba(255, 159, 64, 0.6)',
// //           ],
// //           borderColor: [
// //             'rgba(75, 192, 192, 1)',
// //             'rgba(54, 162, 235, 1)',
// //             'rgba(255, 99, 132, 1)',
// //             'rgba(255, 206, 86, 1)',
// //             'rgba(153, 102, 255, 1)',
// //             'rgba(255, 159, 64, 1)',
// //           ],
// //           borderWidth: 1,
// //         },
// //       ],
// //     };
// //   };

// //   const dailyData = prepareChartData('daily');
// //   const weeklyData = prepareChartData('weekly');
// //   const monthlyData = prepareChartData('monthly');

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-5xl mx-auto">
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-green-700">Smart Energy Calculator</h1>
// //           <p className="mt-2 text-lg text-gray-600">
// //             Analyze your appliance energy consumption across different time periods
// //           </p>
// //         </div>

// //         <div className="bg-white shadow rounded-lg p-6 mb-8">
// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Household Information</h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Number of Residents
// //               </label>
// //               <input
// //                 type="number"
// //                 name="residents"
// //                 value={householdData.residents}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                 placeholder="e.g. 4"
// //                 min="1"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 House Type (BHK)
// //               </label>
// //               <select
// //                 name="bhk"
// //                 value={householdData.bhk}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //               >
// //                 {bhkOptions.map(option => (
// //                   <option key={option} value={option}>{option}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Appliances</h2>
          
// //           {householdData.appliances.map((appliance, index) => (
// //             <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={appliance.name}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. Refrigerator"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
// //                   <input
// //                     type="number"
// //                     name="wattage"
// //                     value={appliance.wattage}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. 150"
// //                     min="1"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Day</label>
// //                   <input
// //                     type="number"
// //                     name="hoursPerDay"
// //                     value={appliance.hoursPerDay}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                     placeholder="e.g. 24"
// //                     min="0"
// //                     max="24"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Days/Week</label>
// //                   <input
// //                     type="number"
// //                     name="daysPerWeek"
// //                     value={appliance.daysPerWeek}
// //                     onChange={(e) => handleApplianceChange(index, e)}
// //                     min="1"
// //                     max="7"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// //                   />
// //                 </div>
// //               </div>
// //               {householdData.appliances.length > 1 && (
// //                 <button
// //                   onClick={() => removeAppliance(index)}
// //                   className="mt-2 text-sm text-red-600 hover:text-red-800"
// //                 >
// //                   Remove Appliance
// //                 </button>
// //               )}
// //             </div>
// //           ))}

// //           <button
// //             onClick={addAppliance}
// //             className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //           >
// //             + Add Another Appliance
// //           </button>
// //         </div>

// //         <div className="flex justify-center mb-8">
// //           <button
// //             onClick={calculateEnergy}
// //             disabled={isLoading}
// //             className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
// //           >
// //             {isLoading ? (
// //               <span className="flex items-center">
// //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                 </svg>
// //                 Calculating...
// //               </span>
// //             ) : 'Analyze Energy Consumption'}
// //           </button>
// //         </div>

// //         {error && (
// //           <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 mb-8">
// //             <div className="flex">
// //               <div className="flex-shrink-0">
// //                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                 </svg>
// //               </div>
// //               <div className="ml-3">
// //                 <p className="text-sm text-red-700">{error}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {chartData && (
// //           <div className="bg-white shadow rounded-lg p-6 mb-8">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Consumption Comparison</h2>
            
// //             <div className="flex space-x-2 mb-6">
// //               <button
// //                 onClick={() => setActiveChart('daily')}
// //                 className={`px-4 py-2 rounded-md ${activeChart === 'daily' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// //               >
// //                 Daily Usage
// //               </button>
// //               <button
// //                 onClick={() => setActiveChart('weekly')}
// //                 className={`px-4 py-2 rounded-md ${activeChart === 'weekly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// //               >
// //                 Weekly Usage
// //               </button>
// //               <button
// //                 onClick={() => setActiveChart('monthly')}
// //                 className={`px-4 py-2 rounded-md ${activeChart === 'monthly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// //               >
// //                 Monthly Usage
// //               </button>
// //             </div>

// //             <div className="h-96">
// //               {activeChart === 'daily' && dailyData && (
// //                 <>
// //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Daily Energy Consumption (kWh)</h3>
// //                   <Bar data={dailyData} options={{ responsive: true, maintainAspectRatio: false }} />
// //                 </>
// //               )}
// //               {activeChart === 'weekly' && weeklyData && (
// //                 <>
// //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Weekly Energy Consumption (kWh)</h3>
// //                   <Pie data={weeklyData} options={{ responsive: true, maintainAspectRatio: false }} />
// //                 </>
// //               )}
// //               {activeChart === 'monthly' && monthlyData && (
// //                 <>
// //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Energy Consumption (kWh)</h3>
// //                   <Bar data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} />
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {analysis && (
// //           <div className="bg-white shadow rounded-lg p-6">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Analysis</h2>
// //             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;



// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function App() {
//   const [householdData, setHouseholdData] = useState({
//     costPerKwh: 0.15,
//     appliances: [
//       { name: "Refrigerator", wattage: 150, hoursPerDay: 24, daysPerWeek: 7 },
//       { name: "TV", wattage: 100, hoursPerDay: 4, daysPerWeek: 7 }
//     ]
//   });
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (index, field, value) => {
//     const updated = [...householdData.appliances];
//     updated[index][field] = field === 'wattage' ? Number(value) : value;
//     setHouseholdData({...householdData, appliances: updated});
//   };

//   const addAppliance = () => {
//     setHouseholdData({
//       ...householdData,
//       appliances: [...householdData.appliances, { name: "", wattage: 0, hoursPerDay: 0, daysPerWeek: 7 }]
//     });
//   };

//   const analyzeEnergy = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/calculate-energy', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ householdData })
//       });
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Chart data preparation
//   const chartData = {
//     labels: results?.appliances?.map(x => x.name) || [],
//     datasets: [
//       {
//         label: 'Daily kWh',
//         data: results?.appliances?.map(x => x.dailyKwh) || [],
//         backgroundColor: 'rgba(54, 162, 235, 0.7)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Daily Cost ($)',
//         data: results?.appliances?.map(x => x.dailyCost) || [],
//         backgroundColor: 'rgba(255, 99, 132, 0.7)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Energy Consumption Dashboard</h1>
      
//       {/* Input Section */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Appliance Details</h2>
//         <div className="mb-4">
//           <label className="block mb-2">Electricity Rate ($/kWh)</label>
//           <input
//             type="number"
//             value={householdData.costPerKwh}
//             onChange={(e) => setHouseholdData({...householdData, costPerKwh: Number(e.target.value)})}
//             className="w-full p-2 border rounded"
//             step="0.01"
//           />
//         </div>

//         {householdData.appliances.map((app, index) => (
//           <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded">
//             <div>
//               <label className="block mb-1">Appliance Name</label>
//               <input
//                 type="text"
//                 value={app.name}
//                 onChange={(e) => handleChange(index, 'name', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Wattage (W)</label>
//               <input
//                 type="number"
//                 value={app.wattage}
//                 onChange={(e) => handleChange(index, 'wattage', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Hours/Day</label>
//               <input
//                 type="number"
//                 value={app.hoursPerDay}
//                 onChange={(e) => handleChange(index, 'hoursPerDay', e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Days/Week</label>
//               <input
//                 type="number"
//                 value={app.daysPerWeek}
//                 onChange={(e) => handleChange(index, 'daysPerWeek', e.target.value)}
//                 className="w-full p-2 border rounded"
//                 min="1"
//                 max="7"
//               />
//             </div>
//           </div>
//         ))}

//         <button 
//           onClick={addAppliance}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//         >
//           + Add Appliance
//         </button>
//         <button 
//           onClick={analyzeEnergy}
//           disabled={loading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? 'Analyzing...' : 'Calculate Energy Usage'}
//         </button>
//       </div>

//       {/* Results Section */}
//       {results && (
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Energy Analysis</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             {/* kWh Chart */}
//             <div className="h-96">
//               <h3 className="text-lg font-medium mb-2">Energy Consumption (kWh)</h3>
//               <Bar
//                 data={{
//                   labels: chartData.labels,
//                   datasets: [chartData.datasets[0]]
//                 }}
//                 options={{ responsive: true, maintainAspectRatio: false }}
//               />
//             </div>
            
//             {/* Cost Chart */}
//             <div className="h-96">
//               <h3 className="text-lg font-medium mb-2">Energy Costs ($)</h3>
//               <Bar
//                 data={{
//                   labels: chartData.labels,
//                   datasets: [chartData.datasets[1]]
//                 }}
//                 options={{ responsive: true, maintainAspectRatio: false }}
//               />
//             </div>
//           </div>

//           {/* Combined Comparison Chart */}
//           <div className="h-96 mb-8">
//             <h3 className="text-lg font-medium mb-2">kWh vs Cost Comparison</h3>
//             <Bar
//               data={chartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     title: { display: true, text: 'Value' }
//                   }
//                 }
//               }}
//             />
//           </div>

//           {/* Summary */}
//           <div className="bg-gray-50 p-4 rounded">
//             <h3 className="text-lg font-medium mb-2">Summary</h3>
//             <p className="whitespace-pre-line">{results.summary}</p>
//             <div className="mt-4 grid grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-3 rounded">
//                 <p className="font-medium">Total Daily</p>
//                 <p>{results.totalDailyKwh?.toFixed(2)} kWh</p>
//               </div>
//               <div className="bg-green-50 p-3 rounded">
//                 <p className="font-medium">Daily Cost</p>
//                 <p>${results.appliances?.reduce((sum, x) => sum + x.dailyCost, 0).toFixed(2)}</p>
//               </div>
//               <div className="bg-purple-50 p-3 rounded">
//                 <p className="font-medium">Monthly Cost</p>
//                 <p>${results.totalMonthlyCost?.toFixed(2)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

export default function App() {
  const [householdData, setHouseholdData] = useState({
    costPerKwh: 6.5, // ₹6.5/kWh
    appliances: []
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [standards, setStandards] = useState({});

  // Load real appliance data on startup
  useEffect(() => {
    fetch('http://localhost:5000/api/standard-appliances')
      .then(res => res.json())
      .then(data => {
        setStandards(data);
        // Preload 3 common appliances
        setHouseholdData(prev => ({
          ...prev,
          appliances: [
            { name: "Refrigerator", wattage: data["Refrigerator"].wattage, hoursPerDay: data["Refrigerator"].usage, daysPerWeek: 7 },
            { name: "LED TV", wattage: data["LED TV"].wattage, hoursPerDay: data["LED TV"].usage, daysPerWeek: 7 },
            { name: "Ceiling Fan", wattage: data["Ceiling Fan"].wattage, hoursPerDay: data["Ceiling Fan"].usage, daysPerWeek: 7 }
          ]
        }));
      });
  }, []);

  const analyzeEnergy = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/calculate-energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ householdData })
      });
      const data = await response.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  // Vibrant chart colors for India theme
  const COLORS = [
    '#FF9933', // Saffron
    '#138808', // Green
    '#000080', // Navy
    '#FF3E3E', // Bright Red
    '#6A0DAD', // Purple
    '#00B0FF'  // Sky Blue
  ];

  const chartData = {
    labels: results?.appliances?.map(x => x.name) || [],
    datasets: [
      {
        label: 'Monthly Cost (₹)',
        data: results?.appliances?.map(x => x.monthlyCost) || [],
        backgroundColor: COLORS[0],
        borderColor: '#E67E22',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'Monthly kWh',
        data: results?.appliances?.map(x => x.monthlyKwh) || [],
        backgroundColor: COLORS[1],
        borderColor: '#27AE60',
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-white shadow-md rounded-lg p-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-saffron">भारत ऊर्जा डैशबोर्ड</h1>
        <p className="text-navyblue">Monitor your electricity use and save money</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1">
          <h2 className="text-xl font-bold mb-4 text-navyblue">Your Appliances</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Electricity Rate (₹/kWh)
            </label>
            <input
              type="number"
              value={householdData.costPerKwh}
              onChange={(e) => setHouseholdData({...householdData, costPerKwh: Number(e.target.value)})}
              className="w-full p-2 border-2 border-saffron rounded-md"
              step="0.5"
            />
          </div>

          {householdData.appliances.map((app, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <select
                value={app.name}
                onChange={(e) => {
                  const newApp = [...householdData.appliances];
                  newApp[index].name = e.target.value;
                  if (standards[e.target.value]) {
                    newApp[index].wattage = standards[e.target.value].wattage;
                    newApp[index].hoursPerDay = standards[e.target.value].usage;
                  }
                  setHouseholdData({...householdData, appliances: newApp});
                }}
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Appliance</option>
                {Object.keys(standards).map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs">Wattage (W)</label>
                  <input
                    type="number"
                    value={app.wattage}
                    onChange={(e) => {
                      const newApp = [...householdData.appliances];
                      newApp[index].wattage = Number(e.target.value);
                      setHouseholdData({...householdData, appliances: newApp});
                    }}
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs">Hours/Day</label>
                  <input
                    type="number"
                    value={app.hoursPerDay}
                    onChange={(e) => {
                      const newApp = [...householdData.appliances];
                      newApp[index].hoursPerDay = Number(e.target.value);
                      setHouseholdData({...householdData, appliances: newApp});
                    }}
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs">Days/Week</label>
                  <input
                    type="number"
                    value={app.daysPerWeek}
                    min="1"
                    max="7"
                    onChange={(e) => {
                      const newApp = [...householdData.appliances];
                      newApp[index].daysPerWeek = Number(e.target.value);
                      setHouseholdData({...householdData, appliances: newApp});
                    }}
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex space-x-2">
            <button
              onClick={() => setHouseholdData({
                ...householdData,
                appliances: [...householdData.appliances, { name: "", wattage: 0, hoursPerDay: 0, daysPerWeek: 7 }]
              })}
              className="flex-1 bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
            >
              <span className="mr-1">+</span> Add Appliance
            </button>
            
            <button
              onClick={analyzeEnergy}
              disabled={loading}
              className="flex-1 bg-saffron text-white py-2 rounded-md flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-green-500">
                  <h3 className="font-bold text-gray-500">Monthly Consumption</h3>
                  <p className="text-2xl font-bold">{results.totals?.monthlyKwh?.toFixed(0) || 0} kWh</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-saffron">
                  <h3 className="font-bold text-gray-500">Monthly Cost</h3>
                  <p className="text-2xl font-bold">₹{results.totals?.monthlyCost?.toFixed(0) || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-navyblue">
                  <h3 className="font-bold text-gray-500">BEE 5-Star Comparison</h3>
                  <p className="text-xl font-bold">
                    {results.totals?.monthlyKwh ? 
                      `₹${(results.totals.monthlyCost * 0.8).toFixed(0)}/mo possible savings` : 
                      'Add data'
                    }
                  </p>
                </div>
              </div>

              {/* Comparison Charts */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-navyblue">Energy vs Cost</h2>
                <div className="h-80">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: { size: 14 }
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => {
                              return ctx.datasetIndex === 0 
                                ? `₹${ctx.raw.toFixed(2)}` 
                                : `${ctx.raw.toFixed(2)} kWh`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => value % 1 === 0 ? value : ''
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Appliance Breakdown */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-navyblue">Appliance Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.appliances?.map((appliance, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: COLORS[index % COLORS.length] }}>
                        {appliance.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Daily</p>
                          <p className="font-bold">{appliance.dailyKwh?.toFixed(2)} kWh</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Monthly Cost</p>
                          <p className="font-bold">₹{appliance.monthlyCost?.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="h-40">
                        <Doughnut
                          data={{
                            labels: ['Your Usage', '5-Star Standard'],
                            datasets: [{
                              data: [100, 80], // Example comparison
                              backgroundColor: [COLORS[index % COLORS.length], '#DDDDDD'],
                              borderWidth: 0
                            }]
                          }}
                          options={{
                            cutout: '70%',
                            plugins: {
                              legend: { display: false },
                              tooltip: { enabled: false }
                            }
                          }}
                        />
                        <p className="text-center -mt-16 font-bold">
                          {appliance.beeComparison || 'Compare to BEE 5-star'}
                        </p>
                      </div>

                      {appliance.tips?.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-semibold text-sm text-green-600 mb-1">Savings Tips:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            {appliance.tips.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Conservation Tips Section */}
      {results && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-green-800">💡 Electricity Conservation Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-green-700">Immediate Actions</h3>
              <ul className="space-y-2">
                <li>• Set AC to 24°C (saves ₹500-800/month)</li>
                <li>• Switch off appliances at plug point</li>
                <li>• Use natural light during daytime</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-green-700">Mid-Term Savings</h3>
              <ul className="space-y-2">
                <li>• Replace old fans with BEE 5-star models</li>
                <li>• Install solar water heater</li>
                <li>• Use smart power strips</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-green-700">Long-Term Investments</h3>
              <ul className="space-y-2">
                <li>• Rooftop solar panels (3-5 year payback)</li>
                <li>• Energy audit by DISCOM</li>
                <li>• Home insulation improvements</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}