import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getApplications } from "../../../../apiManager/JobApplicationAPI";
import { RiBuilding2Line } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiProgress3Fill } from "react-icons/ri";
import { FiFileText } from "react-icons/fi"; 
import { useSelector } from "react-redux";

const JobApplicants = () => {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData } = useSelector((state) => state.userData);


  useEffect(() => {
    async function fetchJobApplications() {
      try {
        setLoading(true);
        const data = await getApplications(userData.email);
        setJobData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobApplications();
  }, []);

  const openModal = (job) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(null);

  const handleDownload = async (url, email) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${email}_resume.pdf`;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading applications...</div>;
  if (error) return <div className="text-center mt-5 text-red-500">Error: {error}</div>;

  return (
    <>
      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {jobData.map((job) => (
    <div
      key={job.jobId}
      className="bg-slate-300 shadow-sm rounded-2xl p-5 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Job Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">{job.jobTitle}</h3>

      {/* Company */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold text-gray-800">Company:</span> {job.companyName}
      </p>

      {/* Resume Count with Badge */}
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold text-gray-800">Applicants:</span>{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ml-1
            ${job.applications.length > 0 
              ? "bg-green-100 text-green-700" 
              : "bg-gray-200 text-gray-600"}`}
        >
          {job.applications.length}
        </span>
      </p>

      {/* Open Resumes Button */}
      <button
        className={`w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 
          ${job.applications.length > 0 
            ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer" 
            : "bg-gray-300 text-gray-700 cursor-not-allowed"}`}
        onClick={() => job.applications.length > 0 && openModal(job)}
        disabled={job.applications.length === 0}
      >
        <FiFileText></FiFileText>
        Open Resumes
      </button>
    </div>
  ))}
</div>

      {/* Modal */}
      {/* Modal */}
<AnimatePresence>
  {selectedJob && (
    <motion.div
      className="fixed m-2  inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-300 rounded-xl shadow-2xl  w-full max-w-lg relative flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Fixed Header */}
        <div className="p-6 border-b sticky top-0 bg-slate-300 z-10 rounded-xl ">
          <h2 className="text-xl font-semibold text-gray-800">{selectedJob.jobTitle}</h2>
          <p className="text-gray-800 flex items-center gap-2 mt-1">
            <RiBuilding2Line /> {selectedJob.companyName}
          </p>
        </div>

        {/* Scrollable Applications */}
        <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
          {selectedJob.applications.length === 0 ? (
            <p className="text-gray-500">No resumes submitted yet.</p>
          ) : (
            selectedJob.applications.map((app, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2 ">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <MdEmail className="text-gray-600 text-lg" /> {app.applicantEmail}
                  </p>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
                    <RiProgress3Fill /> {app.status}
                  </span>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleDownload(app.resumeUrl, app.applicantEmail)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 rounded transition cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleDownload(app.resumeUrl, app.applicantEmail)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 rounded transition cursor-pointer"
                  >
                    Resume
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-red-600 z-11 hover:text-red-500 text-xl cursor-pointer"
        >
          &times;
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
};

export default JobApplicants;