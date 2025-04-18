import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const taglines = [
  "Smart Energy, Simple Living",
  "Save Watts, Save Wallet",
  "Your Home. Smarter, Safer, Stronger",
  "Cut Costs, Not Comfort",
  "Energy Talks – In Your Language",
  "Power Smarter – With Every Hour",
  "Your Friendly Energy Guide – From Bulbs to Bills",
  "Beating Bills, One Appliance at a Time",
  "Energy Awareness Made Human",
  "Smarter Homes Start With Smarter Choices"
];

// Dummy data for weekly and monthly charts
const weeklyData = [
  { day: 'Mon', usage: 20 },
  { day: 'Tue', usage: 25 },
  { day: 'Wed', usage: 18 },
  { day: 'Thu', usage: 30 },
  { day: 'Fri', usage: 22 },
  { day: 'Sat', usage: 28 },
  { day: 'Sun', usage: 24 }
];

const monthlyData = [
  { month: 'Jan', usage: 120 },
  { month: 'Feb', usage: 98 },
  { month: 'Mar', usage: 134 },
  { month: 'Apr', usage: 110 },
  { month: 'May', usage: 150 },
  { month: 'Jun', usage: 165 }
];

// Cost prediction dummy data
const costPredictionData = period =>
  period === 'weekly'
    ? [
        { name: 'Current Week', cost: 18 },
        { name: 'Target Week', cost: 15 }
      ]
    : [
        { name: 'Current Month', cost: 75 },
        { name: 'Target Month', cost: 60 }
      ];

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 text-white text-xl`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default function KriyetaApp() {
  const [tagline, setTagline] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [activeTab, setActiveTab] = useState('dashboard');
  const [period, setPeriod] = useState('weekly');

  useEffect(() => {
    const idx = Math.floor(Math.random() * taglines.length);
    setTagline(taglines[idx]);
  }, []);

  const submitSuggestion = () => {
    if (suggestion.trim()) {
      setResponseMsg("Thanks for your suggestion!");
      setSuggestion("");
    } else {
      setResponseMsg("Please enter a suggestion before submitting.");
    }
  };

  const renderDashboard = () => {
    const data = period === 'weekly' ? weeklyData : monthlyData;
    const costData = costPredictionData(period);

    return (
      <div className="p-6 space-y-6">
        {/* Tagline banner */}
        <div className="bg-orange-600 text-white py-3 px-4 rounded-lg text-center">
          <p className="font-medium">{tagline}</p>
        </div>

        {/* Period selector */}
        <div className="flex space-x-4">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-2 rounded ${period === 'weekly' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded ${period === 'monthly' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
          >
            Monthly
          </button>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">{period === 'weekly' ? 'Weekly' : 'Monthly'} Consumption</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={period === 'weekly' ? 'day' : 'month'} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Cost Prediction vs Goal</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#f97316" barSize={30} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Energy Management Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              title="Bill Prediction"
              description="Accurate monthly electricity cost forecasts based on your appliance usage patterns."
              icon="📊"
              color="bg-blue-500"
            />
            <FeatureCard
              title="Fault Detection"
              description="Identify malfunctioning appliances through abnormal energy consumption patterns."
              icon="⚠️"
              color="bg-red-500"
            />
            <FeatureCard
              title="Energy Savings"
              description="Personalized recommendations to reduce your monthly electricity bills."
              icon="💰"
              color="bg-green-500"
            />
            <FeatureCard
              title="Usage Alerts"
              description="Real-time notifications for unusual consumption or warranty expirations."
              icon="🔔"
              color="bg-yellow-500"
            />
            <FeatureCard
              title="Appliance Insights"
              description="Detailed breakdown of each appliance's contribution to your total bill."
              icon="🔌"
              color="bg-purple-500"
            />
            <FeatureCard
              title="Multi-Language"
              description="Voice commands and interface available in regional languages."
              icon="🌐"
              color="bg-teal-500"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSuggestions = () => (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Drop your suggestion here 👇</h2>
      <textarea
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-orange-700"
        placeholder="Your suggestion..."
      />
      <button
        onClick={submitSuggestion}
        className="mt-4 bg-orange-700 text-white px-6 py-2 rounded hover:bg-orange-800 transition"
      >
        Submit
      </button>
      {responseMsg && (
        <p className={`mt-4 font-medium ${responseMsg.startsWith("Thanks") ? "text-green-600" : "text-red-500"}`}>
          {responseMsg}
        </p>
      )}
    </div>
  );

  const renderFAQs = () => {
    const faqs = [
      { 
        q: "What is this Smart AI Assistant for?", 
        a: "It helps households reduce electricity bills, track appliance usage, get servicing alerts, and receive energy-saving tips using AI-powered insights." 
      },
      { 
        q: "How does the cost prediction work?", 
        a: "Our advanced algorithms analyze your appliance usage patterns, local electricity rates, and historical data to provide accurate monthly cost estimates." 
      },
      { 
        q: "What information do I need to provide?", 
        a: "Just basic details like appliance name, brand, daily usage hours, and warranty or guarantee expiry date. We make the process simple and intuitive." 
      },
      { 
        q: "Can I use this in my local language?", 
        a: "Yes! The assistant supports multiple languages including Hindi, Tamil, Bengali and more through our advanced language processing system." 
      },
      { 
        q: "Will I get alerts for warranty or high energy use?", 
        a: "Absolutely. You'll receive timely alerts before warranty expiry and if any appliance exceeds safe consumption limits based on BEE ratings." 
      },
      { 
        q: "How do I track my past electricity bills?", 
        a: "You can upload meter readings or past bills manually. The system will then analyze usage trends and give insights." 
      }
    ];

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 font-semibold focus:outline-none"
                onClick={() => document.getElementById(`faq-${i}`).classList.toggle('hidden')}
              >
                <span className="text-left">{f.q}</span>
                <span className="text-orange-600">+</span>
              </button>
              <div id={`faq-${i}`} className="hidden px-6 py-4 bg-white">
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-orange-700">Kriyeta Energy</h2>
        </div>
        <ul className="flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'suggestions', label: 'Suggestions' },
            { id: 'faqs', label: 'FAQs' }
          ].map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-6 py-4 hover:bg-orange-50 transition ${
                  activeTab === tab.id ? 'bg-orange-50 text-orange-700 font-semibold border-r-4 border-orange-700' : 'text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t text-sm text-gray-500">
          <p>v1.0.0</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </header>
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'suggestions' && renderSuggestions()}
        {activeTab === 'faqs' && renderFAQs()}
      </div>
    </div>
  );
}