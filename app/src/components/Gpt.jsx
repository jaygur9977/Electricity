// import { useState } from 'react';

// function App() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const askGemini = async () => {
//     if (!question.trim()) {
//       setError('Please enter a question');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch('http://localhost:5000/api/ask-gemini', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setAnswer(data.answer);
//       console.log('Gemini response:', data.answer);
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to get response from Gemini');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Gemini API React Demo</h1>
      
//       <div className="input-container">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask Gemini anything..."
//           disabled={isLoading}
//         />
//         <button onClick={askGemini} disabled={isLoading}>
//           {isLoading ? 'Thinking...' : 'Ask Gemini'}
//         </button>
//       </div>

//       {error && <div className="error">{error}</div>}

//       <div className="response">
//         <h2>Response:</h2>
//         {isLoading ? (
//           <div className="loading">Generating answer...</div>
//         ) : (
//           <pre>{answer || 'Your answer will appear here'}</pre>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('https://electricity-silk.onrender.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Gemini Text Generator</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your prompt..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        <div className="mt-4">
          <h2 className="font-semibold">Response:</h2>
          <p className="whitespace-pre-wrap mt-2">{response}</p>
        </div>
      </div>
    </div>
  );
}
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
      const response = await fetch('http://localhost:5000/api/ask-gemini', {
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
