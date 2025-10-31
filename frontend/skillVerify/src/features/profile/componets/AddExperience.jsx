import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateExperience } from "../../../apiManager/userServiceApi"; 
import { fetchUserData } from "../../../redux/thunk/UserDataThunk";


const AddExperience = ({ onClose, type = false, experience = null }) => {
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: experience?.id || null,
    role: experience?.role || "",
    company: experience?.company || "",
    location: experience?.location || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    description: experience?.description || "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role || !formData.company || !formData.startDate || !formData.endDate) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await updateExperience(formData, userId);
      console.log("Experience update response:", res);

      toast.success(experience ? "Experience updated successfully!" : "Experience added successfully!");
      dispatch(fetchUserData(userEmail));
      onClose(false);
    } catch (error) {
      console.error("Error updating experience:", error);
      toast.error("Failed to save experience. Try again later.");
      setError("Failed to save experience. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    try {
      setLoading(true);
      const deleteData = { ...formData, isDelete: true };
      const res = await updateExperience(deleteData, userId);
      console.log("Experience delete response:", res);

      toast.success("Experience deleted successfully!");
      dispatch(fetchUserData(userEmail));
      setTimeout(() => onClose(false), 1200);
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
        <div className="bg-white w-full mx-3 max-w-md p-6 rounded-2xl shadow-lg relative transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {experience ? "Edit Experience" : "Add New Experience"}
            </h2>
            <button
              onClick={() => onClose(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., Backend Developer"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Tech Solutions Pvt Ltd"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore, India"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Dates */}
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full text-slate-500 border border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                  focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full text-slate-500 border border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                  focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Description (optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief summary of your work and responsibilities"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              ></textarea>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              {type ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-4 py-2 min-w-24 rounded-md border border-gray-300 text-gray-700 
                  hover:bg-red-400 transition cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  disabled={loading}
                  className="px-4 py-2 min-w-24 rounded-md border border-gray-300 text-gray-700 
                  hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 min-w-24 rounded-md bg-blue-600 text-white hover:bg-blue-700 
                transition shadow-sm cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (experience ? "Updating..." : "Adding...") : experience ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExperience;
