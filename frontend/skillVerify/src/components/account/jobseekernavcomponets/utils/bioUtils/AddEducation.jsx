import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { updateEducation } from "../../../../../apiManager/userServiceApi";
import toast, { Toaster } from "react-hot-toast";
import { fetchUserData } from "../../../../../redux/thunk/UserDataThunk";
import { useDispatch } from "react-redux";

const AddEducation = ({ onClose, type = false, education = null }) => {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("userEmail")

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    id: education?.id || null,
    degree: education?.degree || "",
    fieldOfStudy: education?.fieldOfStudy || "",
    institution: education?.institution || "",
    startYear: education?.startYear || "",
    endYear: education?.endYear || "",
    description: education?.description || "",
  });

  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.degree ||
      !formData.institution ||
      !formData.startYear ||
      !formData.endYear
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await updateEducation(formData, userId);
      console.log("Education update response:", res);

      toast.success(education ? "Education updated successfully!" : "Education added successfully!");
      dispatch(fetchUserData(userEmail))
     onClose(false)
    } catch (error) {
      console.error("Error while updating education:", error);
      toast.error("Failed to save education. Try again later.");
      setError("Failed to save education. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      const deleteData = { ...formData, isDelete: true };
      const res = await updateEducation(deleteData, userId);
      console.log("Education delete response:", res);

      toast.success("Education deleted successfully!");
      dispatch(fetchUserData(userEmail))
      setTimeout(() => onClose(false), 1200);
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete education.");
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
              {education ? "Edit Education" : "Add New Education"}
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
            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., B.Tech in Computer Science"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Field of Study
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="e.g., Artificial Intelligence"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Institution / University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g., IIT Delhi"
                className="w-full border text-slate-500 border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Start & End Year */}
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Start Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  className="w-full text-slate-500 border border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                  focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  End Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                  className="w-full text-slate-500 border border-slate-400 rounded-md px-3 py-2 mt-1 text-sm 
                  focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
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
                placeholder="Brief summary of your academic achievements"
                className="w-full border text-slate-500 border-slate-400  rounded-md px-3 py-2 mt-1 text-sm 
                focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              ></textarea>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

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

              {
                type?<button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 min-w-24 rounded-md bg-blue-600 text-white hover:bg-blue-700 
                transition shadow-sm cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Updating..." : "Update"}
              </button>:<button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 min-w-24 rounded-md bg-blue-600 text-white hover:bg-blue-700 
                transition shadow-sm cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Adding..." : "Add"}
              </button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEducation;
