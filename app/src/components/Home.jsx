import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiChevronUp, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";


const handelDashboard = () => { 
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

const FeatureCard = ({ title, desc, icon, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300 ${isHovered ? 'transform -translate-y-2 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h5 className="text-xl font-bold text-gray-800 mb-2">{title}</h5>
        <p className="text-gray-600 text-sm mb-4">{desc}</p>
      </div>
      <a
        href="#"
        className={`mt-auto inline-block border ${isHovered ? 'bg-orange-600 border-orange-600 text-white' : 'border-orange-600 text-orange-600'} py-2 px-4 rounded-lg font-medium transition-colors duration-300`}
      >
        Get Started
      </a>
    </div>
  );
};

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button
        className="w-full flex justify-between items-center px-6 py-4 font-semibold bg-gray-50 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-left text-gray-800">{question}</span>
        {isOpen ? <FiChevronUp className="text-orange-600" /> : <FiChevronDown className="text-orange-600" />}
      </button>
      <div
        ref={contentRef}
        className={`px-6 py-4 bg-white text-gray-700 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
      >
        {answer}
      </div>
    </div>
  );
};

export default function KriyetaApp() {
  const [tagline, setTagline] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    setTagline(taglines[randomIndex]);
  }, []);

  const submitSuggestion = () => {
    if (!suggestion.trim()) {
      setResponseMsg("Please enter a suggestion before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
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
      icon: "💰",
      color: "bg-blue-500"
    },
    {
      title: "Find Faulty Appliances",
      desc: "Monitor appliance performance and detect inefficiencies or potential malfunctions.",
      icon: "🔍",
      color: "bg-green-500"
    },
    {
      title: "Save for Tomorrow",
      desc: "Turn savings from reduced energy bills into future investments or emergency funds.",
      icon: "🏦",
      color: "bg-purple-500"
    },
    {
      title: "Get Smart Alerts",
      desc: "Receive real-time notifications on high usage, warranty alerts, or faulty appliances.",
      icon: "🔔",
      color: "bg-red-500"
    },
    {
      title: "Reduce Cost",
      desc: "Explore personalized tips and strategies to lower your monthly electricity bills.",
      icon: "📉",
      color: "bg-yellow-500"
    },
    {
      title: "Energy Reports",
      desc: "Get detailed monthly reports with insights and recommendations for better energy management.",
      icon: "📊",
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
    <div className="font-sans bg-gray-50 min-h-screen">
     
      <header className="relative bg-gradient-to-r from-green-500 to-green-600 text-white p-6 shadow-lg">
        
        <div className="container mx-auto mt-8 mb-6 animate-fadeIn">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back, Aryan!</h1>
            <p className="text-lg mb-4 text-gray-600">How can we make your energy management better today?</p>
            <div className="flex space-x-3">
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition"
              onClick={handelDashboard}>
                View Dashboard
              </button>
             
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Tagline with animation */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-xl font-medium animate-pulse">{tagline}</p>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <main className="container mx-auto py-10 px-4">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'features' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'faq' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'feedback' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback
          </button>
        </div>

        {activeTab === 'features' && (
          <section className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                color={feature.color}
              />
            ))}
          </section>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">We value your feedback</h2>
              <p className="text-gray-600 mb-6">Help us improve your experience</p>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Your Suggestion</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  rows="5"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="What would you like to see improved?"
                ></textarea>
              </div>
              
              <button
                onClick={submitSuggestion}
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium text-white ${isSubmitting ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} transition`}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
              
              {responseMsg && (
                <div className={`mt-4 p-4 rounded-lg flex items-start ${responseMsg.startsWith("Thanks") ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {responseMsg.startsWith("Thanks") ? (
                    <FiCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  ) : (
                    <FiAlertCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                  )}
                  <p>{responseMsg}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Animated Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kriyeta Energy</h3>
              <p className="text-gray-400">Making energy management simple and effective for every household.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Bill Prediction</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Appliance Monitoring</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Savings Planner</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Smart Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@kriyeta.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 Energy Ave, Green City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Kriyeta Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}