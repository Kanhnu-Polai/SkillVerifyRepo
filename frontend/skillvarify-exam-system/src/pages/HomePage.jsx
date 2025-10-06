import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        SkillVerify Exam System
      </h1>
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-md text-center">
        <h2 className="text-xl font-semibold mb-3">Exam Rules</h2>
        <ul className="text-left list-disc list-inside mb-4 text-gray-700">
          <li>10 Multiple Choice Questions</li>
          <li>One correct answer per question</li>
          <li>Timer runs automatically</li>
        </ul>
        <button
          onClick={() => navigate("/exam")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default HomePage;