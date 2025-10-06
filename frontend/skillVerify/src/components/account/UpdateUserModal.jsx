import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../redux/slices/userDataSlice";

const UpdateUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);

  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    phone: userData?.phone || "",
    bio: userData?.bio || "",
    address: {
      street: userData?.address?.street || "",
      city: userData?.address?.city || "",
      state: userData?.address?.state || "",
      country: userData?.address?.country || "",
      zipCode: userData?.address?.zipCode || "",
    },
    educations: userData?.educations || [
      { level: "", institution: "", boardOrUniversity: "", passingYear: "" },
    ],
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.educations];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, educations: updated }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        { level: "", institution: "", boardOrUniversity: "", passingYear: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    const updated = [...formData.educations];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, educations: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: userData.email,
      phone: formData.phone,
      bio: formData.bio,
      photoUrl: userData.photoUrl || null,
      role: userData.role || "JOB_SEEKER",
      address: {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        country: formData.address.country,
        zipCode: formData.address.zipCode,
      },
      resumes: userData.resumes || [],
      educations: formData.educations.map((edu) => ({
        level: edu.level,
        institution: edu.institution,
        boardOrUniversity: edu.boardOrUniversity,
        passingYear: edu.passingYear,
      })),
    };

    try {
      const response = await fetch(
        `http://localhost:8083/api/users/update/${userData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      dispatch(updateUserData(updatedUser));
      setStatus("success");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[600px] space-y-4 max-h-[90vh] overflow-y-auto mt-60 mb-45">
        <h2 className="text-xl font-semibold">Update Your Profile</h2>
        {status === "success" && (
          <div className="text-green-600 text-center">✅ Profile updated successfully</div>
        )}
        {status === "error" && (
          <div className="text-red-600 text-center">❌ Update failed. Please try again.</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Short Bio"
            className="w-full p-2 border rounded"
          />

          <h3 className="font-semibold">Address</h3>
          <input
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Street"
            className="w-full p-2 border rounded"
          />
          <input
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border rounded"
          />
          <input
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border rounded"
          />
          <input
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
          <input
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="w-full p-2 border rounded"
          />

          <h3 className="font-semibold">Education</h3>
          {formData.educations.map((edu, index) => (
            <div key={index} className="border p-2 rounded-md mb-2 space-y-2 relative">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-1 right-2 text-red-500 text-sm"
              >
                ✕
              </button>
              <input
                name="level"
                value={edu.level}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Level (e.g. 10th, B.Sc)"
                className="w-full p-2 border rounded"
              />
              <input
                name="institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Institution"
                className="w-full p-2 border rounded"
              />
              <input
                name="boardOrUniversity"
                value={edu.boardOrUniversity}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Board / University"
                className="w-full p-2 border rounded"
              />
              <input
                name="passingYear"
                value={edu.passingYear}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Passing Year"
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-blue-600 underline text-sm"
          >
            + Add More Education
          </button>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
