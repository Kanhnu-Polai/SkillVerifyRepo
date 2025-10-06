import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openForgotPasswordModal } from "../../redux/slices/modalSlice";
import { login } from "../../redux/slices/authSlice";
import { fetchUserData } from "../../redux/thunk/UserDataThunk";
import LoginService from "./LoginService";
import Slogan from "../../utils/login/Slogan";
import { FaSpinner, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const storedUser = useSelector((state) => state.userData);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await LoginService.login(email, password);

      localStorage.setItem("token", userData.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: userData.email, role: userData.role })
      );

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      dispatch(
        login({
          token: userData.token,
          user: { email: userData.email, role: userData.role },
        })
      );

      dispatch(fetchUserData(userData.email));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storedUser?.email) {
      dispatch(fetchUserData(storedUser.email));
    }
  }, [dispatch, storedUser]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(11,23,40,0.8)] p-4 md:pt-24 mt-14 md:mt-3" >
      <div className="flex flex-col md:flex-row w-full max-w-4xl border-4 bg-[#081f30cc] rounded-md overflow-hidden">
        {/* Slogan - hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-teal-700 to-blue-900 items-center justify-center p-6">
          <Slogan />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center space-y-4">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-6 border-b border-white pb-2 w-full text-center md:text-left">
            Login
          </h2>

          <form
            onSubmit={handleForm}
            className="flex flex-col space-y-4 w-full"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-50 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-2 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-50 mb-1">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => dispatch(openForgotPasswordModal())}
                  className="text-sm text-gray-50 hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full p-2 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Remember Me */}
            <label className="flex items-center space-x-2 text-sm text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox"
              />
              <span>Remember Me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 rounded-md bg-white text-black flex items-center justify-center space-x-2 hover:bg-slate-200"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Signup */}
          <p className="text-white text-sm text-center md:text-left">
            Don't have an account? <a href="/signup" className="underline">Sign up</a>
          </p>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-grow h-[1px] bg-gray-400" />
            <span className="mx-4 text-gray-300 text-sm">or</span>
            <div className="flex-grow h-[1px] bg-gray-400" />
          </div>

          {/* Social Login */}
          <button className="w-full p-2 rounded-md bg-gray-800 flex items-center justify-center space-x-2 hover:bg-black text-white">
            <FcGoogle className="text-2xl" />
            <span>Sign in with Google</span>
          </button>
          <button className="w-full p-2 rounded-md bg-gray-800 flex items-center justify-center space-x-2 hover:bg-black text-white">
            <FaApple className="text-2xl text-slate-400" />
            <span>Sign in with Apple</span>
          </button>

          {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;