import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const askGemini = async () => {
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://electricity-silk.onrender.com/api/ask-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
      console.log('Gemini response:', data.answer);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get response from Gemini');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Gemini API React Demo</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask Gemini anything..."
          disabled={isLoading}
        />
        <button onClick={askGemini} disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Ask Gemini'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="response">
        <h2>Response:</h2>
        {isLoading ? (
          <div className="loading">Generating answer...</div>
        ) : (
          <pre>{answer || 'Your answer will appear here'}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
