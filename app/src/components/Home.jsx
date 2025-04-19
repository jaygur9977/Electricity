


import React, { useEffect, useState, useRef } from "react";
import { 
  FiChevronDown, FiChevronUp, FiSend, FiCheckCircle, 
  FiAlertCircle, FiBarChart2, FiZap, FiDollarSign,
  FiHome, FiClock, FiSettings, FiUser, FiTrendingUp,
  FiBattery, FiSun, FiWind, FiDroplet
} from "react-icons/fi";
import { Chart } from 'react-google-charts';
import { motion, AnimatePresence } from "framer-motion";

const handleDashboard = () => { 
  window.location.href = '/dashboard';
};

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

const EnergyPulse = () => {
  return (
    <div className="absolute -top-10 -right-10 w-40 h-40">
      <motion.div 
        className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute inset-4 rounded-full bg-blue-500 opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div 
        className="absolute inset-8 rounded-full bg-blue-600 opacity-40"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    const apiKey = "5660c1d2975c42a9be6160711251904";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong while fetching the weather.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const text = condition.toLowerCase();
    if (text.includes("sunny")) return "☀️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("rain")) return "🌧️";
    if (text.includes("snow")) return "❄️";
    return "🌤️";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full md:w-96 border border-white/20 shadow-lg h-fit">
      <h2 className="text-xl font-bold mb-4">Check Local Weather</h2>
      <div className="relative mb-3">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city or zip code"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-white placeholder-white/70"
        />
      </div>
      <motion.button
        onClick={getWeather}
        disabled={loading}
        className={`w-full p-3 rounded-lg font-bold text-white transition-all ${
          loading ? 'bg-blue-400' : 'bg-orange-500 hover:bg-orange-600'
        }`}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </motion.button>
      
      {error && (
        <div className="mt-3 p-2 bg-red-500/20 text-red-100 rounded-lg text-sm">
          {error}
        </div>
      )}

      {weatherData && (
        <motion.div 
          className="mt-6 bg-white/20 p-4 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{weatherData.location.name}</h3>
              <p className="text-blue-100">{weatherData.current.condition.text}</p>
            </div>
            <span className="text-4xl">
              {getWeatherIcon(weatherData.current.condition.text)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-blue-200">Temperature</p>
              <p className="text-2xl font-bold">{weatherData.current.temp_c}°C</p>
            </div>
            <div>
              <p className="text-sm text-blue-200">Humidity</p>
              <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-blue-200">Wind</p>
              <p className="text-2xl font-bold">{weatherData.current.wind_kph} km/h</p>
            </div>
            <div>
              <p className="text-sm text-blue-200">Feels Like</p>
              <p className="text-2xl font-bold">{weatherData.current.feelslike_c}°C</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 p-6">
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4 text-white text-2xl transform group-hover:rotate-12 transition-transform`}>
          {icon}
        </div>
        <h5 className="text-xl font-bold text-gray-800 mb-3">{title}</h5>
        <p className="text-gray-600 mb-5">{desc}</p>
        <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const EnergyChart = () => {
  const data = [
    ["Hour", "Usage", "Average"],
    ["12AM", 350, 400],
    ["3AM", 200, 400],
    ["6AM", 450, 400],
    ["9AM", 700, 400],
    ["12PM", 950, 400],
    ["3PM", 800, 400],
    ["6PM", 1100, 400],
    ["9PM", 750, 400],
    ["12AM", 500, 400]
  ];

  const options = {
    title: "Today's Energy Consumption",
    curveType: "function",
    legend: { position: "bottom" },
    series: {
      0: { color: "#3B82F6" },
      1: { color: "#94A3B8", lineDashStyle: [4, 4] }
    },
    backgroundColor: "transparent",
    chartArea: { backgroundColor: "transparent" },
    hAxis: {
      textStyle: { color: "#64748B" }
    },
    vAxis: {
      textStyle: { color: "#64748B" },
      gridlines: { color: "#E2E8F0" }
    },
    titleTextStyle: {
      color: "#1E293B",
      fontSize: 16,
      bold: true
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <Chart
        chartType="LineChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    </div>
  );
};

const ApplianceUsage = () => {
  const appliances = [
    { name: "AC", usage: 45, icon: <FiWind className="text-blue-500" /> },
    { name: "Fridge", usage: 20, icon: <FiDroplet className="text-green-500" /> },
    { name: "TV", usage: 15, icon: <FiSun className="text-yellow-500" /> },
    { name: "Lights", usage: 10, icon: <FiZap className="text-orange-500" /> },
    { name: "Others", usage: 10, icon: <FiHome className="text-purple-500" /> }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Appliance Usage</h3>
      <div className="space-y-4">
        {appliances.map((appliance, index) => (
          <div key={index} className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              {appliance.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{appliance.name}</span>
                <span className="text-sm font-medium text-gray-900">{appliance.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className={`h-2 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : index === 3 ? 'bg-orange-500' : 'bg-purple-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${appliance.usage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SavingsCard = () => {
  const [savings, setSavings] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (savings < 28) {
        setSavings(prev => prev + 1);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [savings]);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-2">Your Monthly Savings</h3>
        <div className="flex items-end mb-4">
          <span className="text-4xl font-bold mr-2">{savings}%</span>
          <span className="text-blue-200 mb-1">vs last month</span>
        </div>
        <div className="flex items-center">
          <FiTrendingUp className="text-yellow-300 mr-2 text-xl" />
          <span className="text-sm text-blue-100">You're on track to save ₹1,250 this month</span>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <motion.div 
      className={`mb-4 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-md' : 'bg-gray-50'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <motion.button
        className="w-full flex justify-between items-center px-6 py-4 font-medium text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
      >
        <span className="text-gray-800 text-lg">{question}</span>
        {isOpen ? 
          <FiChevronUp className="text-orange-600 text-xl" /> : 
          <FiChevronDown className="text-orange-600 text-xl" />
        }
      </motion.button>
      <motion.div
        ref={contentRef}
        className={`px-6 transition-all duration-300 overflow-hidden ${isOpen ? 'pb-4 opacity-100' : 'opacity-0'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default function KriyetaApp() {
  const [tagline, setTagline] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  const [activeTip, setActiveTip] = useState(0);

  const tips = [
    "Turn off appliances at the wall when not in use - they still consume energy in standby mode.",
    "Set your AC to 24°C - each degree lower increases energy consumption by 6%.",
    "Use natural light during the day and switch to LED bulbs which use 75% less energy.",
    "Run your washing machine with full loads and use cold water settings when possible.",
    "Clean your AC filters monthly - dirty filters make your AC work harder."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    setTagline(taglines[randomIndex]);
    
    const tipInterval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(tipInterval);
  }, []);

  const submitSuggestion = () => {
    if (!suggestion.trim()) {
      setResponseMsg("Please enter a suggestion before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setResponseMsg("Thanks for your suggestion! We'll review it shortly.");
      setSuggestion("");
      setIsSubmitting(false);
    }, 1500);
  };

  const features = [
    {
      title: "Predict Bill",
      desc: "Forecast monthly electricity costs by analyzing appliance usage, power ratings, and past bills.",
      icon: <FiDollarSign size={24} />,
      color: "bg-blue-500"
    },
    {
      title: "Find Faulty Appliances",
      desc: "Monitor appliance performance and detect inefficiencies or potential malfunctions.",
      icon: <FiAlertCircle size={24} />,
      color: "bg-green-500"
    },
    {
      title: "Save for Tomorrow",
      desc: "Turn savings from reduced energy bills into future investments or emergency funds.",
      icon: <FiBarChart2 size={24} />,
      color: "bg-purple-500"
    },
    {
      title: "Get Smart Alerts",
      desc: "Receive real-time notifications on high usage, warranty alerts, or faulty appliances.",
      icon: <FiAlertCircle size={24} />,
      color: "bg-red-500"
    },
    {
      title: "Reduce Cost",
      desc: "Explore personalized tips and strategies to lower your monthly electricity bills.",
      icon: <FiZap size={24} />,
      color: "bg-yellow-500"
    },
    {
      title: "Energy Reports",
      desc: "Get detailed monthly reports with insights and recommendations for better energy management.",
      icon: <FiBarChart2 size={24} />,
      color: "bg-teal-500"
    }
  ];

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
    }
  ];

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Modern Header with Weather Widget */}
      <header className="relative py-12 px-6 sm:px-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full bg-blue-300 filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row gap-8">
          {/* Main Content (Left) */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex-1 border border-white/20 shadow-lg relative overflow-hidden">
            <EnergyPulse />
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome back<span className="text-orange-300"></span>!
            </motion.h1>
            <motion.p 
              className="text-lg text-blue-100 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How can we make your energy management better today?
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center shadow-lg hover:shadow-orange-500/20"
                onClick={handleDashboard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBarChart2 className="mr-2" />
                View Dashboard
              </motion.button>
              <motion.button 
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all border border-white/20 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiZap className="mr-2" />
                Quick Tips
              </motion.button>
            </motion.div>
          </div>

          {/* Weather Widget (Right) */}
          <WeatherWidget />
        </div>
      </header>

      {/* Animated Tagline with Energy Tips */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 shadow-md relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 mr-3 bg-white/20 rounded-full flex items-center justify-center">
              <FiZap className="text-yellow-200 animate-pulse" />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTip}
                className="text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {tips[activeTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* Modern Tab Navigation */}
        <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <motion.button
            className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${activeTab === 'features' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('features')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center">
              <FiZap className="mr-2" /> Features
            </span>
          </motion.button>
          <motion.button
            className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${activeTab === 'insights' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('insights')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center">
              <FiTrendingUp className="mr-2" /> Insights
            </span>
          </motion.button>
          <motion.button
            className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${activeTab === 'faq' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('faq')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center">
              <FiAlertCircle className="mr-2" /> FAQ
            </span>
          </motion.button>
          <motion.button
            className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${activeTab === 'feedback' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('feedback')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center">
              <FiSend className="mr-2" /> Feedback
            </span>
          </motion.button>
        </div>

        {activeTab === 'features' && (
          <motion.section 
            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                color={feature.color}
                delay={index}
              />
            ))}
          </motion.section>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 grid-cols-1 lg:grid-cols-2"
          >
            <EnergyChart />
            <div className="space-y-8">
              <SavingsCard />
              <ApplianceUsage />
            </div>
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'feedback' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">We value your feedback</h2>
              <p className="text-gray-600 mb-6">Help us improve your experience</p>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Your Suggestion</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  rows="5"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
                  placeholder="What would you like to see improved?"
                ></textarea>
              </div>
              
              <motion.button
                onClick={submitSuggestion}
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium text-white ${isSubmitting ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} transition shadow-lg hover:shadow-orange-500/20`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Submit Feedback
                  </>
                )}
              </motion.button>
              
              {responseMsg && (
                <motion.div 
                  className={`mt-4 p-4 rounded-lg flex items-start ${responseMsg.startsWith("Thanks") ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {responseMsg.startsWith("Thanks") ? (
                    <FiCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  ) : (
                    <FiAlertCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                  )}
                  <p>{responseMsg}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full bg-blue-300 filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kriyeta Energy</h3>
              <p className="text-blue-200">Making energy management simple and effective for every household.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition">Bill Prediction</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Appliance Monitoring</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Savings Planner</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Smart Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-blue-200 hover:text-white transition cursor-pointer">support@kriyeta.com</li>
                <li className="text-blue-200 hover:text-white transition cursor-pointer">+1 (555) 123-4567</li>
                <li className="text-blue-200 hover:text-white transition cursor-pointer">123 Energy Ave, Green City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-600 mt-8 pt-8 text-center text-blue-200">
            <p>© {new Date().getFullYear()} Kriyeta Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
