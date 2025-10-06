import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ResumeModal from "../../../utils/resume/ResumeModal";
import ResumeUploader from "../../../utils/resume/ResumeUploader";
import axios from "axios";

// Optional: If you have a Redux action to refresh userData
// import { fetchUserData } from "../../../redux/actions/userActions";

export default function ResumeManager() {
  const { userData } = useSelector((state) => state.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [resumes, setResumes] = useState(userData?.resumes || []);
  const dispatch = useDispatch();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

 const handleDelete = async (publicId) => {
  try {
    await axios.delete(
      "http://localhost:8083/api/users/upload/resume/delete",
      {
        params: {
          publicId,
        },
      }
    );

    // ✅ Filter based on resumePublicId
    setResumes(resumes.filter((r) => r.resumePublicId !== publicId));

    // Optional: dispatch(fetchUserData()); // If you use global state

  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete resume.");
  }
};


  const UploaderModal = isOpen ? (
    <ResumeModal onClose={closeModal}>
      <ResumeUploader onClose={closeModal} />
    </ResumeModal>
  ) : null;

  if (!resumes.length) {
    return (
      <div className="text-center mt-10">
        <p>No resume uploaded yet.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={openModal}
        >
          Add Resume
        </button>
        {UploaderModal}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mt-5">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {resumes.map(({ resumeLink, resumeTitle,resumePublicId }) => (
            <div
              key={resumeLink}
              className="rounded-md shadow-lg border border-gray-300 p-1"
              style={{ height: 360, width: 290, overflow: "hidden" }}
            >
              <div className="flex justify-between items-center mb-1 px-2">
                <h1 className="text-sm font-medium text-green-600 truncate w-5/6">
                  {resumeTitle}
                </h1>
                <button
                  onClick={() => handleDelete(resumePublicId)}
                  className="text-red-600 font-bold text-xl"
                  title="Delete Resume"
                >
                  ×
                </button>
              </div>
              <Viewer fileUrl={resumeLink} />
            </div>
          ))}
        </Worker>
      </div>

      <div className="text-center mt-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={openModal}
        >
          Add More Resume
        </button>
      </div>

      {UploaderModal}
    </>
  );
}
