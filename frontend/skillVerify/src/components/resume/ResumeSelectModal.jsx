import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilePdf } from "react-icons/fa6";
import { uploadResume } from "../../apiManager/userServiceApi";
import { FiCommand } from "react-icons/fi";
import { fetchUserData } from "../../redux/thunk/UserDataThunk";


export default function ResumeSelectModal({ job = {}, onClose, onSuccess }) {
  const resumes = useSelector((s) => s.userData?.userData?.resumes) ?? [];
  const userEmail = localStorage.getItem("userEmail");
 const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [newResumeFile, setNewResumeFile] = useState(null);

  const JOB_SERVICE_URL ="http://localhost:8088/api/applications/apply";

  const USER_SERVICE_URL =
    import.meta.env.VITE_SKILLVERIFY_USER_SERVICE_BASE_URL ||
    "http://localhost:8083/api/users";

  /* -------------------- Apply for job -------------------- */
  const handleApply = async () => {
    if (!selected || !job.jobId) return;

    const payload = {
      jobSeekerEmail: userEmail,
      resumeUrl: selected.resumeLink,
      jobId: job.jobId,
      jobTitle: job.jobTitle,
    };

    try {
      setSubmitting(true);
      setError("");
      setSuccess(false);

      const res = await axios.post(`${JOB_SERVICE_URL}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 1500);
      } else {
        throw new Error(`Unexpected response: ${res.status}`);
      }
    } catch (err) {
      console.error("[ResumeSelectModal] Apply error:", err);
      setError("Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- Upload new resume -------------------- */
  const handleAddResume = async () => {
    if (!newResumeFile) {
      setError("Please fill all fields and choose a PDF file.");
      return;
    }

    try {
      setError("");

      setLoading(true);
      const res = await uploadResume({
        file: newResumeFile,
        email: userEmail,
        
      });

      setAddingNew(false);
      dispatch(fetchUserData(localStorage.getItem("userEmail")))
      setNewResumeFile(null);
      setLoading(false);

      alert("✅ Resume uploaded successfully! Reload to see the changes.");
    } catch (err) {
      console.error("[ResumeSelectModal] Upload error:", err);
      setError("Could not upload resume. Try again.");
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Card */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-6 z-10 w-[440px] max-h-[85vh] overflow-y-auto border border-gray-100 m-3"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Choose a resume
          </h3>

          {error && (
            <p className="text-red-600 text-sm mb-2 bg-red-50 p-2 rounded-md">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-700 text-sm mb-2 bg-green-50 p-2 rounded-md">
              ✅ Application submitted successfully!
            </p>
          )}

          {/* Resume list */}
          {resumes.length === 0 ? (
            <p className="text-sm text-gray-600">
              You haven’t uploaded any resumes yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {resumes.map((r, idx) => (
                <li
                  key={r.resumePublicId ?? idx}
                  className={`flex items-center gap-3 p-2 rounded-md border transition ${
                    selected?.resumePublicId === r.resumePublicId
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="resume"
                    checked={selected?.resumePublicId === r.resumePublicId}
                    onChange={() => setSelected(r)}
                    className="accent-blue-600"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {r.resumeTitle || "Untitled Resume"}
                    </p>
                  </div>
                  <a
                    href={r.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs font-medium hover:underline"
                  >
                    Preview
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* ➕ Add new resume section */}
          <div className="mt-5 border-t pt-4">
            {!addingNew ? (
              <button
                onClick={() => setAddingNew(true)}
                className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                <FaPlus size={13} /> Add New Resume
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="flex-1 border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-row">
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => setNewResumeFile(e.target.files[0])}
                      />
                    </div>
                    {newResumeFile ? (
                      <span className="flex items-center gap-2 text-gray-700">
                        <FaFilePdf className="text-red-500" />
                        {newResumeFile.name}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Choose PDF file from your device
                      </span>
                    )}
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddResume}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md"
                  >
                    {
                      loading?"Uploading.....":"Upload"
                    }
                  </button>
                  <button
                    onClick={() => setAddingNew(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={onClose}
              disabled={submitting}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md"
            >
              Cancel
            </button>

            <button
              disabled={!selected || submitting}
              onClick={handleApply}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-medium py-2 rounded-md transition"
            >
              {submitting ? "Applying…" : "Apply"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
