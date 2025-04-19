const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

let gemini;

const initialize = () => {
  if (!config.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }
  gemini = new GoogleGenerativeAI(config.GEMINI_API_KEY);
};

const generateText = async (prompt) => {
  if (!gemini) {
    throw new Error('Gemini service not initialized');
  }

  try {
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

module.exports = {
  initialize,
  generateText
};