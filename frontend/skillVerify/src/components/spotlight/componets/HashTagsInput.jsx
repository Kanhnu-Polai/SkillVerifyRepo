import React, { useState } from "react";

export default function HashTagsInput() {
  const [hashTags, setHashTags] = useState([]);
  const [hashTagsInput, setHashTagsInput] = useState("");

  const addTagFromInput = () => {
    if (hashTagsInput.trim() && !hashTags.includes(hashTagsInput.trim())) {
      setHashTags([...hashTags, hashTagsInput.trim()]);
      setHashTagsInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagFromInput();
    }
  };

  const removeTag = (tag) => {
    setHashTags(hashTags.filter((t) => t !== tag));
  };

  return (
    <div className="border rounded-md p-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Hashtags
      </label>
      <div className="flex gap-2 mb-3">
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
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            #{t}
            <button
              type="button"
              onClick={() => removeTag(t)}
              className="ml-1 text-xs font-bold hover:text-red-600"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
