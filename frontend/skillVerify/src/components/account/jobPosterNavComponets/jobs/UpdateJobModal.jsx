// src/components/account/jobPosterNavComponets/jobs/UpdateJobModal.jsx

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const UpdateJobModal = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    noOfOpenings: 0,
    isExamRequired: false,
    isRound1Required: false,
    isRound2Required: false,
    lastDateToApply: "",
    jobType: "",
    jobCategory: "",
    location: [],
    requiredSkill: [],
    examTopics: [],
    experience: 0,
  });

  // Prefill data
  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || "",
        jobDescription: job.jobDescription || "",
        noOfOpenings: job.noOfOpenings || 0,
        isExamRequired: job.isExamRequired || false,
        isRound1Required: job.isRound1Required || false,
        isRound2Required: job.isRound2Required || false,
        lastDateToApply: job.lastDateToApply || "",
        jobType: job.jobType || "",
        jobCategory: job.jobCategory || "",
        location: job.location?.join(", ") || "",
        requiredSkill: job.requiredSkill?.join(", ") || "",
        examTopics: job.examTopics?.join(", ") || "",
        experience: job.experience || 0,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse comma-separated strings into arrays
    const updatedData = {
      ...formData,
      location: formData.location.split(",").map((l) => l.trim()),
      requiredSkill: formData.requiredSkill.split(",").map((s) => s.trim()),
      examTopics: formData.examTopics.split(",").map((t) => t.trim()),
    };

    onUpdate(updatedData); // Call parent's update handler
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-10">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* modal */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Job</h2>

        {/* job fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded"
            required
          />
          <input
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            placeholder="Job Category"
            className="border p-2 rounded"
          />
          <input
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            placeholder="Job Type"
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="lastDateToApply"
            value={formData.lastDateToApply}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="noOfOpenings"
            value={formData.noOfOpenings}
            onChange={handleChange}
            placeholder="No of Openings"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience Required"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          placeholder="Job Description"
          className="border p-2 rounded mt-4 w-full"
          rows={5}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location (comma-separated)"
            className="border p-2 rounded"
          />
          <input
            name="requiredSkill"
            value={formData.requiredSkill}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            className="border p-2 rounded"
          />
          <input
            name="examTopics"
            value={formData.examTopics}
            onChange={handleChange}
            placeholder="Exam Topics (comma-separated)"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isExamRequired"
              checked={formData.isExamRequired}
              onChange={handleChange}
            />
            Exam Required
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isRound1Required"
              checked={formData.isRound1Required}
              onChange={handleChange}
            />
            Round 1 Required
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isRound2Required"
              checked={formData.isRound2Required}
              onChange={handleChange}
            />
            Round 2 Required
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded mt-6 hover:bg-blue-700"
        >
          Update Job
        </button>
      </form>
    </div>,
    document.body
  );
};

export default UpdateJobModal;