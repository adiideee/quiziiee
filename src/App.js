// src/App.js
import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import { saveAttempt, getAttempts, clearHistory } from "./db"; // Import clearHistory
import { quizData } from "./data";

const App = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const savedAttempts = await getAttempts();
      setAttempts(savedAttempts);
    };
    fetchAttempts();
  }, []);

  const handleQuizEnd = async (score) => {
    const attempt = {
      timestamp: new Date().toLocaleString(),
      score,
      totalQuestions: quizData.length,
    };
    await saveAttempt(attempt);
    setAttempts([...attempts, attempt]);
  };

  // Function to handle clearing history
  const handleClearHistory = async () => {
    await clearHistory();
    setAttempts([]); // Clear the attempts state
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Quiziieee
        </h1>
        <Quiz questions={quizData} onQuizEnd={handleQuizEnd} />
        <h2 className="text-2xl font-bold text-center text-white mt-8 mb-4">
          Attempt History
        </h2>
        {/* Add a "Clear History" button */}
        <button
          onClick={handleClearHistory}
          className="w-full bg-white text-red-900 py-2 px-4 rounded-lg hover:bg-red-900 hover:text-white transition duration-300 mb-6"
        >
          Clear History
        </button>
        <ul className="space-y-4">
          {attempts.map((attempt, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg text-gray-800"
            >
              <p>
                <span className="font-bold">Timestamp:</span> {attempt.timestamp}
              </p>
              <p>
                <span className="font-bold">Score:</span> {attempt.score} /{" "}
                {attempt.totalQuestions}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;