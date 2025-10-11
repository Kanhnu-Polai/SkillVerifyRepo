import React, { useState } from "react";
import ConfirmPassword from "./ConfirmPassword";
import { updateContactInfo } from "../../../../apiManager/authApi";
import { fetchUserData } from "../../../../redux/thunk/UserDataThunk";
import { useDispatch } from "react-redux";

const UpdateContactInfo = ({ userData, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();


  const handleSave = () => {
    setOpenPasswordModal(true);
  };

  const handlePasswordSuccess = async (confirmedPassword) => {
    // Close modal
    setOpenPasswordModal(false);

    // Prepare data
    const updateData = {
      userId,
      newEmail: email,
      newPhoneNumber: phoneNumber,
      password: confirmedPassword,
    };

    try {
      const res = await updateContactInfo(updateData);
      console.log("✅ Contact info updated:", res);
       const updatedEmail = res?.data?.email || email;
      localStorage.setItem("userEmail", updatedEmail);
       await dispatch(fetchUserData(updatedEmail));
     
      onClose();
    } catch (err) {
      console.error("❌ Failed to update contact info:", err);
      alert("Failed to update contact info. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/65  flex justify-center items-center z-30 p-4">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Update Contact Info</h2>
          <button
            className="text-gray-500 cursor-pointer font-bold text-xl hover:text-red-500"
            onClick={() => onClose(false)}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
            onClick={()=>onClose(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Update
          </button>
        </div>
      </div>

      {openPasswordModal && (
        <ConfirmPassword
          onSuccess={handlePasswordSuccess}
          onClose={setOpenPasswordModal}
        />
      )}
    </div>
  );
};

export default UpdateContactInfo;
