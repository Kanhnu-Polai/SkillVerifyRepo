import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmPassword } from "../../../apiManager/authApi";

const ConfirmPassword = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userEmail = localStorage.getItem("userEmail");

  const handleConfirm = async () => {
    if (!password) {
      setMessage("⚠️ Please enter your password.");
      return;
    }

    setLoading(true);
    setMessage("");

    const confirmData = { email: userEmail, password };

    try {
      const response = await confirmPassword(confirmData);

      if (response.valid) {
        setMessage("✅ Password confirmation successful!");
        setTimeout(() => {
          onSuccess(password); // Pass password back to parent
          onClose(false);
        }, 1000);
      } else {
        setMessage("❌ Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error validating password:", error);
      setMessage("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50 p-4">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-blue-700">
            Confirm Your Password
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 font-bold text-xl"
            onClick={() => onClose(false)}
          >
            &times;
          </button>
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Checking..." : "Confirm Password"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmPassword;
