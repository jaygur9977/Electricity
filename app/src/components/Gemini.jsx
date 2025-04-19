// // // import { useState } from 'react';

// // // function App() {
// // //   const [question, setQuestion] = useState('');
// // //   const [answer, setAnswer] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const askGemini = async () => {
// // //     if (!question.trim()) {
// // //       setError('Please enter a question');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     setError('');
    
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/ask-gemini', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ question }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const data = await response.json();
// // //       setAnswer(data.answer);
// // //       console.log('Gemini response:', data.answer);
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       setError('Failed to get response from Gemini');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="app">
// // //       <h1>Gemini API React Demo</h1>
      
// // //       <div className="input-container">
// // //         <input
// // //           type="text"
// // //           value={question}
// // //           onChange={(e) => setQuestion(e.target.value)}
// // //           placeholder="Ask Gemini anything..."
// // //           disabled={isLoading}
// // //         />
// // //         <button onClick={askGemini} disabled={isLoading}>
// // //           {isLoading ? 'Thinking...' : 'Ask Gemini'}
// // //         </button>
// // //       </div>

// // //       {error && <div className="error">{error}</div>}

// // //       <div className="response">
// // //         <h2>Response:</h2>
// // //         {isLoading ? (
// // //           <div className="loading">Generating answer...</div>
// // //         ) : (
// // //           <pre>{answer || 'Your answer will appear here'}</pre>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;





// // // import { useState } from 'react';

// // // function App() {
// // //   const [householdData, setHouseholdData] = useState({
// // //     residents: '',
// // //     homeSize: '',
// // //     appliances: [{ name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }]
// // //   });
// // //   const [analysis, setAnalysis] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleApplianceChange = (index, e) => {
// // //     const { name, value } = e.target;
// // //     const updatedAppliances = [...householdData.appliances];
// // //     updatedAppliances[index] = {
// // //       ...updatedAppliances[index],
// // //       [name]: name === 'daysPerWeek' ? parseInt(value) || 0 : value
// // //     };
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: updatedAppliances
// // //     }));
// // //   };

// // //   const addAppliance = () => {
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: [
// // //         ...prev.appliances,
// // //         { name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }
// // //       ]
// // //     }));
// // //   };

// // //   const removeAppliance = (index) => {
// // //     if (householdData.appliances.length <= 1) return;
// // //     const updatedAppliances = householdData.appliances.filter((_, i) => i !== index);
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: updatedAppliances
// // //     }));
// // //   };

// // //   const calculateEnergy = async () => {
// // //     if (!householdData.appliances.some(app => app.name && app.wattage && app.hoursPerDay)) {
// // //       setError('Please fill in at least one appliance completely');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     setError('');
    
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/calculate-energy', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ householdData }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const data = await response.json();
// // //       setAnalysis(data.analysis);
// // //       console.log('Energy analysis:', data.analysis);
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       setError('Failed to calculate energy consumption');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-3xl mx-auto">
// // //         <div className="text-center mb-8">
// // //           <h1 className="text-3xl font-bold text-green-700">Household Energy Calculator</h1>
// // //           <p className="mt-2 text-lg text-gray-600">
// // //             Calculate your appliance energy consumption and get savings recommendations
// // //           </p>
// // //         </div>

// // //         <div className="bg-white shadow rounded-lg p-6 mb-8">
// // //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Household Information</h2>
          
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Number of Residents
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 name="residents"
// // //                 value={householdData.residents}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                 placeholder="e.g. 4"
// // //               />
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Home Size (sq ft)
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 name="homeSize"
// // //                 value={householdData.homeSize}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                 placeholder="e.g. 1500"
// // //               />
// // //             </div>
// // //           </div>

// // //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Appliances</h2>
          
// // //           {householdData.appliances.map((appliance, index) => (
// // //             <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// // //                   <input
// // //                     type="text"
// // //                     name="name"
// // //                     value={appliance.name}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. Refrigerator"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
// // //                   <input
// // //                     type="number"
// // //                     name="wattage"
// // //                     value={appliance.wattage}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. 150"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Day</label>
// // //                   <input
// // //                     type="number"
// // //                     name="hoursPerDay"
// // //                     value={appliance.hoursPerDay}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. 24"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Days/Week</label>
// // //                   <input
// // //                     type="number"
// // //                     name="daysPerWeek"
// // //                     value={appliance.daysPerWeek}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     min="1"
// // //                     max="7"
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               {householdData.appliances.length > 1 && (
// // //                 <button
// // //                   onClick={() => removeAppliance(index)}
// // //                   className="mt-2 text-sm text-red-600 hover:text-red-800"
// // //                 >
// // //                   Remove Appliance
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}

// // //           <button
// // //             onClick={addAppliance}
// // //             className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// // //           >
// // //             + Add Another Appliance
// // //           </button>
// // //         </div>

// // //         <div className="flex justify-center">
// // //           <button
// // //             onClick={calculateEnergy}
// // //             disabled={isLoading}
// // //             className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
// // //           >
// // //             {isLoading ? (
// // //               <span className="flex items-center">
// // //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                 </svg>
// // //                 Calculating...
// // //               </span>
// // //             ) : 'Calculate Energy Consumption'}
// // //           </button>
// // //         </div>

// // //         {error && (
// // //           <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
// // //             <div className="flex">
// // //               <div className="flex-shrink-0">
// // //                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// // //                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                 </svg>
// // //               </div>
// // //               <div className="ml-3">
// // //                 <p className="text-sm text-red-700">{error}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {analysis && (
// // //           <div className="mt-8 bg-white shadow rounded-lg p-6">
// // //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Analysis</h2>
// // //             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;



// // // import { useState } from 'react';
// // // import { Bar, Pie } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // //   ArcElement
// // // );

// // // function App() {
// // //   const [householdData, setHouseholdData] = useState({
// // //     residents: '',
// // //     bhk: '1BHK',
// // //     appliances: [{ name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }]
// // //   });
// // //   const [analysis, setAnalysis] = useState('');
// // //   const [chartData, setChartData] = useState(null);
// // //   const [activeChart, setActiveChart] = useState('daily');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK+'];

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleApplianceChange = (index, e) => {
// // //     const { name, value } = e.target;
// // //     const updatedAppliances = [...householdData.appliances];
// // //     updatedAppliances[index] = {
// // //       ...updatedAppliances[index],
// // //       [name]: name === 'daysPerWeek' ? parseInt(value) || 0 : value
// // //     };
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: updatedAppliances
// // //     }));
// // //   };

// // //   const addAppliance = () => {
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: [
// // //         ...prev.appliances,
// // //         { name: '', wattage: '', hoursPerDay: '', daysPerWeek: 7 }
// // //       ]
// // //     }));
// // //   };

// // //   const removeAppliance = (index) => {
// // //     if (householdData.appliances.length <= 1) return;
// // //     const updatedAppliances = householdData.appliances.filter((_, i) => i !== index);
// // //     setHouseholdData(prev => ({
// // //       ...prev,
// // //       appliances: updatedAppliances
// // //     }));
// // //   };

// // //   const calculateEnergy = async () => {
// // //     if (!householdData.appliances.some(app => app.name && app.wattage && app.hoursPerDay)) {
// // //       setError('Please fill in at least one appliance completely');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     setError('');
// // //     setChartData(null);
    
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/calculate-energy', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ householdData }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const data = await response.json();
// // //       setAnalysis(data.analysis);
      
// // //       if (data.chartData) {
// // //         setChartData(data.chartData);
// // //         console.log('Chart data:', data.chartData);
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       setError('Failed to calculate energy consumption');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const prepareChartData = (usageType) => {
// // //     if (!chartData || !chartData[`${usageType}Usage`]) return null;
    
// // //     const usageData = chartData[`${usageType}Usage`];
// // //     const appliances = Object.keys(usageData);
// // //     const values = Object.values(usageData);
    
// // //     return {
// // //       labels: appliances,
// // //       datasets: [
// // //         {
// // //           label: `Energy Consumption (kWh) - ${usageType}`,
// // //           data: values,
// // //           backgroundColor: [
// // //             'rgba(75, 192, 192, 0.6)',
// // //             'rgba(54, 162, 235, 0.6)',
// // //             'rgba(255, 99, 132, 0.6)',
// // //             'rgba(255, 206, 86, 0.6)',
// // //             'rgba(153, 102, 255, 0.6)',
// // //             'rgba(255, 159, 64, 0.6)',
// // //           ],
// // //           borderColor: [
// // //             'rgba(75, 192, 192, 1)',
// // //             'rgba(54, 162, 235, 1)',
// // //             'rgba(255, 99, 132, 1)',
// // //             'rgba(255, 206, 86, 1)',
// // //             'rgba(153, 102, 255, 1)',
// // //             'rgba(255, 159, 64, 1)',
// // //           ],
// // //           borderWidth: 1,
// // //         },
// // //       ],
// // //     };
// // //   };

// // //   const dailyData = prepareChartData('daily');
// // //   const weeklyData = prepareChartData('weekly');
// // //   const monthlyData = prepareChartData('monthly');

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-5xl mx-auto">
// // //         <div className="text-center mb-8">
// // //           <h1 className="text-3xl font-bold text-green-700">Smart Energy Calculator</h1>
// // //           <p className="mt-2 text-lg text-gray-600">
// // //             Analyze your appliance energy consumption across different time periods
// // //           </p>
// // //         </div>

// // //         <div className="bg-white shadow rounded-lg p-6 mb-8">
// // //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Household Information</h2>
          
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Number of Residents
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 name="residents"
// // //                 value={householdData.residents}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                 placeholder="e.g. 4"
// // //                 min="1"
// // //               />
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 House Type (BHK)
// // //               </label>
// // //               <select
// // //                 name="bhk"
// // //                 value={householdData.bhk}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //               >
// // //                 {bhkOptions.map(option => (
// // //                   <option key={option} value={option}>{option}</option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Appliances</h2>
          
// // //           {householdData.appliances.map((appliance, index) => (
// // //             <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// // //                   <input
// // //                     type="text"
// // //                     name="name"
// // //                     value={appliance.name}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. Refrigerator"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
// // //                   <input
// // //                     type="number"
// // //                     name="wattage"
// // //                     value={appliance.wattage}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. 150"
// // //                     min="1"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Day</label>
// // //                   <input
// // //                     type="number"
// // //                     name="hoursPerDay"
// // //                     value={appliance.hoursPerDay}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                     placeholder="e.g. 24"
// // //                     min="0"
// // //                     max="24"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Days/Week</label>
// // //                   <input
// // //                     type="number"
// // //                     name="daysPerWeek"
// // //                     value={appliance.daysPerWeek}
// // //                     onChange={(e) => handleApplianceChange(index, e)}
// // //                     min="1"
// // //                     max="7"
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               {householdData.appliances.length > 1 && (
// // //                 <button
// // //                   onClick={() => removeAppliance(index)}
// // //                   className="mt-2 text-sm text-red-600 hover:text-red-800"
// // //                 >
// // //                   Remove Appliance
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}

// // //           <button
// // //             onClick={addAppliance}
// // //             className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// // //           >
// // //             + Add Another Appliance
// // //           </button>
// // //         </div>

// // //         <div className="flex justify-center mb-8">
// // //           <button
// // //             onClick={calculateEnergy}
// // //             disabled={isLoading}
// // //             className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
// // //           >
// // //             {isLoading ? (
// // //               <span className="flex items-center">
// // //                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                 </svg>
// // //                 Calculating...
// // //               </span>
// // //             ) : 'Analyze Energy Consumption'}
// // //           </button>
// // //         </div>

// // //         {error && (
// // //           <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 mb-8">
// // //             <div className="flex">
// // //               <div className="flex-shrink-0">
// // //                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// // //                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                 </svg>
// // //               </div>
// // //               <div className="ml-3">
// // //                 <p className="text-sm text-red-700">{error}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {chartData && (
// // //           <div className="bg-white shadow rounded-lg p-6 mb-8">
// // //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Consumption Comparison</h2>
            
// // //             <div className="flex space-x-2 mb-6">
// // //               <button
// // //                 onClick={() => setActiveChart('daily')}
// // //                 className={`px-4 py-2 rounded-md ${activeChart === 'daily' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// // //               >
// // //                 Daily Usage
// // //               </button>
// // //               <button
// // //                 onClick={() => setActiveChart('weekly')}
// // //                 className={`px-4 py-2 rounded-md ${activeChart === 'weekly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// // //               >
// // //                 Weekly Usage
// // //               </button>
// // //               <button
// // //                 onClick={() => setActiveChart('monthly')}
// // //                 className={`px-4 py-2 rounded-md ${activeChart === 'monthly' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
// // //               >
// // //                 Monthly Usage
// // //               </button>
// // //             </div>

// // //             <div className="h-96">
// // //               {activeChart === 'daily' && dailyData && (
// // //                 <>
// // //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Daily Energy Consumption (kWh)</h3>
// // //                   <Bar data={dailyData} options={{ responsive: true, maintainAspectRatio: false }} />
// // //                 </>
// // //               )}
// // //               {activeChart === 'weekly' && weeklyData && (
// // //                 <>
// // //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Weekly Energy Consumption (kWh)</h3>
// // //                   <Pie data={weeklyData} options={{ responsive: true, maintainAspectRatio: false }} />
// // //                 </>
// // //               )}
// // //               {activeChart === 'monthly' && monthlyData && (
// // //                 <>
// // //                   <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Energy Consumption (kWh)</h3>
// // //                   <Bar data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} />
// // //                 </>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {analysis && (
// // //           <div className="bg-white shadow rounded-lg p-6">
// // //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Analysis</h2>
// // //             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;



// // import { useState } from 'react';
// // import { Bar } from 'react-chartjs-2';
// // import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// // Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// // export default function App() {
// //   const [householdData, setHouseholdData] = useState({
// //     costPerKwh: 0.15,
// //     appliances: [
// //       { name: "Refrigerator", wattage: 150, hoursPerDay: 24, daysPerWeek: 7 },
// //       { name: "TV", wattage: 100, hoursPerDay: 4, daysPerWeek: 7 }
// //     ]
// //   });
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (index, field, value) => {
// //     const updated = [...householdData.appliances];
// //     updated[index][field] = field === 'wattage' ? Number(value) : value;
// //     setHouseholdData({...householdData, appliances: updated});
// //   };

// //   const addAppliance = () => {
// //     setHouseholdData({
// //       ...householdData,
// //       appliances: [...householdData.appliances, { name: "", wattage: 0, hoursPerDay: 0, daysPerWeek: 7 }]
// //     });
// //   };

// //   const analyzeEnergy = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:5000/api/calculate-energy', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ householdData })
// //       });
// //       const data = await response.json();
// //       setResults(data);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Chart data preparation
// //   const chartData = {
// //     labels: results?.appliances?.map(x => x.name) || [],
// //     datasets: [
// //       {
// //         label: 'Daily kWh',
// //         data: results?.appliances?.map(x => x.dailyKwh) || [],
// //         backgroundColor: 'rgba(54, 162, 235, 0.7)',
// //         borderColor: 'rgba(54, 162, 235, 1)',
// //         borderWidth: 1
// //       },
// //       {
// //         label: 'Daily Cost ($)',
// //         data: results?.appliances?.map(x => x.dailyCost) || [],
// //         backgroundColor: 'rgba(255, 99, 132, 0.7)',
// //         borderColor: 'rgba(255, 99, 132, 1)',
// //         borderWidth: 1
// //       }
// //     ]
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-6">Energy Consumption Dashboard</h1>
      
// //       {/* Input Section */}
// //       <div className="bg-white p-4 rounded-lg shadow mb-6">
// //         <h2 className="text-xl font-semibold mb-4">Appliance Details</h2>
// //         <div className="mb-4">
// //           <label className="block mb-2">Electricity Rate ($/kWh)</label>
// //           <input
// //             type="number"
// //             value={householdData.costPerKwh}
// //             onChange={(e) => setHouseholdData({...householdData, costPerKwh: Number(e.target.value)})}
// //             className="w-full p-2 border rounded"
// //             step="0.01"
// //           />
// //         </div>

// //         {householdData.appliances.map((app, index) => (
// //           <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded">
// //             <div>
// //               <label className="block mb-1">Appliance Name</label>
// //               <input
// //                 type="text"
// //                 value={app.name}
// //                 onChange={(e) => handleChange(index, 'name', e.target.value)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-1">Wattage (W)</label>
// //               <input
// //                 type="number"
// //                 value={app.wattage}
// //                 onChange={(e) => handleChange(index, 'wattage', e.target.value)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-1">Hours/Day</label>
// //               <input
// //                 type="number"
// //                 value={app.hoursPerDay}
// //                 onChange={(e) => handleChange(index, 'hoursPerDay', e.target.value)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-1">Days/Week</label>
// //               <input
// //                 type="number"
// //                 value={app.daysPerWeek}
// //                 onChange={(e) => handleChange(index, 'daysPerWeek', e.target.value)}
// //                 className="w-full p-2 border rounded"
// //                 min="1"
// //                 max="7"
// //               />
// //             </div>
// //           </div>
// //         ))}

// //         <button 
// //           onClick={addAppliance}
// //           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// //         >
// //           + Add Appliance
// //         </button>
// //         <button 
// //           onClick={analyzeEnergy}
// //           disabled={loading}
// //           className="bg-green-600 text-white px-4 py-2 rounded"
// //         >
// //           {loading ? 'Analyzing...' : 'Calculate Energy Usage'}
// //         </button>
// //       </div>

// //       {/* Results Section */}
// //       {results && (
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h2 className="text-xl font-semibold mb-4">Energy Analysis</h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //             {/* kWh Chart */}
// //             <div className="h-96">
// //               <h3 className="text-lg font-medium mb-2">Energy Consumption (kWh)</h3>
// //               <Bar
// //                 data={{
// //                   labels: chartData.labels,
// //                   datasets: [chartData.datasets[0]]
// //                 }}
// //                 options={{ responsive: true, maintainAspectRatio: false }}
// //               />
// //             </div>
            
// //             {/* Cost Chart */}
// //             <div className="h-96">
// //               <h3 className="text-lg font-medium mb-2">Energy Costs ($)</h3>
// //               <Bar
// //                 data={{
// //                   labels: chartData.labels,
// //                   datasets: [chartData.datasets[1]]
// //                 }}
// //                 options={{ responsive: true, maintainAspectRatio: false }}
// //               />
// //             </div>
// //           </div>

// //           {/* Combined Comparison Chart */}
// //           <div className="h-96 mb-8">
// //             <h3 className="text-lg font-medium mb-2">kWh vs Cost Comparison</h3>
// //             <Bar
// //               data={chartData}
// //               options={{
// //                 responsive: true,
// //                 maintainAspectRatio: false,
// //                 scales: {
// //                   y: {
// //                     beginAtZero: true,
// //                     title: { display: true, text: 'Value' }
// //                   }
// //                 }
// //               }}
// //             />
// //           </div>

// //           {/* Summary */}
// //           <div className="bg-gray-50 p-4 rounded">
// //             <h3 className="text-lg font-medium mb-2">Summary</h3>
// //             <p className="whitespace-pre-line">{results.summary}</p>
// //             <div className="mt-4 grid grid-cols-3 gap-4">
// //               <div className="bg-blue-50 p-3 rounded">
// //                 <p className="font-medium">Total Daily</p>
// //                 <p>{results.totalDailyKwh?.toFixed(2)} kWh</p>
// //               </div>
// //               <div className="bg-green-50 p-3 rounded">
// //                 <p className="font-medium">Daily Cost</p>
// //                 <p>${results.appliances?.reduce((sum, x) => sum + x.dailyCost, 0).toFixed(2)}</p>
// //               </div>
// //               <div className="bg-purple-50 p-3 rounded">
// //                 <p className="font-medium">Monthly Cost</p>
// //                 <p>${results.totalMonthlyCost?.toFixed(2)}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useState, useEffect } from 'react';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

// export default function App() {
//   const [householdData, setHouseholdData] = useState({
//     costPerKwh: 6.5, // ₹6.5/kWh
//     appliances: []
//   });
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [standards, setStandards] = useState({});

//   // Load real appliance data on startup
//   useEffect(() => {
//     fetch('http://localhost:5000/api/standard-appliances')
//       .then(res => res.json())
//       .then(data => {
//         setStandards(data);
//         // Preload 3 common appliances
//         setHouseholdData(prev => ({
//           ...prev,
//           appliances: [
//             { name: "Refrigerator", wattage: data["Refrigerator"].wattage, hoursPerDay: data["Refrigerator"].usage, daysPerWeek: 7 },
//             { name: "LED TV", wattage: data["LED TV"].wattage, hoursPerDay: data["LED TV"].usage, daysPerWeek: 7 },
//             { name: "Ceiling Fan", wattage: data["Ceiling Fan"].wattage, hoursPerDay: data["Ceiling Fan"].usage, daysPerWeek: 7 }
//           ]
//         }));
//       });
//   }, []);

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Vibrant chart colors for India theme
//   const COLORS = [
//     '#FF9933', // Saffron
//     '#138808', // Green
//     '#000080', // Navy
//     '#FF3E3E', // Bright Red
//     '#6A0DAD', // Purple
//     '#00B0FF'  // Sky Blue
//   ];

//   const chartData = {
//     labels: results?.appliances?.map(x => x.name) || [],
//     datasets: [
//       {
//         label: 'Monthly Cost (₹)',
//         data: results?.appliances?.map(x => x.monthlyCost) || [],
//         backgroundColor: COLORS[0],
//         borderColor: '#E67E22',
//         borderWidth: 2,
//         borderRadius: 6
//       },
//       {
//         label: 'Monthly kWh',
//         data: results?.appliances?.map(x => x.monthlyKwh) || [],
//         backgroundColor: COLORS[1],
//         borderColor: '#27AE60',
//         borderWidth: 2,
//         borderRadius: 6
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <header className="bg-white shadow-md rounded-lg p-4 mb-6 text-center">
//         <h1 className="text-3xl font-bold text-saffron">भारत ऊर्जा डैशबोर्ड</h1>
//         <p className="text-navyblue">Monitor your electricity use and save money</p>
//       </header>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Input Panel */}
//         <div className="bg-white p-6 rounded-xl shadow-lg col-span-1">
//           <h2 className="text-xl font-bold mb-4 text-navyblue">Your Appliances</h2>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Electricity Rate (₹/kWh)
//             </label>
//             <input
//               type="number"
//               value={householdData.costPerKwh}
//               onChange={(e) => setHouseholdData({...householdData, costPerKwh: Number(e.target.value)})}
//               className="w-full p-2 border-2 border-saffron rounded-md"
//               step="0.5"
//             />
//           </div>

//           {householdData.appliances.map((app, index) => (
//             <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
//               <select
//                 value={app.name}
//                 onChange={(e) => {
//                   const newApp = [...householdData.appliances];
//                   newApp[index].name = e.target.value;
//                   if (standards[e.target.value]) {
//                     newApp[index].wattage = standards[e.target.value].wattage;
//                     newApp[index].hoursPerDay = standards[e.target.value].usage;
//                   }
//                   setHouseholdData({...householdData, appliances: newApp});
//                 }}
//                 className="w-full p-2 mb-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select Appliance</option>
//                 {Object.keys(standards).map(name => (
//                   <option key={name} value={name}>{name}</option>
//                 ))}
//               </select>
              
//               <div className="grid grid-cols-3 gap-2">
//                 <div>
//                   <label className="block text-xs">Wattage (W)</label>
//                   <input
//                     type="number"
//                     value={app.wattage}
//                     onChange={(e) => {
//                       const newApp = [...householdData.appliances];
//                       newApp[index].wattage = Number(e.target.value);
//                       setHouseholdData({...householdData, appliances: newApp});
//                     }}
//                     className="w-full p-1 border rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs">Hours/Day</label>
//                   <input
//                     type="number"
//                     value={app.hoursPerDay}
//                     onChange={(e) => {
//                       const newApp = [...householdData.appliances];
//                       newApp[index].hoursPerDay = Number(e.target.value);
//                       setHouseholdData({...householdData, appliances: newApp});
//                     }}
//                     className="w-full p-1 border rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs">Days/Week</label>
//                   <input
//                     type="number"
//                     value={app.daysPerWeek}
//                     min="1"
//                     max="7"
//                     onChange={(e) => {
//                       const newApp = [...householdData.appliances];
//                       newApp[index].daysPerWeek = Number(e.target.value);
//                       setHouseholdData({...householdData, appliances: newApp});
//                     }}
//                     className="w-full p-1 border rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="flex space-x-2">
//             <button
//               onClick={() => setHouseholdData({
//                 ...householdData,
//                 appliances: [...householdData.appliances, { name: "", wattage: 0, hoursPerDay: 0, daysPerWeek: 7 }]
//               })}
//               className="flex-1 bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
//             >
//               <span className="mr-1">+</span> Add Appliance
//             </button>
            
//             <button
//               onClick={analyzeEnergy}
//               disabled={loading}
//               className="flex-1 bg-saffron text-white py-2 rounded-md flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Calculating...
//                 </>
//               ) : 'Analyze'}
//             </button>
//           </div>
//         </div>

//         {/* Results Panel */}
//         <div className="lg:col-span-2 space-y-6">
//           {results && (
//             <>
//               {/* Summary Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-green-500">
//                   <h3 className="font-bold text-gray-500">Monthly Consumption</h3>
//                   <p className="text-2xl font-bold">{results.totals?.monthlyKwh?.toFixed(0) || 0} kWh</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-saffron">
//                   <h3 className="font-bold text-gray-500">Monthly Cost</h3>
//                   <p className="text-2xl font-bold">₹{results.totals?.monthlyCost?.toFixed(0) || 0}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl shadow-md border-t-4 border-navyblue">
//                   <h3 className="font-bold text-gray-500">BEE 5-Star Comparison</h3>
//                   <p className="text-xl font-bold">
//                     {results.totals?.monthlyKwh ? 
//                       `₹${(results.totals.monthlyCost * 0.8).toFixed(0)}/mo possible savings` : 
//                       'Add data'
//                     }
//                   </p>
//                 </div>
//               </div>

//               {/* Comparison Charts */}
//               <div className="bg-white p-6 rounded-xl shadow-lg">
//                 <h2 className="text-xl font-bold mb-4 text-navyblue">Energy vs Cost</h2>
//                 <div className="h-80">
//                   <Bar
//                     data={chartData}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: {
//                           position: 'top',
//                           labels: {
//                             font: { size: 14 }
//                           }
//                         },
//                         tooltip: {
//                           callbacks: {
//                             label: (ctx) => {
//                               return ctx.datasetIndex === 0 
//                                 ? `₹${ctx.raw.toFixed(2)}` 
//                                 : `${ctx.raw.toFixed(2)} kWh`;
//                             }
//                           }
//                         }
//                       },
//                       scales: {
//                         y: {
//                           beginAtZero: true,
//                           ticks: {
//                             callback: (value) => value % 1 === 0 ? value : ''
//                           }
//                         }
//                       }
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Appliance Breakdown */}
//               <div className="bg-white p-6 rounded-xl shadow-lg">
//                 <h2 className="text-xl font-bold mb-4 text-navyblue">Appliance Analysis</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {results.appliances?.map((appliance, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                       <h3 className="font-bold text-lg mb-2" style={{ color: COLORS[index % COLORS.length] }}>
//                         {appliance.name}
//                       </h3>
//                       <div className="grid grid-cols-2 gap-2 mb-3">
//                         <div>
//                           <p className="text-sm text-gray-500">Daily</p>
//                           <p className="font-bold">{appliance.dailyKwh?.toFixed(2)} kWh</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Monthly Cost</p>
//                           <p className="font-bold">₹{appliance.monthlyCost?.toFixed(2)}</p>
//                         </div>
//                       </div>
                      
//                       <div className="h-40">
//                         <Doughnut
//                           data={{
//                             labels: ['Your Usage', '5-Star Standard'],
//                             datasets: [{
//                               data: [100, 80], // Example comparison
//                               backgroundColor: [COLORS[index % COLORS.length], '#DDDDDD'],
//                               borderWidth: 0
//                             }]
//                           }}
//                           options={{
//                             cutout: '70%',
//                             plugins: {
//                               legend: { display: false },
//                               tooltip: { enabled: false }
//                             }
//                           }}
//                         />
//                         <p className="text-center -mt-16 font-bold">
//                           {appliance.beeComparison || 'Compare to BEE 5-star'}
//                         </p>
//                       </div>

//                       {appliance.tips?.length > 0 && (
//                         <div className="mt-3">
//                           <h4 className="font-semibold text-sm text-green-600 mb-1">Savings Tips:</h4>
//                           <ul className="list-disc pl-5 text-sm">
//                             {appliance.tips.map((tip, i) => (
//                               <li key={i}>{tip}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Conservation Tips Section */}
//       {results && (
//         <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
//           <h2 className="text-xl font-bold mb-4 text-green-800">💡 Electricity Conservation Guide</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="font-bold mb-2 text-green-700">Immediate Actions</h3>
//               <ul className="space-y-2">
//                 <li>• Set AC to 24°C (saves ₹500-800/month)</li>
//                 <li>• Switch off appliances at plug point</li>
//                 <li>• Use natural light during daytime</li>
//               </ul>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="font-bold mb-2 text-green-700">Mid-Term Savings</h3>
//               <ul className="space-y-2">
//                 <li>• Replace old fans with BEE 5-star models</li>
//                 <li>• Install solar water heater</li>
//                 <li>• Use smart power strips</li>
//               </ul>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <h3 className="font-bold mb-2 text-green-700">Long-Term Investments</h3>
//               <ul className="space-y-2">
//                 <li>• Rooftop solar panels (3-5 year payback)</li>
//                 <li>• Energy audit by DISCOM</li>
//                 <li>• Home insulation improvements</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// // }




import { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiPlus, FiZap, FiDollarSign, FiBarChart2, FiInfo, FiClock, FiSun, FiAlertCircle } from 'react-icons/fi';
import { FaFan, FaTemperatureLow, FaLightbulb, FaTv } from 'react-icons/fa';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

// Vibrant Indian color palette
const COLORS = {
  saffron: '#FF9933',
  green: '#138808',
  navy: '#000080',
  red: '#FF3E3E',
  purple: '#6A0DAD',
  blue: '#00B0FF',
  teal: '#20B2AA'
};

const applianceIcons = {
  'Refrigerator': <FaTemperatureLow className="text-blue-500" />,
  'LED TV': <FaTv className="text-purple-500" />,
  'Ceiling Fan': <FaFan className="text-teal-500" />,
  'AC': <FaTemperatureLow className="text-red-500" />,
  'LED Bulb': <FaLightbulb className="text-yellow-500" />,
  'default': <FiZap className="text-saffron" />
};

export default function EnergyDashboard() {
  const [householdData, setHouseholdData] = useState({
    costPerKwh: 6.5,
    appliances: []
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [standards, setStandards] = useState({});
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedAppliance, setSelectedAppliance] = useState(null);

  // Load appliance data
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockStandards = {
      "Refrigerator": { wattage: 150, usage: 24, beeRating: 4 },
      "LED TV": { wattage: 100, usage: 4, beeRating: 5 },
      "Ceiling Fan": { wattage: 75, usage: 12, beeRating: 3 },
      "AC": { wattage: 1500, usage: 8, beeRating: 2 },
      "LED Bulb": { wattage: 9, usage: 6, beeRating: 5 },
      "Washing Machine": { wattage: 500, usage: 1, beeRating: 4 }
    };
    
    setStandards(mockStandards);
    setHouseholdData(prev => ({
      ...prev,
      appliances: [
        { name: "Refrigerator", wattage: mockStandards["Refrigerator"].wattage, hoursPerDay: mockStandards["Refrigerator"].usage, daysPerWeek: 7 },
        { name: "LED TV", wattage: mockStandards["LED TV"].wattage, hoursPerDay: mockStandards["LED TV"].usage, daysPerWeek: 7 },
        { name: "Ceiling Fan", wattage: mockStandards["Ceiling Fan"].wattage, hoursPerDay: mockStandards["Ceiling Fan"].usage, daysPerWeek: 7 }
      ]
    }));
  }, []);

  const analyzeEnergy = async () => {
    setLoading(true);
    try {
      // Mock calculation - replace with actual API call
      const mockResults = {
        totals: {
          monthlyKwh: householdData.appliances.reduce((sum, app) => 
            sum + (app.wattage * app.hoursPerDay * app.daysPerWeek * 4.345 / 1000), 0),
          monthlyCost: householdData.appliances.reduce((sum, app) => 
            sum + (app.wattage * app.hoursPerDay * app.daysPerWeek * 4.345 / 1000 * householdData.costPerKwh), 0)
        },
        appliances: householdData.appliances.map(app => ({
          name: app.name,
          dailyKwh: (app.wattage * app.hoursPerDay) / 1000,
          monthlyKwh: (app.wattage * app.hoursPerDay * app.daysPerWeek * 4.345) / 1000,
          monthlyCost: (app.wattage * app.hoursPerDay * app.daysPerWeek * 4.345) / 1000 * householdData.costPerKwh,
          beeComparison: `Could save ${Math.round(100 - (standards[app.name]?.beeRating/5*100))}% with 5-star`,
          tips: [
            `Use ${app.name} during off-peak hours`,
            `Clean/maintain regularly for better efficiency`,
            `Consider upgrading to BEE 5-star model`
          ]
        }))
      };
      
      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Error analyzing energy:", error);
    }
  };

  // Chart data configurations
  const consumptionChartData = {
    labels: results?.appliances?.map(x => x.name) || [],
    datasets: [
      {
        label: 'Monthly Cost (₹)',
        data: results?.appliances?.map(x => x.monthlyCost) || [],
        backgroundColor: COLORS.saffron,
        borderColor: '#E67E22',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'Monthly kWh',
        data: results?.appliances?.map(x => x.monthlyKwh) || [],
        backgroundColor: COLORS.green,
        borderColor: '#27AE60',
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  const applianceDistributionData = {
    labels: results?.appliances?.map(x => x.name) || [],
    datasets: [{
      data: results?.appliances?.map(x => x.monthlyCost) || [],
      backgroundColor: Object.values(COLORS),
      borderWidth: 0
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center border-b-4 border-saffron">
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
          <span className="text-saffron">Smart</span> Energy Comparator
        </h1>
        <p className="text-gray-600 text-lg">Smart energy monitoring for Indian households</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Input Panel - Left Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-navy text-white">
            <h2 className="text-xl font-bold flex items-center">
              <FiZap className="mr-2" /> Your Appliances
            </h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiDollarSign className="mr-2" /> Electricity Rate
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={householdData.costPerKwh}
                  onChange={(e) => setHouseholdData({...householdData, costPerKwh: Number(e.target.value)})}
                  className="w-full pl-10 pr-3 py-3 border-2 border-saffron rounded-lg focus:ring-2 focus:ring-saffron focus:border-saffron"
                  step="0.5"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">/kWh</span>
              </div>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {householdData.appliances.map((app, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-saffron transition">
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
                    className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron"
                  >
                    <option value="">Select Appliance</option>
                    {Object.keys(standards).map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <label className="block text-xs text-gray-500">Wattage</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={app.wattage}
                          onChange={(e) => {
                            const newApp = [...householdData.appliances];
                            newApp[index].wattage = Number(e.target.value);
                            setHouseholdData({...householdData, appliances: newApp});
                          }}
                          className="w-full p-2 border rounded-lg text-center"
                        />
                        <span className="absolute right-2 top-2 text-xs text-gray-400">W</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Hours/Day</label>
                      <input
                        type="number"
                        value={app.hoursPerDay}
                        onChange={(e) => {
                          const newApp = [...householdData.appliances];
                          newApp[index].hoursPerDay = Number(e.target.value);
                          setHouseholdData({...householdData, appliances: newApp});
                        }}
                        className="w-full p-2 border rounded-lg text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Days/Week</label>
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
                        className="w-full p-2 border rounded-lg text-center"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const newApp = [...householdData.appliances];
                      newApp.splice(index, 1);
                      setHouseholdData({...householdData, appliances: newApp});
                    }}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setHouseholdData({
                  ...householdData,
                  appliances: [...householdData.appliances, { name: "", wattage: 0, hoursPerDay: 0, daysPerWeek: 7 }]
                })}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center font-medium transition"
              >
                <FiPlus className="mr-2" /> Add Appliance
              </button>
              
              <button
                onClick={analyzeEnergy}
                disabled={loading || householdData.appliances.length === 0}
                className={`w-full py-3 rounded-lg flex items-center justify-center font-medium transition ${
                  loading || householdData.appliances.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-saffron hover:bg-orange-600 text-white'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    <FiBarChart2 className="mr-2" /> Analyze Energy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              {/* Results Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl font-bold text-navy">Your Energy Analysis</h2>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <button
                      onClick={() => setActiveTab('analysis')}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'analysis' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FiBarChart2 className="mr-2" /> Analysis
                    </button>
                    <button
                      onClick={() => setActiveTab('savings')}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        activeTab === 'savings' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FiDollarSign className="mr-2" /> Savings
                    </button>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Monthly Consumption</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {results.totals?.monthlyKwh?.toFixed(0) || 0} kWh
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <FiZap />
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      ≈ {Math.round(results.totals?.monthlyKwh / 30)} kWh/day
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-green-700 font-medium">Monthly Cost</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₹{results.totals?.monthlyCost?.toFixed(0) || 0}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <FiDollarSign />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      ≈ ₹{Math.round(results.totals?.monthlyCost / 30)}/day
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border-l-4 border-purple-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-purple-700 font-medium">Potential Savings</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₹{(results.totals?.monthlyCost * 0.15).toFixed(0)}
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <FiInfo />
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">
                      with 15% efficiency improvement
                    </p>
                  </div>
                </div>

                {activeTab === 'analysis' ? (
                  <>
                    {/* Consumption vs Cost Chart */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <FiBarChart2 className="mr-2 text-saffron" /> Energy vs Cost
                        </h3>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">kWh</span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">₹ Cost</span>
                        </div>
                      </div>
                      <div className="h-64">
                        <Bar
                          data={consumptionChartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
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
                              x: {
                                grid: { display: false }
                              },
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

                    {/* Appliance Distribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <FiClock className="mr-2 text-green-500" /> Usage Distribution
                        </h3>
                        <div className="h-64">
                          <Pie
                            data={applianceDistributionData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: 'right',
                                  labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 16
                                  }
                                },
                                tooltip: {
                                  callbacks: {
                                    label: (context) => {
                                      const total = results.totals.monthlyCost;
                                      const value = context.raw;
                                      const percentage = Math.round((value / total) * 100);
                                      return `${context.label}: ₹${value.toFixed(2)} (${percentage}%)`;
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Appliance List */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <FiZap className="mr-2 text-saffron" /> Appliance Details
                        </h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                          {results.appliances?.map((appliance, index) => (
                            <div 
                              key={index} 
                              className={`p-3 rounded-lg border cursor-pointer transition ${
                                selectedAppliance?.name === appliance.name 
                                  ? 'border-saffron bg-orange-50' 
                                  : 'border-gray-200 hover:border-saffron'
                              }`}
                              onClick={() => setSelectedAppliance(appliance)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="p-2 mr-3 bg-white rounded-lg shadow-sm">
                                    {applianceIcons[appliance.name] || applianceIcons.default}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">{appliance.name}</h4>
                                    <p className="text-xs text-gray-500">
                                      {appliance.wattage}W × {appliance.hoursPerDay}h/day
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-navy">₹{appliance.monthlyCost.toFixed(0)}</p>
                                  <p className="text-xs text-gray-500">{appliance.monthlyKwh.toFixed(1)} kWh</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Selected Appliance Details */}
                    {selectedAppliance && (
                      <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-saffron">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="p-3 mr-4 bg-gray-100 rounded-xl">
                              {applianceIcons[selectedAppliance.name] || applianceIcons.default}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{selectedAppliance.name}</h3>
                              <p className="text-gray-600">
                                {selectedAppliance.wattage}W × {selectedAppliance.hoursPerDay}h/day × {selectedAppliance.daysPerWeek}d/wk
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedAppliance(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ×
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Daily Usage</p>
                            <p className="text-xl font-bold">{selectedAppliance.dailyKwh.toFixed(2)} kWh</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Monthly Usage</p>
                            <p className="text-xl font-bold">{selectedAppliance.monthlyKwh.toFixed(1)} kWh</p>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <p className="text-sm text-orange-600 font-medium">Monthly Cost</p>
                            <p className="text-xl font-bold">₹{selectedAppliance.monthlyCost.toFixed(1)}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <FiAlertCircle className="mr-2 text-green-600" /> Efficiency Tips
                          </h4>
                          <ul className="space-y-2">
                            {selectedAppliance.tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Savings Tab Content */
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <FiDollarSign className="mr-2 text-green-500" /> Savings Opportunities
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
                            <FiSun />
                          </div>
                          <h4 className="font-bold text-green-800">Immediate Actions</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                            <span>Set AC to 24°C (saves ₹500-800/month)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                            <span>Switch off appliances at plug point when not in use</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                            <span>Use natural light during daytime</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                            <FiClock />
                          </div>
                          <h4 className="font-bold text-blue-800">Mid-Term Savings</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                            <span>Replace old fans with BEE 5-star models (saves ₹200/month per fan)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                            <span>Install solar water heater (saves ₹800-1200/month)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                            <span>Use smart power strips to eliminate phantom loads</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
                          <FiZap />
                        </div>
                        <h4 className="font-bold text-purple-800">Long-Term Investments</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                          <span>Rooftop solar panels (3-5 year payback, saves 70-100% on bills)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                          <span>Energy audit by DISCOM (identifies hidden inefficiencies)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                          <span>Home insulation improvements (reduces AC load by 20-30%)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiZap className="text-3xl text-saffron" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Analyze Your Energy Use?</h3>
                <p className="text-gray-600 mb-6">
                  Add your appliances and electricity rate, then click "Analyze Energy" to see detailed breakdowns and savings opportunities.
                </p>
                <button
                  onClick={analyzeEnergy}
                  disabled={householdData.appliances.length === 0}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    householdData.appliances.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-saffron hover:bg-orange-600 text-white'
                  }`}
                >
                  Analyze Energy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Bharat Energy Analyzer • Data for illustrative purposes</p>
        <p className="mt-1">For accurate analysis, consult with a certified energy auditor</p>
      </footer>
    </div>
  );
}
