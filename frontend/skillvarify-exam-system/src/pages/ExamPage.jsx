import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const basicPayload = {
          topic: "Python",
          difficulty: "Basic",
          limit: 10,
        };

        const intermediatePayload = {
          topic: "Python",
          difficulty: "Intermediate",
          limit: 10,
        };
        
        // Fetch both sets of questions and wait for both to complete
        const [basicRes, intermediateRes] = await Promise.all([
          axios.post("http://127.0.0.1:5001/q", basicPayload),
          axios.post("http://127.0.0.1:5001/q", intermediatePayload)
        ]);

        // Flatten the two arrays of questions into a single array
        const allQuestions = [...basicRes.data.questions, ...intermediateRes.data.questions];
        setQuestions(allQuestions || []);
        
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err); 
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (opt) => {
    // Check if the current question and its answer exist
    if (questions.length > 0 && opt === questions[current].answer) {
      setScore(score + 1);
    }

    // Advance to the next question or navigate to the result page
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Correctly calculate final score and navigate
      navigate("/result", { 
        state: { 
          score: score + (questions.length > 0 && opt === questions[current].answer ? 1 : 0), 
          total: questions.length 
        } 
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Check if no questions were returned from the API
  if (error || questions.length === 0) {
    return <p className="text-center mt-10 text-red-500">Error: No questions found or failed to fetch.</p>;
  }

  // Prevent a crash if there's no question at the current index
  if (!questions[current]) {
    return null; // Or show an error message
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">
          Question {current + 1} of {questions.length}
        </h2>
        <p className="mb-4">{questions[current].question}</p>
        <div className="space-y-2">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
