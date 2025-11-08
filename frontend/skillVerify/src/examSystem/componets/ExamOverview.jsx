import React from "react";
import { Briefcase, Building2, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExamOverview = ({ examInfo,setOpenExamOverview,setOpenExamInitiaton,setOpenPhotoModal }) => {
  const job = examInfo?.jobInfo;

  const navigate = useNavigate()

  return (
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Exam Overview 
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Candidate ID: <span className="font-semibold text-gray-700">{examInfo?.userId}</span>
        </p>
      </div>

      {/* Job Info Section */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <User className="text-blue-600 w-5 h-5" />
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Position:</span> <span className="font-medium text-violet-500">{job?.jobTitle}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Building2 className="text-blue-600 w-5 h-5" />
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Company:</span> {job?.companyName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="text-blue-600 w-5 h-5" />
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Job ID:</span> {job?.jobId}
          </p>
        </div>

        

        <div className="flex items-start gap-3">
          
          
        </div>
      </div>

      {/* Exam Details */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Exam Details</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Duration: <span className="font-semibold">45 minutes</span></li>
          <li>Total Questions: <span className="font-semibold">30</span></li>
          <li>Exam Mode: <span className="font-semibold">Online (Proctored)</span></li>
          <li>Topics Covered: <span className="font-semibold">Java, Spring Boot, REST APIs</span></li>
        </ul>
      </div>

      {/* Start Exam Button */}
      <div className="flex justify-between">
        <button
          className="bg-red-600 min-w-32 hover:bg-red-700 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => {
            navigate(-1)
            
          }}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 min-w-32  cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => {
            setOpenExamOverview(false)
            setOpenExamInitiaton(true)
            setOpenPhotoModal(false)
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExamOverview;