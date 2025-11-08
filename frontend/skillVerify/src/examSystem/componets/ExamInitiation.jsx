import React, { useState } from "react";
import { Briefcase, Building2, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExamInitiation = ({ examInfo,setOpenExamOverview,setOpenExamInitiaton,setOpenPhotoModal }) => {
  const job = examInfo?.jobInfo;
  const navigate = useNavigate();
 

  return (
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Exam Rules & Guidelines</h2>
        <p className="text-sm text-gray-500 mt-1">
          Candidate ID:{" "}
          <span className="font-semibold text-gray-700">{examInfo?.userId}</span>
        </p>
      </div>

     
      
      {/* Rules Section */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Important Rules & Guidelines
        </h3>
        <ul className="list-decimal list-inside text-sm text-gray-700 space-y-2">
          <li>Keep your camera and microphone turned on during the exam.</li>
          <li>Do not switch tabs or open any other applications while taking the test.</li>
          <li>Leaving or refreshing the page will automatically end the exam.</li>
          <li>Use only one device and a stable internet connection.</li>
          <li>Ensure proper lighting and a quiet environment.</li>
          <li>Any suspicious activity will lead to disqualification.</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          className="bg-yellow-600 min-w-32 hover:bg-yellow-700 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => {
            setOpenExamInitiaton(false)
            setOpenExamOverview(true)

          }}
        >
          Prev
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 min-w-32 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => {
            setOpenExamInitiaton(false)
            setOpenExamOverview(false)
            setOpenPhotoModal(true)
            }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExamInitiation;