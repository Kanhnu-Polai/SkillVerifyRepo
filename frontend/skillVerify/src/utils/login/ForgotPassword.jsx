import React, { useState } from "react";
import { closeForgotPasswordModal } from "../../redux/slices/modalSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-none">
      <div className="bg-[#05111a] border border-slate-200 p-6 rounded-md w-full max-w-md  space-y-2 lg:min-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
         
        </div>
        <form  className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">
            Enter your account's email address, and we'll send you a link to reset your password.
          </label>

          
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md placeholder-amber-50 text-sm bg-black text-white"
            placeholder="Email Address"
          />

          <div className="flex justify-end space-x-3">

            <button className="text-slate-50 antialiased hover:border border-slate-50 rounded-md w-24 cursor-pointer"
            onClick={() => dispatch(closeForgotPasswordModal())}>
                Cancel
            </button>
             <button
            type="submit"
            className="w-24 bg-slate-50 text-black p-2 rounded-md hover:bg-slate-300 cursor-pointer"
          >
            Continue
          </button>
            
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
