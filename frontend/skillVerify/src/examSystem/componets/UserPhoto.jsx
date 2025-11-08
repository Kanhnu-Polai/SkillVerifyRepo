import React, { useState, useRef } from "react";
import CandidatePhotoCapture from "./CandidatePhotoCapture";

const UserPhoto = ({ examInfo, setOpenExamOverview, setOpenExamInitiaton, setOpenPhotoModal }) => {
  const [cameraModule, setCameraModule] = useState(true);
  const cameraRef = useRef();


  const initateData = {
    

  }

  const handlePrev = () => {
    if (cameraRef.current) {
      cameraRef.current.stopCamera(); // stop the camera manually
    }
    setOpenPhotoModal(false);
    setOpenExamInitiaton(true);
    setCameraModule(false);
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
        {cameraModule && <CandidatePhotoCapture  examInfo={examInfo} ref={cameraRef} />}
      </div>

      <p className="mt-4 text-sm text-red-600 font-medium bg-red-50 border border-red-200 p-3 rounded-lg mb-3">
        ⚠️ The photo you upload will be used for future identity verification to ensure
        that the person taking the exam and attending the interview is the same. Please
        make sure your face is clearly visible and well-lit before proceeding.
      </p>

      <div className="flex justify-between">
        <button
          className="bg-yellow-600 min-w-32 hover:bg-yellow-700 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 min-w-32 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => alert("Exam Started!")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPhoto;