import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadResume } from "../../apiManager/userServiceApi";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { fetchUserData } from "../../redux/thunk/UserDataThunk";

export default function ResumeUploader() {

  const dispatch = useDispatch()
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userEmail =
    useSelector((s) => s.userData?.userData?.email) ||
    useSelector((s) => s.auth?.user?.email) ||
    "";

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    if (!userEmail) {
      setError("No user email found — please log in again.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const res = await uploadResume({
        file,
        email: userEmail,
        onUploadProgress: (percent) => setProgress(percent),
      });

      setSuccess("Resume uploaded successfully!");
      dispatch(fetchUserData(localStorage.getItem("userEmail")))
      console.log("✅ Backend response:", res);
    } catch (err) {
      console.error("Resume upload failed:", err);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Upload Your Resume
      </h2>

      {/* Upload Box */}
      <label
        htmlFor="resumeInput"
        className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-8
                   hover:border-blue-600 transition-all cursor-pointer bg-blue-50/30"
      >
        <UploadCloud className="text-blue-600 w-12 h-12 mb-2" />
        <span className="text-gray-600 text-sm">
          {file ? (
            <span className="font-medium text-blue-700">{file.name}</span>
          ) : (
            "Click or drag your resume here"
          )}
        </span>
        <input
          id="resumeInput"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Upload Progress */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Status Messages */}
      {error && (
        <div className="flex items-center justify-center mt-3 text-red-600 text-sm gap-1">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center justify-center mt-3 text-green-600 text-sm gap-1">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-5 w-full py-2.5 rounded-lg text-white font-medium transition-all
          ${uploading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}