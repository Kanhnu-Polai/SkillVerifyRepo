import React, { useState } from "react";
import { createPost } from "./SpotlightApi";
import { CategorySelector } from "./componets/CategorySelector";
import StatusPicker from "./componets/StatusPicker";

export default function CreatePost({ setOpen }) {
  const [hashTagsInput, setHashTagsInput] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [mediaFile, setMediaFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const photoUrl = localStorage.getItem("photoUrl");
  const role = localStorage.getItem("role");

  // --- HashTag Handlers ---
  const addTagFromInput = () => {
    const raw = hashTagsInput.trim();
    if (!raw) return;
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    setHashTags((prev) => Array.from(new Set([...prev, ...parts])));
    setHashTagsInput("");
  };

  const removeTag = (tag) => setHashTags(hashTags.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagFromInput();
    }
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");

    const postData = {
      userId,
      userName,
      userPhotoUrl: photoUrl,
      userRole: role,
      title,
      description,
      category,
      status,
      hashTags,
    };

    try {
      await createPost(postData, mediaFile);
      setSuccessMessage("✅ Post created successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setStatus("ACTIVE");
      setMediaFile(null);
      setHashTags([]);
      setHashTagsInput("");
    } catch {
      setSuccessMessage("❌ Failed to create post. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-6 bg-sky-50 rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-sky-50 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create Post</h1>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-red-600 transition-colors text-lg"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left side */}
        <div className="space-y-4">
          {/* HashTags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">HashTags</label>
            <div className="flex gap-2 mb-2">
              <input
                value={hashTagsInput}
                onChange={(e) => setHashTagsInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="java, springboot, react..."
                className="flex-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={addTagFromInput}
                className="px-3 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashTags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="ml-1 text-xs hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="My first post"
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              placeholder="Learning Spring Boot multipart upload"
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-4">
          {/* Category + Status */}
          <div className="flex flex-col space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <CategorySelector value={category} onChange={setCategory} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <StatusPicker value={status} onChange={setStatus} />
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Media</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
            {mediaFile && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: <span className="font-medium">{mediaFile.name}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition w-full flex items-center justify-center"
            >
              {submitting && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {submitting ? "Publishing..." : "Publish"}
            </button>

            {successMessage && (
              <p
                className={`text-sm font-medium ${
                  successMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {successMessage}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
