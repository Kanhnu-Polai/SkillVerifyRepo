import React, { useState } from "react";
import { Tag } from "@mui/icons-material";

const AddHashTags = () => {
  const [hashTagsInput, setHashTagsInput] = useState("");
  const [hashTags, setHashTags] = useState([]);

  const addTagFromInput = () => {
    const tag = hashTagsInput.trim().replace(/^#/, "");
    if (tag && !hashTags.includes(tag)) {
      setHashTags((prev) => [...prev, tag]);
    }
    setHashTagsInput("");
  };

  const removeTag = (tag) => {
    setHashTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagFromInput();
    }
  };

  return (
    <div className="flex flex-col w-full md:w-96">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Hashtags / Technologies / Keywords
      </label>

      {/* Input + Button */}
      <div className="flex gap-2 mb-2">
        <input
          value={hashTagsInput}
          onChange={(e) => setHashTagsInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="java, springboot, react..."
          className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
        {hashTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            <Tag fontSize="small" />
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-xs hover:text-red-600"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AddHashTags;