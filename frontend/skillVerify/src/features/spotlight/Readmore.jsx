import React, { useState } from "react";

const Readmore = ({ text, limit = 200 }) => {
  const [isExpand, setIsExpand] = useState(false);

  if (!text) return null;

  // Handle short text
  if (text.length <= limit) {
    return (
      <p className="text-[14px] md:text-[17px] text-gray-700 font-serif whitespace-pre-line">
        {text}
      </p>
    );
  }

  // Split text into lines for preserving newlines
  const displayText = isExpand ? text : text.substring(0, limit) + "......";

  return (
    <div className="transition-all duration-500 ease-in-out">
      <p className="text-[14px] md:text-[17px] text-gray-300 font-sans whitespace-pre-line">
        {displayText}
      </p>

      <button
        onClick={() => setIsExpand(!isExpand)}
        className="text-blue-500 font-medium hover:underline mt-2 transition-colors duration-300"
      >
        {isExpand ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default Readmore;
