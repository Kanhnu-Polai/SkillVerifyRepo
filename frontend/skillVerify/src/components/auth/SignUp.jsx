import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupService from "./SignupService";
import { FaSpinner, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Slogan from "../../utils/login/Slogan";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing you up...");

    try {
      const userData = await SignupService.signup(name, email, password, role);
      toast.success("Signup successful! Please login.", { id: toastId });
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed!";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = ()=>{
    navigate("/")
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(11,23,40,0.8)] p-4  md:pt-24">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-[#081f30cc] rounded-md overflow-hidden">
        {/* Slogan - hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-teal-700 to-blue-900 items-center justify-center p-6">
          <Slogan />
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center space-y-4">
        <div className="md:hidden w-80 flex justify-end">
          <button onClick={handleFormClose} className="font-medium text-red-500">X</button>
        </div>
          <h2 className="text-xl md:text-4xl text-white font-bold mb-6 border-b border-white pb-2 w-full text-center md:text-left">
            Sign Up
          </h2>

          <form onSubmit={handleForm} className="flex flex-col space-y-4 w-full">
            {/* Name */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-50 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Kanhu Polai"
                className="w-full p-1 md:p-2 rounded-md text-[12px] bg-gray-900 text-white placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-50 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full  p-1 md:p-2 rounded-md text-[12px] bg-gray-900 text-white placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-50 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full  p-1 md:p-2 rounded-md text-[12px] bg-gray-900 text-white placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-50 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full  p-1 md:p-2 rounded-md text-[12px] bg-gray-900 text-white border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Role</option>
                <option value="JOB_SEEKER">Job Seeker</option>
                <option value="JOB_POSTER">Job Poster</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-1 md:p-2 rounded-md text-sm md:text-base bg-white text-black flex items-center justify-center space-x-2 hover:bg-slate-200"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Signing Up...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-white text-[10px] text-center md:text-left">
            Already have an account? <a href="/login" className="underline">Sign In</a>
          </p>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-grow h-[1px] bg-gray-400" />
            <span className="mx-4 text-gray-300 text-sm">or</span>
            <div className="flex-grow h-[1px] bg-gray-400" />
          </div>

          {/* Social Signup */}
          <button className="w-full p-2 rounded-md bg-gray-800 flex items-center justify-center space-x-2 hover:bg-black text-white">
            <FcGoogle className="text-xl md:text-2xl" />
            <span className="text-sm md:text-base">Sign Up with Google</span>
          </button>
          <button className="w-full p-2 rounded-md bg-gray-800 flex items-center justify-center space-x-2 hover:bg-black text-white">
            <FaApple className="text-xl md:text-2xl text-slate-400" />
            <span className="text-sm md:text-base" >Sign Up with Apple</span>
          </button>

          {/* Error */}
          {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Signup;