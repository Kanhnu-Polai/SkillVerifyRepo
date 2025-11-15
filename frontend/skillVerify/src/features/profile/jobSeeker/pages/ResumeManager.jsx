import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ResumeModal from "../componets/ResumeModal";
import ResumeUploader from "../../../../components/resume/ResumeUploader";
import ConfirmDialog from "../componets/ConfirmDialog";
import axios from "axios";
import { TbFileCv } from "react-icons/tb";

export default function ResumeManager() {
  const { userData } = useSelector((state) => state.userData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumes, setResumes] = useState(userData?.resumes || []);
  const [confirmation, setConfirmation] = useState({ show: false, publicId: null });

  // ---- Upload modal ----
  const openUploadModal = () => setIsUploadOpen(true);
  const closeUploadModal = () => setIsUploadOpen(false);

  // ---- View modal ----
  const openViewModal = (resume) => {
    setSelectedResume(resume);
    setIsViewOpen(true);
  };
  const closeViewModal = () => setIsViewOpen(false);

  // ---- Confirmation modal ----
  const openConfirmation = (publicId) => setConfirmation({ show: true, publicId });
  const closeConfirmation = () => setConfirmation({ show: false, publicId: null });

  // ---- Delete resume ----
  const confirmDelete = async () => {
    const { publicId } = confirmation;
    if (!publicId) return;

    try {
      await axios.delete("http://localhost:8083/api/users/upload/resume/delete", {
        params: { publicId },
      });
      setResumes((prev) => prev.filter((r) => r.resumePublicId !== publicId));
      closeConfirmation();
    } catch (error) {
      console.error("❌ Delete failed", error);
      alert("Failed to delete resume.");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <button
          onClick={openUploadModal}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          + Add Resume
        </button>
      </div>

      {/* ✅ No resume uploaded yet */}
      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-600">
          <p className="text-lg">You haven’t uploaded any resumes yet.</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            onClick={openUploadModal}
          >
            Upload Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumes.map((resume) => (
            <div
              key={resume.resumePublicId}
              className="bg-white border border-green-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex justify-start items-center space-x-3">
                <span className="text-6xl text-blue-500 font-extralight">
                  <TbFileCv />
                </span>
                <h3 className="text-base font-medium text-gray-800 truncate">
                  {resume.resumeTitle}
                </h3>
              </div>

              <div className="flex justify-end space-x-2 items-center mt-4">
                <button
                  onClick={() => openViewModal(resume)}
                  className="px-3 py-1.5 border-blue-500 border  text-slate-700 text-sm rounded-md hover:bg-blue-200 cursor-pointer transition-all w-20"
                >
                  View
                </button>
                <button
                  onClick={() => openConfirmation(resume.resumePublicId)}
                  className="px-3 py-1.5 border border-red-500 text-slate-700 text-sm rounded-md hover:bg-red-600 transition-all w-20"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Upload Modal */}
      {isUploadOpen && (
        <ResumeModal onClose={closeUploadModal}>
          <ResumeUploader onClose={closeUploadModal} />
        </ResumeModal>
      )}

      {/* ✅ View Modal */}
      {isViewOpen && selectedResume && (
        <ResumeModal onClose={closeViewModal}>
          <div className="w-full h-[80vh]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={selectedResume.resumeLink} />
            </Worker>
          </div>
        </ResumeModal>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {confirmation.show && (
        <ResumeModal onClose={closeConfirmation}>
          <ConfirmDialog
            title="Delete Resume?"
            message="This action cannot be undone. Are you sure you want to permanently delete this resume?"
            onConfirm={confirmDelete}
            onCancel={closeConfirmation}
          />
        </ResumeModal>
      )}
    </div>
  );
}