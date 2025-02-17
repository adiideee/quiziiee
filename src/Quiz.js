// src/Quiz.js
import React, { useState, useEffect } from "react";

const Quiz = ({ questions, onQuizEnd }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showScore, setShowScore] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer(null); // Auto-submit if time runs out
    }
  }, [timeLeft]);

  const handleAnswer = (selectedAnswer) => {
    const question = questions[currentQuestion];

    // Validate numerical input for integer-type questions
    if (question.type === "integer") {
      if (selectedAnswer === null || selectedAnswer.trim() === "") {
        setError("Please enter a valid number.");
        return;
      }
      if (isNaN(selectedAnswer)) {
        setError("Invalid input. Please enter a number.");
        return;
      }
    }

    const isCorrect =
      selectedAnswer === question.correctAnswer ||
      (question.type === "integer" && selectedAnswer === question.correctAnswer.toString());

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer: selectedAnswer,
        },
      ]);
    }

    setUserAnswers({ ...userAnswers, [question.id]: selectedAnswer });
    setError(""); // Clear any previous error messages

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30); // Reset timer for the next question
      setSelectedAnswer(null); // Reset selected answer
    } else {
      setShowScore(true);
      onQuizEnd(score + (isCorrect ? 1 : 0)); // Notify parent component of quiz completion
    }
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestion].type === "integer" && !selectedAnswer) {
      setError("Please enter a valid number."); // Show error if no input is provided
      return;
    }
    handleAnswer(selectedAnswer); // Submit the current answer and move to the next question
  };

  const percentageScore = ((score / questions.length) * 100).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {showScore ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Quiz Completed! 🎉
            </h2>
            <div className="bg-green-100 p-6 rounded-lg mb-6">
              <p className="text-lg text-gray-700">
                Your score: <span className="font-bold">{score}</span> /{" "}
                {questions.length}
              </p>
              <p className="text-lg text-gray-700">
                Percentage: <span className="font-bold">{percentageScore}%</span>
              </p>
            </div>
            {incorrectAnswers.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Incorrect Answers:
                </h3>
                <ul>
                  {incorrectAnswers.map((item, index) => (
                    <li
                      key={index}
                      className="bg-red-100 p-4 rounded-lg mb-3 text-gray-700"
                    >
                      <p>
                        <span className="font-bold">Question:</span>{" "}
                        {item.question}
                      </p>
                      <p>
                        <span className="font-bold">Your Answer:</span>{" "}
                        {item.userAnswer}
                      </p>
                      <p>
                        <span className="font-bold">Correct Answer:</span>{" "}
                        {item.correctAnswer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
            <p className="text-lg text-center text-gray-700 mb-6">
              Time left: <span className="font-bold">{timeLeft}</span> seconds
            </p>
            {questions[currentQuestion].type === "multiple-choice" ? (
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full bg-purple-200 text-white-500 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 ${
                      selectedAnswer === option ? "ring-2 ring-purple-900" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter your answer"
                  value={selectedAnswer || ""}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p> // Display error message
                )}
              </div>
            )}
            <div className="mt-6">
              <button
                onClick={handleNextQuestion}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                {currentQuestion === questions.length - 1 ? "Submit Quiz" : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;